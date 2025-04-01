import {
    IsArray,
    IsString,
    IsIn,
    Validate,
    IsOptional,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { IsValidBoard } from './validators/is-valid-board.validator';
  
  export class EvaluateGameDto {
    @IsArray()
    @Validate(IsValidBoard)
    @Type(() => Array)
    board: string[][];
  
    @IsString()
    player: string = 'Player';
  }
  