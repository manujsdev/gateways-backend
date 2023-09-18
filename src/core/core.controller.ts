import { Controller } from '@nestjs/common';
import { CoreService } from './core.service';

@Controller()
export abstract class CoreController<T> {
  constructor(
    private readonly coreService: CoreService<T>,
    private readonly filterProps: string[],
    private readonly sortProps: string[]
  ) {}

  // @Get()
  // @ApiQuery({
  //   name: 'page',
  //   required: true,
  //   description: 'Page number for pagination',
  // })
  // @ApiQuery({
  //   name: 'pageSize',
  //   required: true,
  //   description: 'Number of items per page for pagination',
  // })
  // @ApiQuery({
  //   name: 'sort',
  //   required: false,
  //   description: 'Sort criteria for ordering results',
  //   example: 'vendor:asc',
  // })
  // @ApiQuery({
  //   name: 'filter',
  //   required: false,
  //   description: 'Filter criteria for filtering results',
  //   example: 'vendor:like:vendor1',
  // })
  // findAll(
  //   @PaginationParams() paginationParams: Pagination,
  //   @SortingParams(this.sortProps) sort?: Sorting,
  //   @FilteringParams(this.filterProps) filter?: Filtering,
  // ) {
  //   return this.coreService.findAll(paginationParams, sort, filter);
  // }

  // @Post()
  // create(@Body() createCoreDto: CreateCoreDto) {
  //   return this.coreService.create(createCoreDto);
  // }

  // @Get()
  // findAll() {
  //   return this.coreService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.coreService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCoreDto: UpdateCoreDto) {
  //   return this.coreService.update(+id, updateCoreDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.coreService.remove(+id);
  // }
}
