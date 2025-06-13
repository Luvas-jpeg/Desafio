import { Board } from './board.entity';
import { Card } from './card.entity';
export declare class ColumnEntity {
    id: number;
    title: string;
    order: number;
    board: Board;
    cards: Card[];
}
