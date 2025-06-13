// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importar TypeOrmModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Board } from './entities/board.entity';
import { ColumnEntity } from './entities/column.entity';
import { Card } from './entities/card.entity';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Tipo de banco de dados
      database: 'db.sqlite', // Nome do arquivo do banco de dados
      entities: [Board, ColumnEntity, Card], // Aqui iremos listar nossas entidades (tabelas)
      synchronize: true, // Isso sincroniza o esquema do banco de dados com as entidades
    }),
    BoardModule,
    ColumnModule,
    CardModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
