import { Board } from './board.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    ownedBoards: Board[];
    boardsAsMember: Board[];
}
