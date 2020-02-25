import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { ModalService } from 'src/app/services';
import { ModalTypes } from 'src/app/models/incomplete-orders';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {
  @Output() formSubmit = new EventEmitter();
  @Output() clearForm = new EventEmitter();
  @Output() closeModal = new EventEmitter();

  @Input() modalTitle: any;
  @Input() formType: any;
  @Input() size: any;
  @Input() modalId: any;
  id: any;
  constructor(private modalService: ModalService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formType && changes.formType.currentValue) {
      this.formType = changes.formType.currentValue;
    }
  }

  submit() {
    this.formSubmit.emit('submitted');
  }

  clear() {
    this.clearForm.emit('cleared');
  }

  cancel(modalId: any) {
    this.closeModal.emit('closeModal');
    this.modalService.closeModal(modalId);
  }
}
