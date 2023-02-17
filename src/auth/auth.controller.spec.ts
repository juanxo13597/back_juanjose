import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('registerUser', () => {
    it('should return a user', async () => {
      jest.spyOn(service, 'register').mockImplementation(() =>
        Promise.resolve({
          name: 'name',
          surname: 'surname',
          email: 'email@email.piaa',
          id: 11,
          created_at: '2023-02-17T13:09:35.802Z',
          updated_at: '2023-02-17T13:09:35.802Z',
        }),
      );

      expect(
        controller.registerUser({
          email: 'email@email.es',
          name: 'name',
          surname: 'surname',
          password: '123123',
          password_confirmation: '123123',
        }),
      );
    });
  });

  describe('login', () => {
    it('should return a token', async () => {
      jest
        .spyOn(service, 'login')
        .mockImplementation(() => Promise.resolve({ access_token: 'token' }));

      expect(
        controller.login({
          email: 'email@email.es',
          password: '123123',
        }),
      );
    });
  });
});
