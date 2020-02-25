import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public title = new BehaviorSubject<any>(1);
  public masterEdit = new BehaviorSubject<any>(false);

  constructor() {}

  // Error handling
  public handleError(error: HttpErrorResponse) {
    let errMsg = '';
    // Client Side Error
    if (error.error instanceof ErrorEvent) {
      errMsg = `Error: ${error.error.message}`;
    } else {
      // Server Side Error
      errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    }
    // return an observable
    return throwError(errMsg);
  }

  // Manipulate headers
  public createHeader(header: any) {
    let headersData: HttpHeaders = new HttpHeaders();
    if (header) {
      Object.keys(header).forEach(key => {
        const type = typeof header[key];
        if (type !== 'string' && header[key] != null) {
          headersData = headersData.append(key, JSON.stringify(header[key]));
        } else if (header[key] === null) {
          headersData = headersData.append(key, '');
        } else {
          headersData = headersData.append(key, header[key]);
        }
      });
    }
    const httpOptions = {
      headers: headersData
    };
    return httpOptions;
  }

  createParam(requestParam: any) {
    const obj = {};
    Object.keys(requestParam).forEach(key => {
      const type = typeof requestParam[key];
      if (Array.isArray(requestParam[key])) {
        obj[key] = JSON.stringify(requestParam[key]);
      } else if (type !== 'string' && requestParam[key] != null) {
        obj[key] = JSON.stringify(requestParam[key]);
      } else if (requestParam[key] === null) {
        obj[key] = '';
      } else {
        obj[key] = requestParam[key];
      }
    });
    return {
      params: obj
    };
  }

  createBody(requestParam: any) {
    const obj = {};
    Object.keys(requestParam).forEach(key => {
      const type = typeof requestParam[key];
      if (requestParam[key] != null) {
        obj[key] = requestParam[key];
      } else if (requestParam[key] === null) {
        obj[key] = '';
      }
    });
    return obj;
  }

  setPageTitle(title: any) {
    this.title.next(title);
  }

  getUserId() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    return userData.id;
  }

  getUserMobileNumber() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    return userData.mobileNumber;
  }

  getUserName() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const f = userData.name && userData.name.first ? userData.name.first : '';
    const l = userData.name && userData.name.last ? userData.name.last : '';
    return f + ' ' + l;
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  CSVFileDownload(data: any) {
    if (data) {
      const blob = new Blob([data], { type: 'text/csv' });
      const filename = 'Summary.csv';
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  }

  createDateFormat(date: any) {
    if (date.year && date.month && date.day) {
      return date.year + '-' + date.month + '-' + date.day + 'T23:59:59.000';
    } else {
      return date;
    }
  }

  createStartDate(date: any) {
    if (date) {
      return date.split('T')[0] + 'T00:00:00.000';
    } else {
      return '';
    }
  }

  capitalizeFirstLetter(value: any) {
    if (value) {
      let result = '';
      value = value.toLowerCase();
      const arr = value.split(' ');

      arr.forEach(element => {
        if (element) {
          result = result
            ? result + ' ' + element.charAt(0).toUpperCase() + element.slice(1)
            : element.charAt(0).toUpperCase() + element.slice(1);
        }
      });

      return result;
    } else {
      return '';
    }
  }

  createEndDate(date: any) {
    if (date) {
      return date.split('T')[0] + 'T23:59:59.000';
    } else {
      return '';
    }
  }

  amountFormat(amount: any) {
    if (amount) {
      let x = amount;
      x = x.toString();
      let afterPoint = '';
      if (x.indexOf('.') > 0) {
        afterPoint = x.substring(x.indexOf('.'), x.length);
      }
      x = Math.floor(x);
      x = x.toString();
      let lastThree = x.substring(x.length - 3);
      const otherNumbers = x.substring(0, x.length - 3);
      if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
      }
      return (
        '₹' +
        otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
        lastThree +
        afterPoint
      );
    }
  }

  getExport(req: any) {
    req.userId = this.getUserId();
    const queryParams = [];
    for (const d in req) {
      if (d) {
        queryParams.push(
          encodeURIComponent(d) + '=' + encodeURIComponent(req[d])
        );
      }
    }
    let queryString = '';
    if (queryParams.length) {
      queryString = queryParams.join('&');
    }

    window.open(
      environment.exportBaseUrl + 'exportData/' + btoa(queryString),
      '_blank'
    );
  }

  getSearchDate(dateString) {
    const date = new Date(dateString);
    const dt =
      date.getFullYear() +
      '-' +
      ('00' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getDate()).slice(-2);
    return dt;
  }
}
