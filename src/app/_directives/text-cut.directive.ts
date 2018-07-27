import { Directive, ElementRef, AfterViewInit, } from '@angular/core';

@Directive({
  selector: '[appTextCut]'
})
export class TextCutDirective implements AfterViewInit {

  constructor(
    private el: ElementRef,
  ) {
  }

  ngAfterViewInit() {

  }
}
