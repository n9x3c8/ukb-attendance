import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'attendance-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class NoDataComponent implements OnInit {

  @Input('condition') condition: any;
  @Input('content') content: string;
  @Input('icon') icon: string;
  @Input('contentBtn') contentBtn: string;

  @Output('eventNoData') eventNoData = new EventEmitter<boolean>();

  constructor() { }
  
  ngOnInit() {}

  public onHandleEventNoData(): void {
    this.eventNoData.emit(true);
  }
}
