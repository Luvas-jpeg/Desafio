import { ColumnEntity } from './column.entity';
import { User } from './user.entity';
export declare class Board {
    id: number;
    title: string;
    owner: User;
    ownerId: number;
    members: User[];
    columns: ColumnEntity[];
}
