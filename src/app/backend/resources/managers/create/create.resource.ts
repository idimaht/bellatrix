import { Expose, Type } from 'class-transformer';
import { ManagerDto } from '../shared/manager.dto';
import { Resource } from '../../resource';

export class CreateResource extends Resource {
  @Expose()
  @Type(() => ManagerDto)
  data: ManagerDto;
}
