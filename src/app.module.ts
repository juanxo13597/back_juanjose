import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '' || '73Y&V5xA',
        database: 'juanjosenavarroperea',
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        synchronize: true, // ! true in dev, false in prod
        autoLoadEntities: true, // ! true in dev, false in prod
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
