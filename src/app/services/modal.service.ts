import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() {}

  openModal(id: any) {
    document.getElementById(id + 'Btn').click();
  }

  closeModal(id: any) {
    document.getElementById(id + 'closeModal').click();
  }
}
