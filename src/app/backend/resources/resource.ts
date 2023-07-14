import { Expose } from 'class-transformer';

export class Resource {
  @Expose()
  status: {
    code: number;
    message: string;
  };
}
