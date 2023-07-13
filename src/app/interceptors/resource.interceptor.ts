import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { get, isEmpty, uniq } from 'lodash';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
          groups: this.handlesPlainToInstanceGroups(context),
        });
      }),
    );
  }

  private handlesPlainToInstanceGroups(context: ExecutionContext): string[] {
    const httpQuery = get(context.switchToHttp().getRequest(), 'query', []);

    const includes = get(httpQuery, 'include', '')
      .split(',')
      .filter((value: string) => !isEmpty(value))
      .map((value: string) => `include:${value}`);

    const appends = get(httpQuery, 'appends', '')
      .split(',')
      .filter((value: string) => !isEmpty(value))
      .map((value: string) => `appends:${value}`);

    // Push include and appends to class-transformer groups (if available)
    const groups = [];

    uniq(includes).forEach((include) => groups.push(include));
    uniq(appends).forEach((append) => groups.push(append));

    return groups;
  }
}

interface ClassConstructor {
  new (...args: any[]): any;
}

export function UseResources(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
