import { Expose } from 'class-transformer';

export class BranchDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  tel: string;

  @Expose()
  address: string;
}
