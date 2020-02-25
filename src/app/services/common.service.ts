import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoaderService } from './loader.service';
import { ToasterService } from './toaster.service';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
    private toasterService: ToasterService,
    private loaderService: LoaderService
  ) {}

  get(url: string, headers: any) {
    this.loaderService.startLoader();
    const httpOptions = this.baseService.createParam(headers);

    return this.httpClient.get(baseUrl + url, httpOptions).pipe(
      map(response => {
        this.loaderService.stopLoader();
        return response;
      }),
      catchError(err => {
        this.loaderService.stopLoader();
        return throwError(err);
      })
    );
  }

  post(url: string, headers: any, body: any) {
    this.loaderService.startLoader();
    const httpOptions = this.baseService.createHeader(headers);
    const bodyData = this.baseService.createBody(body);

    httpOptions['observe'] = 'response';
    return this.httpClient.post(baseUrl + url, bodyData, httpOptions).pipe(
      map(response => {
        this.loaderService.stopLoader();
        return response;
      }),
      catchError(err => {
        this.loaderService.stopLoader();
        console.log(err);
        const errorMessage = this.baseService.handleError(err);
        this.toasterService.showError(err.error.error.message);
        return throwError(err);
      })
    );
  }

  put(url: string, headers: any, body: any) {
    this.loaderService.startLoader();
    const httpOptions = this.baseService.createHeader(headers);
    httpOptions['observe'] = 'response';
    return this.httpClient.put(baseUrl + url, body, httpOptions).pipe(
      map(response => {
        this.loaderService.stopLoader();
        return response;
      }),
      catchError(err => {
        this.loaderService.stopLoader();
        console.log(err);
        const errorMessage = this.baseService.handleError(err);
        this.toasterService.showError(err.error.error.message);
        return throwError(err);
      })
    );
  }

  delete(url: string, headers: any) {
    this.loaderService.startLoader();
    const httpOptions = this.baseService.createParam(headers);

    return this.httpClient.delete(baseUrl + url, httpOptions).pipe(
      map(response => {
        this.loaderService.stopLoader();
        return response;
      }),
      catchError(err => {
        this.loaderService.stopLoader();
        return throwError(err);
      })
    );
  }
}
