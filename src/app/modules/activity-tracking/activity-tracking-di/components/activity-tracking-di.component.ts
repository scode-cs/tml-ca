import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActiivityTrackingModel } from '../models/activity-tracking-di.model';

@Component({
    selector: 'ispl-activity-tracking-di',
    templateUrl: './activity-tracking-di.component.html',
    styleUrls: ['./activity-tracking-di.component.css']
})

export class ActivityTrackingDIComponent implements OnInit {
    public activityTrackingFormGroup: FormGroup;
    public gridConfigModel: any = {};

    constructor(
    ) {
        let formGroup: any = {};
        formGroup['commercialCheck'] = new FormControl();
        this.activityTrackingFormGroup = new FormGroup(formGroup);
    }

    ngOnInit(): void {
        console.log("onInit of ActivityTrackingDIComponent..");

        this.gridConfigModel = new  ActiivityTrackingModel().activityTrackingGridConfig;
    }//end of on init

    public testjson: any[] = [
        { compNo: 'DI000001', checked: true, compstatus: 10 },
        { compNo: 'DI000002', checked: false, compstatus: 40 },
        { compNo: 'DI000003', checked: true, compstatus: 50 },
        { compNo: 'DI000004', checked: true, compstatus: 60 },
        { compNo: 'DI000005', checked: false, compstatus: 70 },
        { compNo: 'DI000006', checked: true, compstatus: 80 },
        { compNo: 'DI000007', checked: true, compstatus: 50 },
        { compNo: 'DI000008', checked: true, compstatus: 10 }
    ];

   

   

}