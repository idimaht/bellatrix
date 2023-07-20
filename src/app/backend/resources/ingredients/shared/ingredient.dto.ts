import { MenuDto } from '@backend/resources/menus/shared/menus.dto';
import { Expose } from 'class-transformer';

export class IngredientDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  amount: number;

  @Expose()
  menus: MenuDto[];
}
