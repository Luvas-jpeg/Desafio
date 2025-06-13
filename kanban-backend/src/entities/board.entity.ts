// src/entities/board.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ColumnEntity } from './column.entity'; // Importe a entidade Column

@Entity('boards') // Define o nome da tabela no banco de dados
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => ColumnEntity, column => column.board, { cascade: true })
  columns: ColumnEntity[]; // Uma Board tem muitas Columns
}
