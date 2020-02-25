import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHeading]'
})
export class HeadingDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#0f4080';
    el.nativeElement.style.fontSize = '18px';
    el.nativeElement.style.fontWeight = '900';
    el.nativeElement.style.textAlign = 'center';
    el.nativeElement.style.width = '100%';
    el.nativeElement.style.margin = '10px 0';
  }
}
