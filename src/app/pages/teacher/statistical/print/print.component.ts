import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'attendance-print',
    templateUrl: 'print.component.html'
})
export class PrintComponent implements OnInit {
    @Input('students') students: any[];
    @Input('classId') classId: string;
    constructor() {}

    ngOnInit() {
      console.log(this.students);
      
    }

}
