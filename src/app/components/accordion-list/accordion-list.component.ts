import { Component, Input } from "@angular/core";

@Component({
    selector: 'at-accordion-list',
    templateUrl: 'accordion-list.component.html',
    styleUrls: ['accordion-list.component.scss']
})
export class AccordionListComponent {
    public appTitle: string = 'UKB Attendance';
    @Input('title') title: string;
    constructor() {}
}