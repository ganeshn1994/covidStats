import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  @Input() isFilter: any;
  @Output() clearFilter = new EventEmitter();
  @Output() openFilter = new EventEmitter();

  ngOnInit() {}

  openModal() {
    this.openFilter.emit('openfilterModal');
  }

  clearData() {
    this.clearFilter.emit();
  }
}
