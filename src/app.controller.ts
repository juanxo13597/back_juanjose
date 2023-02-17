import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/** controler principal */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** comprobacion de backend */
  @Get('init')
  init(): boolean {
    return this.appService.init();
  }
}
