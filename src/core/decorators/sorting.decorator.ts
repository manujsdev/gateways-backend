import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export type Sorting = {
  field: string;
  direction: string;
};

/**
 * @description we can sort only one column at a time
 */
export const SortingParams = createParamDecorator(
  (validParams, ctx: ExecutionContext): Sorting => {
    const req: Request = ctx.switchToHttp().getRequest();
    const sort = req.query.sort as string;
    if (!sort) return null;

    // check if the valid params sent is an array
    if (typeof validParams !== 'object')
      throw new BadRequestException('Invalid sort parameter');

    // check the format of the sort query param
    const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;
    if (!sort.match(sortPattern))
      throw new BadRequestException('Invalid sort parameter pattern');

    // extract the property name and direction and check if they are valid
    const [field, direction] = sort.split(':');
    if (!validParams.includes(field))
      throw new BadRequestException(`Invalid sort property: ${field}`);

    return { field, direction };
  },
);
