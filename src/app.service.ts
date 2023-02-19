/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { appModel } from './app.model';

/** servicio principal */
@Injectable()
export class AppService {
  constructor(
    private JwtService: JwtService,
    private UsersService: UsersService,
  ) {}

  /** init */
  async init(headers): Promise<appModel> {
    const token = this.getToken(headers);
    let response = { status: true, user: null };
    if (token) {
      const decoded: any = this.JwtService.decode(token);
      const { password, ...user } = await this.UsersService.findOne(
        decoded.email,
      );
      response = { status: true, user };
    }

    return response;
  }

  /** get token */
  getToken(headers): string {
    return headers?.authorization?.split(' ')[1];
  }
}
