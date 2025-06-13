import { ColumnEntity } from './column.entity';
export declare class Card {
    id: number;
    title: string;
    description: string;
    order: number;
    column: ColumnEntity;
}
