import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { AbstractValueAccessor } from 'src/app/models/abstract-value-accessor';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {} from 'events';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends AbstractValueAccessor {
  @Input() options: any;
  @Input() control: FormControl;
  @Input() title: string;
  @Input() required: string;
  @Input() isFormSubmit: boolean;
  @Input() inputValue: string;
  @Input() disabled: string;
  @Output() selectedOption = new EventEmitter();

  constructor() {
    super();
  }

  onSelect(item: any) {
    this.writeValue(item);
    this.selectedOption.emit(item);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.inputValue && changes.inputValue.currentValue) {
      this.inputValue = this.inputValue;
    }
  }
}
