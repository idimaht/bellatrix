import { MenuDto } from '@backend/resources/menus/shared/menus.dto';
import { Expose, Type } from 'class-transformer';

export class IngredientDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  amount: number;

  @Expose()
  @Type(() => MenuDto)
  menus: MenuDto[];
}
