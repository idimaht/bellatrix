import { IngredientDto } from '@backend/resources/ingredients/shared/ingredient.dto';
import { Expose } from 'class-transformer';

export class MenuDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  ingredients: IngredientDto[];
}
