import { CreateCardDto } from './create-card.dto';
declare const UpdateCardDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCardDto>>;
export declare class UpdateCardDto extends UpdateCardDto_base {
    title?: string;
    description?: string;
    columnId?: number;
    order?: number;
}
export {};
