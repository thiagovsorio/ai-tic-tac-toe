import {
    IsArray,
    IsString,
    IsIn,
    Validate,
    IsOptional,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { IsValidBoard } from './validators/is-valid-board.validator';
import { ApiProperty } from '@nestjs/swagger';
  
  export class EvaluateGameDto {
    @IsArray()
    @Validate(IsValidBoard)
    @Type(() => Array)
    @ApiProperty({ example: [
      ['X', '', 'O'], 
      ['', 'X', ''], 
      ['', 'X', 'O']
    ] })
    board: string[][];
  
    @IsString()
    @ApiProperty({ example: 'playerName' , description: 'Name of the player', default: 'Player'})
    player: string = 'Player';
  }
  