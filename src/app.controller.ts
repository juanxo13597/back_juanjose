import { Controller, Get, Request } from '@nestjs/common';
import { appModel } from './app.model';
import { AppService } from './app.service';

/** controler principal */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** comprobacion de backend */
  @Get('init')
  init(@Request() req): Promise<appModel> {
    return this.appService.init(req.headers);
  }
}
