import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export type Filtering = {
  field: string;
  rule: string;
  value: string;
};

// valid filter rules
export enum FilterRule {
  EQUALS = 'eq', //done
  NOT_EQUALS = 'neq', //done
  GREATER_THAN = 'gt', // done
  GREATER_THAN_OR_EQUALS = 'gte', //done
  LESS_THAN = 'lt', //done
  LESS_THAN_OR_EQUALS = 'lte', //done
  LIKE = 'like', // done
  NOT_LIKE = 'nlike',
  IN = 'in',
  NOT_IN = 'nin',
  IS_NULL = 'isnull',
  IS_NOT_NULL = 'isnotnull'
}

export const FilteringParams = createParamDecorator((data, ctx: ExecutionContext): Filtering => {
  const req: Request = ctx.switchToHttp().getRequest();
  const filter = req.query.filter as string;
  if (!filter) return null;

  // check if the valid params sent is an array
  if (typeof data != 'object') throw new BadRequestException('Invalid filter parameter');

  // validate the format of the filter, if the rule is 'isnull' or 'isnotnull' it don't need to have a value
  if (
    !filter.match(/^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,]+$/) &&
    !filter.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)
  ) {
    throw new BadRequestException('Invalid filter parameter');
  }

  // extract the parameters and validate if the rule and the property are valid
  const [field, rule, value] = filter.split(':');
  if (!data.includes(field)) throw new BadRequestException(`Invalid filter property: ${field}`);
  if (!Object.values(FilterRule).includes(rule as FilterRule))
    throw new BadRequestException(`Invalid filter rule: ${rule}`);

  return { field, rule, value };
});
