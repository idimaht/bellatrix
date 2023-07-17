import { Expose, Type } from 'class-transformer';
import { ManagerDto } from '../shared/manager.dto';
import { Resource } from '@backend/resources/resource';

export class UpdateResource extends Resource {
  @Expose()
  @Type(() => ManagerDto)
  data: ManagerDto;
}
