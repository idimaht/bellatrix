import { Expose } from 'class-transformer';

export class ManagerDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  tel: string;

  @Expose()
  branchId: number;
}
