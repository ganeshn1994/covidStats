import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loading = new BehaviorSubject(false);

  constructor() {}

  startLoader() {
    this.loading.next(true);
  }

  stopLoader() {
    this.loading.next(false);
  }
}
