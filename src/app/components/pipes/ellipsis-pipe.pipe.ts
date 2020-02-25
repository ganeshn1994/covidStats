import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsisPipe'
})
export class EllipsisPipePipe implements PipeTransform {
  transform(str: string, strLength: number = 250) {
    if (str) {
      const withoutHtml = str.replace(/(<([^>]+)>)/gi, '');
      if (str.length >= strLength) {
        return `${withoutHtml.slice(0, strLength)}...`;
      }
      return withoutHtml;
    }
  }
}
