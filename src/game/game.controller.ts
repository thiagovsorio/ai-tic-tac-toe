import { Controller, Get, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { EvaluateGameDto } from './dto/evaluate-game.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Game } from './entities/game.entity';
import { EvaluateGameResultDto } from './dto/evaluate-game-result.dto';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('/evaluate')
  @ApiResponse({
    status: 200,
    description: 'Evaluates the board and returns the result.',
    type: EvaluateGameResultDto,
  })
  async evalute(@Body() createGameDto: EvaluateGameDto) {
    return await this.gameService.evaluate(createGameDto);
  }
  
  @Get('/history')
  @ApiResponse({
    status: 200,
    description: 'Returns a list of completed games.',
    type: Game,
    isArray: true,
  })
  async findAll() {
    return await this.gameService.findAll();
  }
}
