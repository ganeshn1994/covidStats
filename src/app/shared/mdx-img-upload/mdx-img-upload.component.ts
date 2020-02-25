import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';
import { UploadService, ToasterService, LoaderService } from 'src/app/services';
import { AbstractValueAccessor } from '../../models/abstract-value-accessor';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  FileUploadControl,
  FileUploadValidators
} from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-mdx-img-upload',
  templateUrl: './mdx-img-upload.component.html',
  styleUrls: ['./mdx-img-upload.component.scss']
})
export class MdxImgUploadComponent extends AbstractValueAccessor {
  @Input() imageHeight: any;
  @Input() imageWidth: any;
  @Input() control: FormControl;
  @Input() title: string;
  @Input() disabled: any;
  @Input() required: string;
  @Input() isFormSubmit: boolean;
  @Output() webImgUrl = new EventEmitter();
  @Output() mobileImgUrl = new EventEmitter();
  @Input() typeOfImage: string;
  @Output() sendUrl = new EventEmitter();

  public fileUploadControl = new FileUploadControl().setListVisibility(false);

  constructor(
    private uploadService: UploadService,
    private loaderService: LoaderService,
    private toasterService: ToasterService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.disabled && changes.disabled.currentValue) {
      this.fileUploadControl.disable();
    } else {
      this.fileUploadControl.enable();
    }
  }

  ngOnInit() {
    this.fileUploadControl.valueChanges.subscribe(event => {
      if (event.length > 0) {
        let height = this.imageHeight;
        let width = this.imageWidth;
        let that = this;
        const reader = new FileReader();
        reader.readAsDataURL(event[event.length - 1]);

        let img = new Image();

        img.src = window.URL.createObjectURL(event[event.length - 1]);

        img.onload = function() {
          window.URL.revokeObjectURL(img.src);
          if (
            img.naturalWidth === parseFloat(width) &&
            img.naturalHeight === parseFloat(height)
          ) {
            that.upload([event[event.length - 1]]);
          } else if (!width && !height) {
            that.upload([event[event.length - 1]]);
          } else {
            that.toasterService.showWarning(
              'Upload proper resolution' + (width + 'X' + height)
            );
          }
        };
      }
    });
  }

  upload(event: any) {
    const files: FileList = event;
    const file: File = files[0];
    const uploadParam = new FormData();

    uploadParam.append('upload_preset', 'tg8oki7z');
    uploadParam.append('tags', name);
    uploadParam.append('file', file);
    this.loaderService.startLoader();
    this.uploadService.upload(uploadParam).subscribe((data: any) => {
      if (data && data.secure_url) {
        this.writeValue(data.secure_url);
        this.sendUrl.emit(data.secure_url);
        this.fileUploadControl.clear();
        this.loaderService.stopLoader();
      }
    });
  }
}
