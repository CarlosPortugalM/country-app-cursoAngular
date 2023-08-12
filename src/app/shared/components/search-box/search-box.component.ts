import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shearch-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @Output()
  public onNewValue: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtInput')
  private txtInput!: ElementRef<HTMLInputElement>;

  constructor(){}

  public emitValue(): void {
    this.onNewValue.emit(this.txtInput.nativeElement.value);
    this.txtInput.nativeElement.value = '';

  }


}
