import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  Output,
  EventEmitter
} from '@angular/core';
import { AbstractValueAccessor } from '../../models/abstract-value-accessor';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends AbstractValueAccessor {
  @Input() control: FormControl;
  @Input() title: string;
  @Input() required: string;
  @Input() isFormSubmit: boolean;
  @Input() inputValue: string;
  @Input() type: string;
  @Input() disabled: string;
  @Output() inputChange = new EventEmitter();

  constructor() {
    super();
  }

  valueChange(val: any) {
    this.writeValue(val);
    this.inputChange.emit(val);
  }
}
