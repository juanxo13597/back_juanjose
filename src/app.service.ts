import { Injectable } from '@nestjs/common';

/** servicio principal */
@Injectable()
export class AppService {
  /** init */
  init(): boolean {
    return true;
  }
}
