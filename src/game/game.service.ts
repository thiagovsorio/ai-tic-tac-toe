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
    const currentWinner = checkWinner(board);
    if (currentWinner) {
      await this.db.game.create({
        data: {
          playerX: player,
          playerO: 'AI',
          winner: currentWinner,
          boardState: board,
        },
      });

      return {
        message: `${currentWinner} has already won.`,
        winner: currentWinner,
        board,
      };
    }

    const [row, col] = await this.ai.getMove(board);

    if (board[row][col] !== '') {
      throw new BadRequestException('AI attempted an invalid move');
    }

    board[row][col] = 'O';

    const updatedWinner = checkWinner(board);
    if (updatedWinner) {
      await this.db.game.create({
        data: {
          playerX: player,
          playerO: 'AI',
          winner: updatedWinner,
          boardState: board,
        },
      });

      return {
        message: `${updatedWinner} wins!`,
        winner: updatedWinner,
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
