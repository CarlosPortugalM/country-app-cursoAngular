import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shearch-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{


  private debouncer: Subject<string> = new Subject<string>;
  private debouncerSuscription?: Subscription;

  @Input()
  public initialValue?: string = '';

  @Input()
  public placeholder: string = '';

  @Output()
  public onNewValue: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtInput')
  private txtInput!: ElementRef<HTMLInputElement>;

  constructor(){}

  ngOnInit(): void {
    this.debouncerSuscription= this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe( value => {
        this.onNewValue.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  public emitValue(): void {
    this.onNewValue.emit(this.txtInput.nativeElement.value);
    this.txtInput.nativeElement.value = '';

  }



  public onKeyPress(searchTerm: string ): void {
    this.debouncer.next(searchTerm);

  }


}
