import { HttpException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

/** servicio de usuarios */
@Injectable()
export class UsersService {
  /** constructor */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /** obtener todos los usuarios */
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /** crear nuevo usuario */
  async registerUser(newuser): Promise<User | HttpException> {
    if (await this.findOne(newuser.email)) {
      return new HttpException('Email already exists', 401);
    }

    if (newuser.password !== newuser.password_confirmation) {
      return new HttpException('Password confirmation does not match', 401);
    }

    const hashPassword = await bcrypt.hash(newuser.password, 10);
    newuser.password = hashPassword;

    const userSaved = await this.usersRepository.save(newuser);

    return { ...userSaved, password: undefined };
  }

  /** buscar usuario */
  findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  /** validar usuario */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.findOne(email);
    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
