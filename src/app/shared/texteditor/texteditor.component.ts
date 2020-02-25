import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { AbstractValueAccessor } from 'src/app/models/abstract-value-accessor';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-texteditor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TexteditorComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TexteditorComponent extends AbstractValueAccessor {
  htmlContent: any;
  @Input() control: FormControl;
  @Input() title: string;
  @Input() required: string;
  @Input() isFormSubmit: boolean;
  @Input() inputValue: string;
  @Input() type: string;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '100px'
  };

  constructor() {
    super();
  }

  valueChange(val: any) {
    this.writeValue(val);
  }
}
