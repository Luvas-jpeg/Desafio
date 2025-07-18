"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const board_entity_1 = require("./entities/board.entity");
const column_entity_1 = require("./entities/column.entity");
const card_entity_1 = require("./entities/card.entity");
const user_entity_1 = require("./entities/user.entity");
const auth_module_1 = require("./auth/auth.module");
const board_module_1 = require("./board/board.module");
const column_module_1 = require("./column/column.module");
const card_module_1 = require("./card/card.module");
const board_members_module_1 = require("./board-members/board-members.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db.sqlite',
                entities: [board_entity_1.Board, column_entity_1.ColumnEntity, card_entity_1.Card, user_entity_1.User],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            board_module_1.BoardModule,
            column_module_1.ColumnModule,
            card_module_1.CardModule,
            board_members_module_1.BoardMembersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map