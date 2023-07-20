import { Expose, Type } from 'class-transformer';
import { Resource } from '../../resource';
import { IngredientDto } from '../shared/ingredient.dto';

export class UpdateResource extends Resource {
  @Expose()
  @Type(() => IngredientDto)
  data: IngredientDto[];
}
