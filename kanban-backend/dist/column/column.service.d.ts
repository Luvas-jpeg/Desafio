import { Repository } from 'typeorm';
import { ColumnEntity } from '../entities/column.entity';
import { Board } from '../entities/board.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
export declare class ColumnService {
    private columnRepository;
    private boardRepository;
    constructor(columnRepository: Repository<ColumnEntity>, boardRepository: Repository<Board>);
    create(createColumnDto: CreateColumnDto): Promise<ColumnEntity>;
    findAll(): Promise<ColumnEntity[]>;
    findOne(id: number): Promise<ColumnEntity>;
    update(id: number, updateColumnDto: UpdateColumnDto): Promise<ColumnEntity>;
    remove(id: number): Promise<void>;
    findColumnsByBoard(boardId: number): Promise<ColumnEntity[]>;
}
