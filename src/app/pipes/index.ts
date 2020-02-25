import { NgModule } from '@angular/core';
import { EllipsisPipePipe } from './ellipsis-pipe.pipe';
import { TableHeadPipe } from './table-head.pipe';
import { FormatCellPipe } from './format-cell.pipe';
import { FilterPipe } from './filter.pipe';
import { DateFilterPipe } from './dateFilter';
import { NumberToWordsPipe } from './number-to-words.pipe';

export const PIPES = [
  EllipsisPipePipe,
  TableHeadPipe,
  FormatCellPipe,
  FilterPipe,
  DateFilterPipe,
  NumberToWordsPipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule {}
