import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AIStrategyToken } from './ai/ai.strategy';
import { EvaluateGameDto } from './dto/evaluate-game.dto';

describe('GameService', () => {
  let service: GameService;
  let db: PrismaService;
  const mockDb = {
    game: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  const mockAI = {
    getMove: jest.fn().mockResolvedValue([0, 0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        { provide: PrismaService, useValue: mockDb },
        { provide: AIStrategyToken, useValue: mockAI },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
    db = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all games in desc order', async () => {
      const games = [{ id: 1 }, { id: 2 }];
      mockDb.game.findMany.mockResolvedValue(games);
      const result = await service.findAll();
      expect(result).toEqual(games);
      expect(mockDb.game.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('evaluate', () => {
    it('should detect win immediately and save it', async () => {
      const dto: EvaluateGameDto = {
        board: [['X', 'X', 'X'], ['', '', ''], ['', '', '']],
        player: 'X',
      };

      const result = await service.evaluate(dto);

      expect(result.winner).toBe('X');
      expect(mockDb.game.create).toHaveBeenCalled();
    });

    it('should apply AI move and detect win', async () => {
      const dto: EvaluateGameDto = {
        board: [['O', '', ''], ['', 'O', ''], ['', '', '']],
        player: 'X',
      };

      mockAI.getMove.mockResolvedValue([2, 2]);

      const result = await service.evaluate(dto);

      expect(result.winner).toBe('O');
      expect(mockDb.game.create).toHaveBeenCalled();
    });

    it('should apply AI move without win', async () => {
      const dto: EvaluateGameDto = {
        board: [['X', '', ''], ['', '', ''], ['', '', '']],
        player: 'X',
      };

      mockAI.getMove.mockResolvedValue([1, 1]);

      const result = await service.evaluate(dto);

      expect(result.winner).toBeUndefined();
    });

    it('should throw if AI picks an occupied cell', async () => {
      const dto: EvaluateGameDto = {
        board: [['X', '', ''], ['', '', ''], ['', '', '']],
        player: 'X',
      };

      mockAI.getMove.mockResolvedValue([0, 0]);

      await expect(service.evaluate(dto)).rejects.toThrow();
    });
    it('should detect a draw and save it', async () => {
      const dto: EvaluateGameDto = {
        board: [
          ['X', 'O', 'X'],
          ['O', 'X', 'X'],
          ['O', 'X', 'O'],
        ],
        player: 'X',
      };

      const result = await service.evaluate(dto);

      expect(result.winner).toBe('DRAW');
      expect(result.message).toContain('draw');
      expect(mockDb.game.create).toHaveBeenCalled();
    });
  });
  it('should detect a continue the game if first row empty', async () => {
    const dto: EvaluateGameDto = {
      board: [
        ["", "", ""],
        ["X", "O", "O"], 
        ["X", "X", ""]
      ],
      player: 'X',
    };


    mockAI.getMove.mockResolvedValue([2, 2]);

    const result = await service.evaluate(dto);

    expect(result.winner).toBeUndefined();
  });
});
