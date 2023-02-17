import { HttpException } from '@nestjs/common/exceptions';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { ApiBody } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { RegisterUserDTO } from './dtos/registerUser.dto';

/** controlador de autenticación */
@Controller('auth')
export class AuthController {
  /** constructor */
  constructor(private UsersService: UsersService) {}

  /** registro */
  @ApiBody({ type: RegisterUserDTO })
  @Post('register')
  registerUser(
    @Body() newUser: RegisterUserDTO,
  ): Promise<User | HttpException> {
    return this.UsersService.registerUser(newUser);
  }
}
