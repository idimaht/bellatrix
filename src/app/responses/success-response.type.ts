export type SuccessResponseType = {
  status: {
    statusCode: number;
    message: string;
  };
  data?: Record<any, any>;
};
