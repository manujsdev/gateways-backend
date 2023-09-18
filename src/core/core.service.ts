import { Pagination } from './decorators/pagination.decorator';
import { Sorting } from './decorators/sorting.decorator';
import { Filtering } from './decorators/filtering.decorator';
import { PaginatedResource } from './dto/paginatedItems.dto';
import { getOrder, getWhere } from './helpers/filter-query';
import { Model } from 'mongoose';

export abstract class CoreService<T> {
  protected constructor(private readonly model: Model<T>) {}

  async findAll(
    { page, pageSize, offset }: Pagination,
    sort?: Sorting,
    filter?: Filtering
  ): Promise<PaginatedResource<Partial<T>>> {
    const where = getWhere(filter);
    const order = getOrder(sort);
    const total = await this.countTotal();

    const items = await this.model
      .find(where)
      //.select('vendor')
      .limit(pageSize)
      .skip(offset)
      .sort(order)
      .exec();

    return {
      total,
      page,
      pageSize,
      data: items
    };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} core`;
  // }

  // create(createCoreDto: CreateCoreDto) {
  //   return 'This action adds a new core';
  // }

  // update(id: number, updateCoreDto: UpdateCoreDto) {
  //   return `This action updates a #${id} core`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} core`;
  // }

  async countTotal() {
    return await this.model.estimatedDocumentCount().exec();
  }
}
