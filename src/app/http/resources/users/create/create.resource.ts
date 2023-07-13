import { Expose, Type } from 'class-transformer';
import { BranchDto } from '../shared/branch.dto';

export class CreateResources {
  @Expose()
  @Type(() => BranchDto)
  data: BranchDto;
}
