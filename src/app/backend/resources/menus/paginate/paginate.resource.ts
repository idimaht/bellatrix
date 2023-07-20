import { Expose, Type } from 'class-transformer';
import { MenuDto } from '../shared/menus.dto';
import { Resource } from '../../resource';

export class UpdateResource extends Resource {
  @Expose()
  @Type(() => MenuDto)
  data: MenuDto[];
}
