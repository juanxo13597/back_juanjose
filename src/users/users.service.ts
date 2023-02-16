import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../common/entities/user.entity';
import { Repository } from 'typeorm';

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
}
