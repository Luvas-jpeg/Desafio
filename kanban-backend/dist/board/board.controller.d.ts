import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    create(createBoardDto: CreateBoardDto): Promise<import("../entities/board.entity").Board>;
    findAll(): Promise<import("../entities/board.entity").Board[]>;
    findOne(id: string): Promise<import("../entities/board.entity").Board>;
    update(id: string, updateBoardDto: UpdateBoardDto): Promise<import("../entities/board.entity").Board>;
    remove(id: string): Promise<void>;
}
