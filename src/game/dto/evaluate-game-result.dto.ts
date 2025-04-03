import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EvaluateGameResultDto {
  @ApiProperty({ example: 'O has already won.' })
  message: string;

  @ApiProperty({ example: [
    ['X', '', 'O'], 
    ['', 'X', 'O'], 
    ['', 'X', 'O']
    ] })
  board: string[][];

  @ApiPropertyOptional({
    example: 'O',
    enum: ['X', 'O', 'DRAW'],
    description: 'The winner of the game, or DRAW if tied',
  })
  winner?: 'X' | 'O' | 'DRAW';
}
