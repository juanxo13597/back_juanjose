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
  login(user: LoginUserDTO) {
    const payload = { ...user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /** validar usuario */
  validateUser(email: string, pass: string): Promise<User> {
    return this.usersService.findOne(email);
  }
}
