import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';
import { pipe } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-mdx-pagination',
  templateUrl: './mdx-pagination.component.html',
  styleUrls: ['./mdx-pagination.component.scss']
})
export class MdxPaginationComponent implements OnInit, OnChanges {
  @Input() paginationData: any;
  @Output() changePage = new EventEmitter();
  pager: any = {};
  page = {
    pageNumber: 1
  };

  constructor(
    private paginationService: PaginationService,
    private baseService: BaseService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.paginationData.currentValue) {
      this.setPage(changes.paginationData.currentValue);
    }
  }

  setPage(pageData: any) {
    this.pager = this.paginationService.getPager(
      pageData.totalItems,
      pageData.currentPage,
      pageData.itemsPerPage
    );
    if (pageData.currentPage > this.pager.totalPages) {
      this.page.pageNumber = this.pager.totalPages;
    } else if (pageData.currentPage !== 0) {
      this.page.pageNumber = pageData.currentPage;
    } else {
      this.page.pageNumber = 1;
    }
  }

  changePager(pageNo: number) {
    this.paginationData.currentPage = pageNo;
    this.setPage(this.paginationData);
    this.changePage.emit(this.pager);
    this.baseService.gotoTop();
  }
}
