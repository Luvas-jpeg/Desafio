import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
export declare class BoardService {
    private boardRepository;
    constructor(boardRepository: Repository<Board>);
    create(createBoardDto: CreateBoardDto): Promise<Board>;
    findAll(): Promise<Board[]>;
    findOne(id: number): Promise<Board>;
    update(id: number, updateBoardDto: UpdateBoardDto): Promise<Board>;
    remove(id: number): Promise<void>;
}
