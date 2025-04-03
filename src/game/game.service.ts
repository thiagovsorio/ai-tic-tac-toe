import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EvaluateGameDto } from './dto/evaluate-game.dto';
import { checkWinner } from './logic/check-winner';
import { AIStrategy, AIStrategyToken } from './ai/ai.strategy';
import { PrismaService } from '../../prisma/prisma.service';
import { Game } from '@prisma/client';
import { EvaluateGameResultDto } from './dto/evaluate-game-result.dto';

@Injectable()
export class GameService {
  constructor (
    @Inject(AIStrategyToken) private readonly ai: AIStrategy,
    private readonly db: PrismaService,
  ){}
  async evaluate({ board, player }: EvaluateGameDto): Promise<EvaluateGameResultDto> {
    const currentResult = checkWinner(board);
  
    if (currentResult && currentResult !== 'DRAW') {
      await this.db.game.create({
        data: {
          playerX: player,
          playerO: 'AI',
          winner: currentResult,
          boardState: board,
        },
      });
  
      return {
        message: `${currentResult} has already won.`,
        winner: currentResult,
        board,
      };
    }
  
    if (currentResult === 'DRAW') {
      await this.db.game.create({
        data: {
          playerX: player,
          playerO: 'AI',
          winner: 'DRAW',
          boardState: board,
        },
      });
  
      return {
        message: `It's a draw!`,
        winner: 'DRAW',
        board,
      };
    }
  
    const [row, col] = await this.ai.getMove(board);
  
    if (board[row][col] !== '') {
      throw new BadRequestException('AI attempted an invalid move');
    }
  
    board[row][col] = 'O';
  
    const updatedResult = checkWinner(board);
  
    if (updatedResult) {
      await this.db.game.create({
        data: {
          playerX: player,
          playerO: 'AI',
          winner: updatedResult,
          boardState: board,
        },
      });
  
      return {
        message: updatedResult === 'DRAW' ? "It's a draw!" : `${updatedResult} wins!`,
        winner: updatedResult,
        board,
      };
    }
  
    return {
      message: 'Next move: player',
      board,
    };
  }
  

  async findAll(): Promise<Game[]> {
    return this.db.game.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
