import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  init(): boolean {
    return true;
  }
}
