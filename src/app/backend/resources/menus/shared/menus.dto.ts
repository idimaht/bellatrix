import { IngredientDto } from '@backend/resources/ingredients/shared/ingredient.dto';
import { Expose, Type } from 'class-transformer';

export class MenuDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];
}
