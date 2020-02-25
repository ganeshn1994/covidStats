import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, formatDate, DatePipe } from '@angular/common';
import * as moment from 'moment';

@Pipe({
  name: 'formatCell'
})
export class FormatCellPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: any, format: string) {
    if (value === 0) {
      return 0;
    } else if (!value || value === undefined) {
      return ' - ';
    }
    if (format === 'default') {
      if (Array.isArray(value)) {
        if (typeof value[0] !== 'object') {
          return value.join(', ');
        } else {
          return value
            .map(obj => {
              return obj.name;
            })
            .join(', ');
        }
      }
      if (typeof value === 'object') {
        return value.name;
      }
    }

    if (format === 'currency') {
      return this.currencyPipe.transform(value, 'INR', true);
    }

    if (format === 'date') {
      value = new Date(value);
      value.setDate(value.getDate());
      // return new DatePipe('en-US').transform(value, 'dd-MM-yyyy h:mm a');
      return moment(new Date(value))
        .utc(false)
        .format('MMMM Do YYYY, h:mm A');
    }

    if (format === 'shortDate') {
      value = new Date(value);
      value.setDate(value.getDate());
      // return new DatePipe('en-US').transform(value, 'dd-MM-yyyy h:mm a');
      return moment(new Date(value))
        .utc(false)
        .format('MMMM Do YYYY');
    }
    return value;
  }
}
