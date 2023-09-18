import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export type Pagination = {
  page: number;
  pageSize: number;
  offset: number;
};

export const PaginationParams = createParamDecorator((data, ctx: ExecutionContext): Pagination => {
  const req: Request = ctx.switchToHttp().getRequest();
  const page = parseInt(req.query.page as string);
  const pageSize = parseInt(req.query.pageSize as string);

  // check if page and pageSize are valid
  if (isNaN(page) || page < 0 || isNaN(pageSize) || pageSize < 0) {
    throw new BadRequestException('Invalid pagination params');
  }
  // do not allow to fetch large slices of the dataset
  if (pageSize > 150) {
    throw new BadRequestException('Invalid pagination params: Max size is 150');
  }

  // calculate pagination parameters
  const offset = (page > 0 ? page - 1 : page) * pageSize;
  return { page, pageSize, offset };
});
