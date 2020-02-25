import { Directive, OnInit, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appStyleCell]'
})
export class StyleCellDirective implements OnInit {
  @Input() appStyleCell: string;
  constructor(private el: ElementRef, private renderer: Renderer) {}
  ngOnInit() {
    if (!this.appStyleCell || this.appStyleCell === undefined) {
      this.renderer.setElementStyle(this.el.nativeElement, 'color', '#000000');
      this.renderer.setElementStyle(
        this.el.nativeElement,
        'text-align',
        'center'
      );
    }
    if (typeof this.appStyleCell === 'number') {
      this.renderer.setElementStyle(
        this.el.nativeElement,
        'text-align',
        'right'
      );
    }
  }
}
