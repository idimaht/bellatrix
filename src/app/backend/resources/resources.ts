import { Expose } from 'class-transformer';
import { IPaginationLinks, IPaginationMeta } from 'nestjs-typeorm-paginate';

export class Resources {
  @Expose()
  status: {
    code: number;
    message: string;
    link: IPaginationLinks;
    meta: IPaginationMeta;
  };
}
