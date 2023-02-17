import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

describe('AuthService', () => {
  let service: AuthService;
  let repo: Repository<User>;
  let jwt: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        UsersService,
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

    service = module.get<AuthService>(AuthService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
    jwt = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUser', () => {
    it('should return a user', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(repo, 'save').mockResolvedValueOnce({
        id: 1,
        name: 'nombre',
        surname: 'apellido',
        email: 'email@email.es',
        updated_at: new Date(),
        created_at: new Date(),
        password: '123123',
      });

      expect(
        await service.register({
          name: 'name',
          surname: 'surname',
          email: 'email@email.es',
          password: '123123',
          password_confirmation: '123123',
        }),
      ).toBeTruthy();
    });
  });

  describe('login', () => {
    it('should return a token', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValueOnce({
        id: 1,
        name: 'nombre',
        surname: 'apellido',
        email: 'email@email.es',
        updated_at: new Date(),
        created_at: new Date(),
        password: '123123',
      });

      jest.spyOn(jwt, 'sign').mockReturnValueOnce('token');

      expect(
        await service.login({
          email: 'email@email.es',
          password: '123123',
        }),
      ).toEqual({ access_token: 'token' });
    });

    it('invalid credentials', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValueOnce(null);

      expect(
        await service.login({ email: 'email@email.es', password: '123123' }),
      );
    });
  });

  describe('validateUser', () => {
    it('should return a user', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce({
        id: 1,
        name: 'nombre',
        surname: 'apellido',
        email: 'email@email.es',
        updated_at: new Date(),
        created_at: new Date(),
        password: '123123',
      });

      expect(await service.validateUser('email', 'password')).toEqual(null);
    });
  });
});
