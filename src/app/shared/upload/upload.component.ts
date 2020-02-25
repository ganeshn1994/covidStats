import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { UploadService } from 'src/app/services';
import { AbstractValueAccessor } from '../../models/abstract-value-accessor';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadComponent extends AbstractValueAccessor {
  @Input() imageHeight: number;
  @Input() imageWeight: number;
  @Input() control: FormControl;
  @Input() title: string;
  @Input() required: string;
  @Input() isFormSubmit: boolean;
  @Output() webImgUrl = new EventEmitter();
  @Output() mobileImgUrl = new EventEmitter();
  @Input() typeOfImage: string;

  constructor(private uploadService: UploadService) {
    super();
  }

  ngOnInit() {}

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.upload(event.target.files);
    }
  }

  upload(event: any) {
    const files: FileList = event;
    const file: File = files[0];
    const uploadParam = new FormData();

    uploadParam.append('upload_preset', 'tg8oki7z');
    uploadParam.append('tags', name);
    uploadParam.append('file', file);

    this.uploadService.upload(uploadParam).subscribe((data: any) => {
      if (data && data.secure_url) {
        if (this.typeOfImage === 'mobile') {
          this.mobileImgUrl.emit(data.secure_url);
        } else if (this.typeOfImage === 'web') {
          this.webImgUrl.emit(data.secure_url);
        }
      }
    });
  }
}
