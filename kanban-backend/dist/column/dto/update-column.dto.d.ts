import { CreateColumnDto } from './create-column.dto';
declare const UpdateColumnDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateColumnDto>>;
export declare class UpdateColumnDto extends UpdateColumnDto_base {
    title?: string;
    boardId?: number;
    order?: number;
}
export {};
