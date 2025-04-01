import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { AIStrategy } from './ai.strategy';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAIStrategy implements AIStrategy {
  private openai: OpenAI;

  constructor(config: ConfigService) {
    const apiKey = config.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('Missing OpenAI API key');
    }

    this.openai = new OpenAI({ apiKey });
  }

  async getMove(board: string[][]): Promise<[number, number]> {
    const prompt = this.buildPrompt(board);

    try {
      const res = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        max_tokens: 10,
        messages: [{ role: 'user', content: prompt }],
      });

      const raw = res.choices[0]?.message?.content?.trim();
      if (!raw) throw new Error('No response from OpenAI');

      const [row, col] = JSON.parse(raw);

      if (
        Number.isInteger(row) &&
        Number.isInteger(col) &&
        board[row]?.[col] === ''
      ) {
        return [row, col];
      }

      throw new Error(`Invalid move received: ${raw}`);
    } catch (err) {
      console.error('[AI] Invalid response:', err);
      throw new Error('AI returned an unusable move');
    }
  }

  private buildPrompt(board: string[][]): string {
    return [
      "You're playing Tic-Tac-Toe as 'O'.",
      'Empty cells are "", player moves are "X", your moves are "O".',
      'Return your next move as a raw JSON array, like [1, 2].',
      'Do not send me explanations.',
      '**Do not wrap the output in code blocks or markdown.**',
      '',
      'Board:',
      JSON.stringify(board),
    ].join('\n');
  }
}
