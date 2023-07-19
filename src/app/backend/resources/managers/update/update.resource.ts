import { Expose, Type } from 'class-transformer';
import { Resource } from '@backend/resources/resource';
import { ManagerDto } from '../shared/manager.dto';

export class UpdateResource extends Resource {
  @Expose()
  @Type(() => ManagerDto)
  data: ManagerDto;
}
