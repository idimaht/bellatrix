import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
