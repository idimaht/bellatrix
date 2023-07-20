import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  amount: number;
}
