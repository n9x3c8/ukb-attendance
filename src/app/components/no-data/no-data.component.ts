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

  @Output('eventNoData') eventNoData = new EventEmitter<{state, complete}>();

  constructor() { }
  
  ngOnInit() {}

  public onHandleEventNoData(ev): void {
    const complete = () => ev.target.complete();
    complete();
    this.eventNoData.emit({state: true, complete});
  }
}
