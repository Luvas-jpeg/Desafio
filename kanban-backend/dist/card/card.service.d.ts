import { Repository } from 'typeorm';
import { Card } from '../entities/card.entity';
import { ColumnEntity } from '../entities/column.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare class CardService {
    private cardRepository;
    private columnRepository;
    constructor(cardRepository: Repository<Card>, columnRepository: Repository<ColumnEntity>);
    create(createCardDto: CreateCardDto): Promise<Card>;
    findAll(): Promise<Card[]>;
    findOne(id: number): Promise<Card>;
    update(id: number, updateCardDto: UpdateCardDto): Promise<Card>;
    remove(id: number): Promise<void>;
    findCardsByColumn(columnId: number): Promise<Card[]>;
}
