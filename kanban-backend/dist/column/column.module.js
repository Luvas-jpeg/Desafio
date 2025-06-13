"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnModule = void 0;
const common_1 = require("@nestjs/common");
const column_service_1 = require("./column.service");
const column_controller_1 = require("./column.controller");
const typeorm_1 = require("@nestjs/typeorm");
const column_entity_1 = require("../entities/column.entity");
const board_entity_1 = require("../entities/board.entity");
const board_module_1 = require("../board/board.module");
let ColumnModule = class ColumnModule {
};
exports.ColumnModule = ColumnModule;
exports.ColumnModule = ColumnModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([column_entity_1.ColumnEntity, board_entity_1.Board]), board_module_1.BoardModule],
        controllers: [column_controller_1.ColumnController],
        providers: [column_service_1.ColumnService],
    })
], ColumnModule);
//# sourceMappingURL=column.module.js.map