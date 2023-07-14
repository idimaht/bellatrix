import { IPaginationLinks, IPaginationMeta } from 'nestjs-typeorm-paginate';

export type SuccessResponseType = {
  status: {
    statusCode: number;
    message: string;
  };
  data?: Record<any, any>;
  link?: IPaginationLinks;
  meta?: IPaginationMeta;
};
