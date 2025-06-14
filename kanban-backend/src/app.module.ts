// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Board } from './entities/board.entity';
import { ColumnEntity } from './entities/column.entity';
import { Card } from './entities/card.entity';
import { User } from './entities/user.entity'; // <<--- GARANTA ESTE IMPORT
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Board, ColumnEntity, Card, User], // <<--- GARANTA QUE 'User' ESTÁ NESTE ARRAY
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
