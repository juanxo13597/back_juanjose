import { HttpException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  RegisterSavedDTO,
  RegisterUserDTO,
} from '../auth/dtos/registerUser.dto';

/** servicio de usuarios */
@Injectable()
export class UsersService {
  /** constructor */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /** crear nuevo usuario */
  async registerUser(
    newuser: RegisterUserDTO,
  ): Promise<RegisterSavedDTO | HttpException> {
    if (await this.findOne(newuser.email)) {
      return new HttpException('Email already exists', 401);
    }

    if (newuser.password !== newuser.password_confirmation) {
      return new HttpException('Password confirmation does not match', 401);
    }

    const hashPassword = await bcrypt.hash(newuser.password, 10);
    newuser.password = hashPassword;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, password_confirmation, ...userSaved } =
      await this.usersRepository.save(newuser);

    return userSaved;
  }

  /** buscar usuario */
  findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  /** validar usuario */
  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.findOne(email);
    const isMatch = await bcrypt.compare(pass, user.password);

    return user && isMatch ? user : null;
  }
}
