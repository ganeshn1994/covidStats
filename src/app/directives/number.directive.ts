import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: '[appInputRestriction]'
})
export class InputRestrictionDirective {
  inputElement: ElementRef;
  @Input() appInputRestriction: string;
  constructor(el: ElementRef) {
    this.inputElement = el;
  }

  // @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
  //   if (this.appInputRestriction === 'integersAndRestrictLength') {
  //     e.preventDefault();
  //   }
  // }

  // @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
  //   if (this.appInputRestriction === 'integersAndRestrictLength') {
  //     e.preventDefault();
  //   }
  // }

  // @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
  //   if (this.appInputRestriction === 'integersAndRestrictLength') {
  //     e.preventDefault();
  //   }
  // }

  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    if (this.appInputRestriction === 'restrictLength') {
      this.restrictLength(event);
    } else if (this.appInputRestriction === 'integersOnly') {
      this.integerOnly(event);
    } else if (this.appInputRestriction === 'noSpecialChars') {
      this.noSpecialChars(event);
    } else if (this.appInputRestriction === 'integersAndRestrictLength') {
      this.integersAndRestrictLength(event);
    }
  }

  integersAndRestrictLength(event: any) {
    const e: any = event as KeyboardEvent;
    if (
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1
    ) {
      e.preventDefault();
    } else if (
      e.currentTarget &&
      e.currentTarget.value &&
      e.currentTarget.value.length > 9
    ) {
      e.preventDefault();
    }
  }

  restrictLength(event: any) {
    const e = event as KeyboardEvent;
    if (e.key && e.key.length > 10) {
      e.preventDefault();
    }
  }

  integerOnly(event: any) {
    const e = event as KeyboardEvent;
    if (
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1
    ) {
      e.preventDefault();
    }
  }

  noSpecialChars(event: any) {
    const e: any = event as KeyboardEvent;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    let k: any;
    k = event.keyCode; // k = event.charCode;  (Both can be used)
    if (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k === 8 ||
      k === 32 ||
      (k >= 48 && k <= 57)
    ) {
      return;
    }
    const ch = String.fromCharCode(e.keyCode);
    e.preventDefault();
  }
}
