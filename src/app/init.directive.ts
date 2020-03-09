import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[ngInit]'
})
export class InitDirective {

  @Output('ngInit') initEvent: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.initEvent.emit();
  }

  constructor() { }

}
