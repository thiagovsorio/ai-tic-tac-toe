import { ApiProperty } from '@nestjs/swagger';

export class Game {
  @ApiProperty()
  id: number;

  @ApiProperty(({ default: 'playerName' }))
  playerX: string;

  @ApiProperty({ default: 'AI' })
  playerO: string;

  @ApiProperty({ default: 'X' })
  winner: string;

  @ApiProperty({
    description: '2D board state containing X, O or empty strings',
    example: [
      ['X', 'O', ''],
      ['X', 'X', 'O'],
      ['X', 'O', 'O'],
    ],
    type: 'array',
    items: {
      type: 'array',
      items: { type: 'string' },
    },
  })
  boardState: string[][];

  @ApiProperty()
  createdAt: Date;
}
