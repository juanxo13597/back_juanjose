import { HttpException } from '@nestjs/common/exceptions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from './auth.service';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { ApiBody } from '@nestjs/swagger';
import { LoginTokenDTO, LoginUserDTO } from './dtos/loginUser.dto';
import { RegisterSavedDTO, RegisterUserDTO } from './dtos/registerUser.dto';

/** controlador de autenticación */
@Controller('auth')
export class AuthController {
  /** constructor */
  constructor(private readonly AuthService: AuthService) {}

  /** registro */
  @ApiBody({ type: RegisterUserDTO })
  @Post('register')
  registerUser(
    @Body() newUser: RegisterUserDTO,
  ): Promise<RegisterSavedDTO | HttpException> {
    return this.AuthService.register(newUser);
  }

  /** login */
  @ApiBody({ type: LoginUserDTO })
  @Post('login')
  login(@Body() user: LoginUserDTO): Promise<LoginTokenDTO | HttpException> {
    return this.AuthService.login(user);
  }
}
