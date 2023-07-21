import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { BranchEntity } from '../entities/branch.entity';
import { ManagerEntity } from '../entities/manager.entity';
import BranchesController from './controllers/branches';
import { BranchesService } from '../services/branches.service';
import { ManagersService } from '@services/managers.service';
import ManagersController from './controllers/managers';
import { IngredientEntity } from '@entities/ingredient.entity';
import { MenuEntity } from '@entities/menu.entity';
import IngredientsController from './controllers/ingredients';
import { IngredientsService } from '@services/ingredients.service';
import MenusController from './controllers/menus';
import { MenusService } from '@services/menus.service';
import { IngredientMenuService } from '@services/ingredient-menu';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      BranchEntity,
      ManagerEntity,
      IngredientEntity,
      MenuEntity,
    ]),
  ],
  controllers: [
    ...BranchesController,
    ...ManagersController,
    ...IngredientsController,
    ...MenusController,
  ],
  providers: [
    BranchesService,
    ManagersService,
    IngredientsService,
    MenusService,
    IngredientMenuService,
  ],
  exports: [
    BranchesService,
    ManagersService,
    IngredientsService,
    MenusService,
    IngredientMenuService,
  ],
})
export class BackendModule {}
