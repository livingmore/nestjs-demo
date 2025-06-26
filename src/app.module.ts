import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LoggerModule } from './common/logger/logger.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [ConfigModule, LoggerModule, TestModule],
  controllers: [AppController],
})
export class AppModule {}
