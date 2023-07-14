import { Expose, Type } from 'class-transformer';
import { BranchDto } from '../shared/branch.dto';
import { Resource } from '../../resource';

export class UpdateResource extends Resource {
  @Expose()
  @Type(() => BranchDto)
  data: BranchDto;
}
