import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  address: string;
}
