import { Component, Input, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
    selector: 'attendance-nav-bottom',
    templateUrl: 'navigation-bottom.component.html',
    styleUrls: ['navigation-bottom.component.scss']
})
export class NavigationBottomComponent implements OnInit {
    
    @Input('classActiveName') classActiveName: string;

    @Input('tab1') tab1: string[];
    @Input('iconTab1') iconTab1: string;

    @Input('tab2') tab2: string[];
    @Input('iconTab2') iconTab2: string;
    @Input('badgeContent') badgeContent: any;

    @Input('tab3') tab3: string[];
    @Input('iconTab3') iconTab3: string;

    @Input('tab4') tab4: string[];
    @Input('iconTab4') iconTab4: string;

    constructor(private _navCtrl: NavController) {}
    
    ngOnInit() {}
}