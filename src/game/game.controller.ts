import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameService } from './game.service';
import { EvaluateGameDto } from './dto/evaluate-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('/evaluate')
  async evalute(@Body() createGameDto: EvaluateGameDto) {
    return await this.gameService.evaluate(createGameDto);
  }
  
  @Get('/history')
  async findAll() {
    return await this.gameService.findAll();
  }

}
