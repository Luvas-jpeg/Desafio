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
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const board_entity_1 = require("../entities/board.entity");
let BoardService = class BoardService {
    boardRepository;
    constructor(boardRepository) {
        this.boardRepository = boardRepository;
    }
    async create(createBoardDto) {
        const board = this.boardRepository.create(createBoardDto);
        return this.boardRepository.save(board);
    }
    async findAll() {
        return this.boardRepository.find();
    }
    async findOne(id) {
        const board = await this.boardRepository.findOne({ where: { id } });
        if (!board) {
            throw new common_1.NotFoundException(`Board with ID "${id}" not found`);
        }
        return board;
    }
    async update(id, updateBoardDto) {
        const board = await this.findOne(id);
        this.boardRepository.merge(board, updateBoardDto);
        return this.boardRepository.save(board);
    }
    async remove(id) {
        const result = await this.boardRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Board with ID "${id}" not found`);
        }
    }
};
exports.BoardService = BoardService;
exports.BoardService = BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BoardService);
//# sourceMappingURL=board.service.js.map