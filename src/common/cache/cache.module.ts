import { Module } from '@nestjs/common';
// import { RedisModule } from '@nestjs-modules/ioredis';
import { CacheModule as CacheModuleNest } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { Keyv } from 'keyv';
// import { CacheableMemory } from 'cacheable';

@Module({
  imports: [
    // RedisModule.forRoot({
    //   type: 'single',
    //   url: 'redis://localhost:6379',
    //   options: {
    //     password: 'example',
    //   },
    // }),
    CacheModuleNest.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          ttl: configService.get('CACHE_TTL') || 60 * 1000,
          stores: [
            // new Keyv({
            //   store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            // }),
            createKeyv({
              url: 'redis://localhost:6379',
              password: 'example',
            }),
          ],
        };
      },
      inject: [ConfigService],
      isGlobal: true,
    }),
  ],
})
export class CacheModule {}
