import { Pipe, PipeTransform } from '@angular/core';
import { element } from 'protractor';

@Pipe({
  name: 'tableHead'
})
export class TableHeadPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const arr = value.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g);
    let result: any = '';

    if (arr && arr.length > 0) {
      arr.forEach((element: any) => {
        result += element.substr(0, 1).toUpperCase() + element.substr(1) + ' ';
      });
    }
    return result;
  }
}
