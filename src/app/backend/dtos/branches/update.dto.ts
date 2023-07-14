import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  tel: string;

  @IsOptional()
  address: string;
}
