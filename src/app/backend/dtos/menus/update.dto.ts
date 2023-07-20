import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  price: number;

  @Type(() => Number)
  @IsNotEmpty()
  ingredients: number[];
}
