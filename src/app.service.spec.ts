import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';

describe('AppService', () => {
  let service: AppService;
  let repo: Repository<User>;
  let jwt: JwtService;
  const date = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
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

    service = module.get<AppService>(AppService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
    jwt = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should called init()', async () => {
    const user = {
      id: 1,
      email: 'email@email.es',
      name: 'name',
      surname: 'surname',
      created_at: date,
      updated_at: date,
    };

    jest.spyOn(jwt, 'decode').mockImplementation(() => user);

    jest.spyOn(repo, 'findOne').mockResolvedValue(user);
    const response = await service.init({ authorization: 'token token' });
    expect(response).toEqual({ status: true, user });
  });
});
