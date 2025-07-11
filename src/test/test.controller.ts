// import Redis from 'ioredis';
import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PrismaService } from '@/database/prisma/prisma.service';
// import { InjectRedis } from '@nestjs-modules/ioredis';

@Controller('test')
export class TestController {
  constructor(
    private readonly logger: Logger,
    // @InjectRedis() private readonly redis: Redis,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) {
    this.logger.log('TestController created', TestController.name);
  }
  @Get()
  async test() {
    this.logger.log('get /test', TestController.name);
    // return 'test';

    // await this.redis.set('key', 'Redis data!', 'EX', 6000);
    // const redisData = await this.redis.get('key');

    // return { redisData };

    // await this.cacheManager.set('key1', 'value');
    // const cacheManagerData = await this.cacheManager.get('key1');
    // return { cacheManagerData };

    const res = await this.prisma.user.findMany();
    return res;
  }
}
