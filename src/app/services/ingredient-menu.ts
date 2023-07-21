import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { IngredientsService } from './ingredients.service';
import { MenuEntity } from '@entities/menu.entity';

@Injectable()
export class IngredientMenuService {
  constructor(private readonly ingredientsService: IngredientsService) {}

  async attach(
    ingredientIds: number[],
    menu: MenuEntity,
    queryRunner: QueryRunner,
  ): Promise<void> {
    const getIngredients = await this.ingredientsService.getByIds(
      ingredientIds,
    );

    if (getIngredients.length != ingredientIds.length) {
      throw new NotFoundException();
    }

    menu.ingredients = getIngredients;

    await queryRunner.manager.save(menu);
  }

  async detach(menu: MenuEntity, queryRunner: QueryRunner): Promise<void> {
    menu.ingredients = [];

    await queryRunner.manager.save(menu);
  }
}
