import { Expose, Type } from 'class-transformer';
import { Resources } from '@backend/resources/resources';
import { IngredientDto } from '../shared/ingredient.dto';

export class PaginateResource extends Resources {
  @Expose()
  @Type(() => IngredientDto)
  data: IngredientDto[];
}
