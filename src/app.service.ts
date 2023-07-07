import { Injectable } from '@nestjs/common';
//delete
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
