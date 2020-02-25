import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRequired]'
})
export class RequiredDirective implements OnInit {
  @Input() appRequired: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appRequired === 'required') {
      this.el.nativeElement.innerHTML =
        '<span class="text-danger pl-1">*</span>';
    }
  }
}
