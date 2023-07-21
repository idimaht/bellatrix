import { Expose, Type } from 'class-transformer';
import { Resource } from '@backend/resources/resource';
import { IngredientDto } from '../shared/ingredient.dto';

export class CreateResource extends Resource {
  @Expose()
  @Type(() => IngredientDto)
  data: IngredientDto;
}
