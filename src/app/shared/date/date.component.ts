import {
  Component,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';
import {
  AbstractValueAccessor,
  MakeProvider
} from 'src/app/models/abstract-value-accessor';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [MakeProvider(DateComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateComponent extends AbstractValueAccessor {
  @Input() control: FormControl;
  @Input() title: string;
  @Input() required: string;
  @Input() isFormSubmit: boolean;
  @Input() inputValue: any;
  @Input() min: any;
  @Input() max: any;
  @Input() isTimeDisplay: boolean;

  constructor(private fb: FormBuilder) {
    super();
    this.min = new Date(this.min);
    this.max = new Date(this.max);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges) {
    if (changes.inputValue && changes.inputValue.currentValue) {
      this.inputValue = new Date(this.inputValue);
      this.changedDate(this.inputValue);
    }
  }

  changedDate(event: any) {
    this.writeValue(new Date(event).toISOString());
  }
}
