import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  price: number;

  @Type(() => Number)
  @IsNotEmpty()
  ingredients: number[];
}
