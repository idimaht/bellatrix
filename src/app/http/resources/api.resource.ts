import { HttpStatus } from '@nestjs/common';
import { SuccessResponseType } from 'src/app/responses/success-response.type';

export class ApiResource {
  static successResponse(data?: any): SuccessResponseType {
    if (typeof data === 'undefined') {
      return { status: { statusCode: HttpStatus.OK, message: 'OK' } };
    }

    if (data.items) {
      const { items } = data;

      return {
        data: items,
        status: { statusCode: HttpStatus.OK, message: 'OK' },
      };
    }

    return { data, status: { statusCode: HttpStatus.OK, message: 'OK' } };
  }

  static errorResponse(error: Error): void {
    throw error;
  }
}
