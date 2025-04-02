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

  @ApiPropertyOptional({ example: 'O', enum: ['X', 'O'], description: 'The winner of the game if there is one' })
  winner?: 'X' | 'O';
}
