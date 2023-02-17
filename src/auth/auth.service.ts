import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginTokenDTO, LoginUserDTO } from './dtos/loginUser.dto';
import { RegisterSavedDTO, RegisterUserDTO } from './dtos/registerUser.dto';

/** servicio de autentificacion */
@Injectable()
export class AuthService {
  /** constructor */
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /** registro */
  register(user: RegisterUserDTO): Promise<RegisterSavedDTO | HttpException> {
    return this.usersService.registerUser(user);
  }

  /** login */
  async login(user: LoginUserDTO): Promise<LoginTokenDTO | HttpException> {
    const validatedUser = await this.validateUser(user.email, user.password);
    if (!validatedUser) {
      return new HttpException('Email or password incorrect', 401);
    }

    const payload = validatedUser;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /** validar usuario */
  async validateUser(email: string, pass: string): Promise<User> {
    return await this.usersService.validateUser(email, pass);
  }
}
