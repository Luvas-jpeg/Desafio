import { Column } from './column.model'

export interface Board {
    id: number;
    title: string;
    column?: Column[];
}