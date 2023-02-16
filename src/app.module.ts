import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DB || 'juanjosenavarroperea',
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        synchronize: Boolean(process.env.PROD) || true, // ! true in dev, false in prod
        autoLoadEntities: Boolean(process.env.PROD) || true, // ! true in dev, false in prod
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
