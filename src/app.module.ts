import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LoggerModule } from './common/logger/logger.module';
import { TestModule } from './test/test.module';
import { CacheModule } from './common/cache/cache.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { CatsModule } from './cats/cats.module';
import { MongoModule } from './database/mongo/mongo.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    CacheModule,
    TestModule,
    PrismaModule,
    MongoModule,
    CatsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
