import { Expose, Type } from 'class-transformer';
import { BranchDto } from '../shared/branch.dto';
import { Resource } from '@backend/resources/resource';

export class CreateResource extends Resource {
  @Expose()
  @Type(() => BranchDto)
  data: BranchDto;
}
