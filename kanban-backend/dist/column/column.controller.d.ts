import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
export declare class ColumnController {
    private readonly columnService;
    constructor(columnService: ColumnService);
    create(createColumnDto: CreateColumnDto): Promise<import("../entities/column.entity").ColumnEntity>;
    findAll(): Promise<import("../entities/column.entity").ColumnEntity[]>;
    findOne(id: string): Promise<import("../entities/column.entity").ColumnEntity>;
    update(id: string, updateColumnDto: UpdateColumnDto): Promise<import("../entities/column.entity").ColumnEntity>;
    remove(id: string): Promise<void>;
    findColumnByBoard(boardId: string): Promise<import("../entities/column.entity").ColumnEntity[]>;
}
