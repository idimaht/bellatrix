import { IsNotEmpty, IsOptional } from 'class-validator';

export class PaginateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  tel: string;

  @IsOptional()
  address: string;
}
