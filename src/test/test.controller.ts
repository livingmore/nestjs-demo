import { Controller, Get, Logger } from '@nestjs/common';

@Controller('test')
export class TestController {
  constructor(private readonly logger: Logger) {
    this.logger.log('TestController created', TestController.name);
  }
  @Get()
  test() {
    this.logger.log('get /test', TestController.name);

    return 'test';
  }
}
