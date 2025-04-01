import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { OpenAIStrategy } from './ai/openai-strategy';
import { AIStrategyToken } from './ai/ai.strategy';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GameController],
  providers: [
    GameService,
    {
      provide: AIStrategyToken,
      useClass: OpenAIStrategy,
    },
  ],
})
export class GameModule {}
