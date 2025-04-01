import 'reflect-metadata';
import { validate } from 'class-validator';
import { EvaluateGameDto } from './evaluate-game.dto';

describe('EvaluateGameDto', () => {
  it('validates a correct 3x3 board and player X', async () => {
    const dto = new EvaluateGameDto();
    dto.board = [
      ['X', 'O', ''],
      ['O', 'X', ''],
      ['', '', 'O'],
    ];
    dto.player = 'X';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('validates a correct 4x4 board with player Thiago', async () => {
    const dto = new EvaluateGameDto();
    dto.board = Array(4).fill(null).map(() => Array(4).fill(''));
    dto.player = 'Thiago'

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('fails for non-square board', async () => {
    const dto = new EvaluateGameDto();
    dto.board = [['X', 'O', ''], ['O', 'X']];

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('fails for invalid player symbol', async () => {
    const dto = new EvaluateGameDto();
    dto.board = [['X', 'O'], ['O', 'Z']];

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('fails for board with non-string values', async () => {
    const dto = new EvaluateGameDto();
    // @ts-expect-error
    dto.board = [['X', 0], ['O', 'X']];

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

