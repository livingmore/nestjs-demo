import { Controller, Get, Logger } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly logger: Logger) {
    this.logger.log('AppController created', AppController.name);
  }

  @Get()
  getHello(): string {
    this.logger.log('get /', AppController.name);
    this.logger.error('get /', AppController.name);
    this.logger.warn('get /', AppController.name);

    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return 'Hello world';
  }
}
