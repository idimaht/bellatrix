import { Expose, Type } from 'class-transformer';
import { MenuDto } from '../shared/menus.dto';
import { Resource } from '@backend/resources/resource';

export class CreateResource extends Resource {
  @Expose()
  @Type(() => MenuDto)
  data: MenuDto;
}
