import { Component } from '@angular/core';


@Component({
    selector:'ispl-activity-tracking-di',
    templateUrl: './activity-tracking-di.component.html',
    styleUrls: ['./activity-tracking-di.component.css']
})

export class ActivityTrackingDIComponent {
    public testjson: any[] = [
        {compNo:'DI000001',comSetStatus:'On',checked:true,compstatus:10},
        {compNo:'DI000002',comSetStatus:'Off',checked:false,compstatus:40},
        {compNo:'DI000003',comSetStatus:'On',checked:true,compstatus:50},
        {compNo:'DI000004',comSetStatus:'On',checked:true,compstatus:60},
        {compNo:'DI000005',comSetStatus:'Off',checked:false,compstatus:70},
        {compNo:'DI000006',comSetStatus:'On',checked:true,compstatus:80},
        {compNo:'DI000007',comSetStatus:'On',checked:true,compstatus:50},
        {compNo:'DI000008',comSetStatus:'On',checked:true,compstatus:10}
    ];
}