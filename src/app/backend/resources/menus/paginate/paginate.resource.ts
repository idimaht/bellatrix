import { Expose, Type } from 'class-transformer';
import { MenuDto } from '../shared/menus.dto';
import { Resources } from '@backend/resources/resources';

export class PaginateResource extends Resources {
  @Expose()
  @Type(() => MenuDto)
  data: MenuDto[];
}
