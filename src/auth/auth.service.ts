import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginUserDTO } from './dtos/loginUser.dto';
import { RegisterUserDTO } from './dtos/registerUser.dto';

/** servicio de autentificacion */
@Injectable()
export class AuthService {
  /** constructor */
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /** registro */
  register(user: RegisterUserDTO): Promise<User | HttpException> {
    return this.usersService.registerUser(user);
  }

  /** login */
  async login(user: LoginUserDTO) {
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
