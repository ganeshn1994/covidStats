import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  SimpleChanges
} from '@angular/core';
import { ColumnMap } from 'src/app/models/column-map';
import { ColumnSetting } from 'src/app/models/column-setting';

@Component({
  selector: 'app-mdx-table',
  templateUrl: './mdx-table.component.html',
  styleUrls: ['./mdx-table.component.scss']
})
export class MdxTableComponent implements OnInit {
  @Output() editData = new EventEmitter();
  @Output() deleteData = new EventEmitter();
  @Output() getSelectedIndex = new EventEmitter();
  @Output() viewData = new EventEmitter();
  @Output() checkedData = new EventEmitter();
  @Output() specialEvent = new EventEmitter();
  @Output() exportEvent = new EventEmitter();

  @Input() records: any[] = [];
  @Input() actions: any[];
  @Input() dataSettings: ColumnSetting[];
  @Input() tableSettings: any;
  @Input() count: any;
  @Input() export: any;
  @Input() isDisableCheckAll: any;
  @Input() checkboxEnable: boolean;
  @Input() resetCheckedData: any;
  columnMaps: ColumnMap[];
  checkAll: boolean;

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges) {
    if (this.dataSettings) {
      this.columnMaps = this.dataSettings.map(col => new ColumnMap(col));
    } else {
      this.columnMaps = Object.keys(this.records[0]).map(key => {
        return new ColumnMap({ primaryKey: key });
      });
    }

    if (changes.resetCheckedData && changes.resetCheckedData.currentValue) {
      this.records.forEach(element => {
        element.isSelected = false;
      });
      this.checkAll = false;
    }
  }

  constructor() {}

  ngOnInit() {
    if (this.checkboxEnable) {
      this.records.forEach(element => {
        element.isSelected = false;
      });
      this.checkAll = false;
    }
  }

  editEmitter(index: number, data: any) {
    this.getSelectedIndex.emit(index);
    this.editData.emit(data);
  }

  deleteEmitter(index: number, data: any) {
    this.getSelectedIndex.emit(index);
    this.deleteData.emit(data);
  }

  viewEmitter(index: number, data: any) {
    this.getSelectedIndex.emit(index);
    this.viewData.emit(data);
  }

  checkEmitter(data: any) {
    this.checkedData.emit(data);
  }

  specialEmitter(data: any) {
    this.specialEvent.emit(data);
  }

  isDisplayButton(record: any, action: any) {
    if (!action.status) {
      if (action.type === 'button') {
        return true;
      }
    } else {
      if (
        action.type === 'button' &&
        action.status &&
        record[action.status.key] === action.status.value
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  isDisplayText(record: any, action: any) {
    if (!action.status) {
      if (action.type === 'text') {
        return true;
      }
    } else {
      if (action.type === 'text') {
        if (
          action.type === 'text' &&
          action.status &&
          record[action.status.key] === action.status.value
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }

  selectAll(records: any, isSelected: boolean) {
    if (records && isSelected) {
      records.forEach(element => {
        element.isSelected = true;
      });
      this.checkedData.emit(records);
    } else {
      records.forEach(element => {
        element.isSelected = false;
      });
      this.checkedData.emit([]);
    }
  }

  selectRecord() {
    const selectedData: any[] = [];
    this.records.forEach(element => {
      if (element.isSelected) {
        selectedData.push(element);
      }
    });
    if (selectedData.length <= 0) {
      this.checkAll = false;
    }
    this.checkedData.emit(selectedData);
  }

  isDisabled(data: any) {
    if (data) {
      if (data.disabled) {
        return true;
      } else {
        return false;
      }
    }
  }

  exportFunc() {
    this.exportEvent.emit('export');
  }
}
