"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const column_entity_1 = require("../entities/column.entity");
const board_entity_1 = require("../entities/board.entity");
let ColumnService = class ColumnService {
    columnRepository;
    boardRepository;
    constructor(columnRepository, boardRepository) {
        this.columnRepository = columnRepository;
        this.boardRepository = boardRepository;
    }
    async create(createColumnDto) {
        const { boardId, title, order } = createColumnDto;
        const board = await this.boardRepository.findOne({
            where: { id: boardId },
        });
        if (!board) {
            throw new common_1.NotFoundException(`Board with ID "${boardId}" not found.`);
        }
        const newColumn = this.columnRepository.create({
            title,
            order,
            board,
        });
        return this.columnRepository.save(newColumn);
    }
    async findAll() {
        return this.columnRepository.find({ relations: ['board', 'cards'] });
    }
    async findOne(id) {
        const column = await this.columnRepository.findOne({
            where: { id },
            relations: ['board', 'cards'],
        });
        if (!column) {
            throw new common_1.NotFoundException(`Column with ID "${id}" not found.`);
        }
        return column;
    }
    async update(id, updateColumnDto) {
        const column = await this.findOne(id);
        if (updateColumnDto.boardId) {
            const board = await this.boardRepository.findOne({
                where: { id: updateColumnDto.boardId },
            });
            if (!board) {
                throw new common_1.NotFoundException(`Board with ID "${updateColumnDto.boardId}" not found.`);
            }
            column.board = board;
        }
        this.columnRepository.merge(column, updateColumnDto);
        return this.columnRepository.save(column);
    }
    async remove(id) {
        const result = await this.columnRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Column with ID "${id}" not found.`);
        }
    }
    async findColumnsByBoard(boardId) {
        const board = await this.boardRepository.findOne({
            where: { id: boardId },
        });
        if (!board) {
            throw new common_1.NotFoundException(`Board with ID "${boardId}" not found.`);
        }
        return this.columnRepository.find({
            where: { board: { id: boardId } },
            relations: ['cards'],
            order: { order: 'ASC' },
        });
    }
};
exports.ColumnService = ColumnService;
exports.ColumnService = ColumnService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(column_entity_1.ColumnEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ColumnService);
//# sourceMappingURL=column.service.js.map