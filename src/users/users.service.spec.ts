import { ValidationPipe } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { APP_PIPE } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;
  const date = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: APP_PIPE,
          useClass: ValidationPipe,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUser', () => {
    it('register user', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      jest.spyOn(repo, 'save').mockResolvedValue({
        email: 'email@email.es',
        created_at: date,
        updated_at: date,
        id: 1,
        name: 'name',
        surname: 'surname',
        password: '123123',
      });

      expect(
        await service.registerUser({
          email: 'email@email.es',
          name: 'name',
          surname: 'surname',
          password: '123123',
          password_confirmation: '123123',
        }),
      ).toEqual({
        email: 'email@email.es',
        created_at: date,
        updated_at: date,
        id: 1,
        name: 'name',
        surname: 'surname',
      });
    });

    it('register user with email already exists', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({
        email: 'email@email.es',
        created_at: date,
        updated_at: date,
        id: 1,
        name: 'name',
        surname: 'surname',
        password: '123123',
      });

      expect(
        await service.registerUser({
          email: 'email@email.es',
          name: 'name',
          surname: 'surname',
          password: '123123',
          password_confirmation: '123123',
        }),
      ).toEqual(new HttpException('Email already exists', 401));
    });

    it('register user with password confirmation does not match', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      expect(
        await service.registerUser({
          email: 'email@email.es',
          name: 'name',
          surname: 'surname',
          password: '123123',
          password_confirmation: '123124',
        }),
      ).toEqual(new HttpException('Password confirmation does not match', 401));
    });
  });

  describe('validateUser', () => {
    it('validate user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({
        email: 'email@email.es',
        name: 'name',
        surname: 'surname',
        password:
          '$2b$10$vP0j5/VH6d5jt.hbxeghfOCVnk7BQznpDh.MIHpAKh.EXyI/IrGHa',
        created_at: date,
        updated_at: date,
        id: 1,
      });

      expect(await service.validateUser('email@email.es', '123123')).toEqual({
        email: 'email@email.es',
        name: 'name',
        surname: 'surname',
        password:
          '$2b$10$vP0j5/VH6d5jt.hbxeghfOCVnk7BQznpDh.MIHpAKh.EXyI/IrGHa',
        created_at: date,
        updated_at: date,
        id: 1,
      });
    });
  });
});
