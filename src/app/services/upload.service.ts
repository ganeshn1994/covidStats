import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private httpClient: HttpClient) {}

  public upload(data) {
    const uploadURL =
      'https://api.cloudinary.com/v1_1/www-medibox-in/image/upload';
    return this.httpClient
      .post(uploadURL, data, {})
      .pipe(
        map(event => {
          return event;
        })
      );
  }
}
