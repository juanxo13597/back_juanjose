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

    const hashPassword = await bcrypt.hash(newuser.password, 10);
    newuser.password = hashPassword;

    const userSaved = await this.usersRepository.save(newuser);

    return { ...userSaved, password: undefined };
  }

  /** buscar usuario */
  findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
