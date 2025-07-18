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
exports.CardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const card_entity_1 = require("../entities/card.entity");
const column_entity_1 = require("../entities/column.entity");
let CardService = class CardService {
    cardRepository;
    columnRepository;
    constructor(cardRepository, columnRepository) {
        this.cardRepository = cardRepository;
        this.columnRepository = columnRepository;
    }
    async create(createCardDto) {
        const { columnId, title, description, order } = createCardDto;
        const column = await this.columnRepository.findOne({
            where: { id: columnId },
        });
        if (!column) {
            throw new common_1.NotFoundException(`Column with ID "${columnId}" not found.`);
        }
        const newCard = this.cardRepository.create({
            title,
            description,
            order,
            column,
        });
        return this.cardRepository.save(newCard);
    }
    async findAll() {
        return this.cardRepository.find({ relations: ['column'] });
    }
    async findOne(id) {
        const card = await this.cardRepository.findOne({
            where: { id },
            relations: ['column'],
        });
        if (!card) {
            throw new common_1.NotFoundException(`Card with ID "${id}" not found.`);
        }
        return card;
    }
    async update(id, updateCardDto) {
        const card = await this.findOne(id);
        if (updateCardDto.columnId) {
            const column = await this.columnRepository.findOne({
                where: { id: updateCardDto.columnId },
            });
            if (!column) {
                throw new common_1.NotFoundException(`Column with ID "${updateCardDto.columnId}" not found.`);
            }
            card.column = column;
        }
        this.cardRepository.merge(card, updateCardDto);
        return this.cardRepository.save(card);
    }
    async remove(id) {
        const result = await this.cardRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Card with ID "${id}" not found.`);
        }
    }
    async findCardsByColumn(columnId) {
        const column = await this.columnRepository.findOne({
            where: { id: columnId },
        });
        if (!column) {
            throw new common_1.NotFoundException(`Column with ID "${columnId}" not found.`);
        }
        return this.cardRepository.find({
            where: { column: { id: columnId } },
            order: { order: 'ASC' },
        });
    }
};
exports.CardService = CardService;
exports.CardService = CardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __param(1, (0, typeorm_1.InjectRepository)(column_entity_1.ColumnEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CardService);
//# sourceMappingURL=card.service.js.map