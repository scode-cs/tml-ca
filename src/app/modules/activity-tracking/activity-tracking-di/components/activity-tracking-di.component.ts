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
        { 
            complainRefNo: 'DI000001', 
            commercialSett: false, 
            currentStatus: 10 ,
            currentStatusDate: '24-Sep-2018',
            statusDisplay:  [
                { status: 10, completionDate: '23-Sep-2018', difference: '1 day' },
                { status: 40, completionDate: 'NA', difference: 'pending 4 hrs' },
                { status: 50, completionDate: 'NA', difference: 'pending 4 hrs' },
                { status: 60, completionDate: 'NA', difference: 'pending 4 hrs' },
                { status: 70, completionDate: 'NA', difference: 'pending 4 hrs' },
                { status: 80, completionDate: 'NA', difference: 'pending 4 hrs'},
            ]
        },
        { 
            complainRefNo: 'DI000002', 
            commercialSett: false, 
            currentStatus: 40 ,
            currentStatusDate: '24-Sep-2018',
            statusDisplay:  [
                { status: 10, completionDate: '18-Sep-2018', difference: '6 days' },
                { status: 40, completionDate: '24-Sep-2018', difference: '15 hrs' },
                { status: 50, completionDate: 'NA', difference: 'pending 4 hrs' },
                { status: 60, completionDate: 'NA', difference: 'pending 4 hrs' },
                { status: 70, completionDate: 'NA', difference: 'pending 4 hrs' },
                { status: 80, completionDate: 'NA', difference: 'pending 4 hrs'},
            ]
        },
        { 
            complainRefNo: 'DI000003', 
            commercialSett: false, 
            currentStatus: 50 ,
            currentStatusDate: '24-Sep-2018',
            statusDisplay:  [
                { status: 10, completionDate: '17-Sep-2018', difference: '4 days' },
                { status: 40, completionDate: '20-Sep-2018', difference: '5 days' },
                { status: 50, completionDate: '24-Sep-2018', difference: '4 hrs' },
                { status: 60, completionDate: 'NA', difference: 'pending 4 hrs' },
                { status: 70, completionDate: 'NA', difference: 'pending 4 hrs' },
                { status: 80, completionDate: 'NA', difference: 'pending 4 hrs'},
            ]
        },
        { 
            complainRefNo: 'DI000004', 
            commercialSett: false, 
            currentStatus: 50 ,
            currentStatusDate: '23-Sep-2018',
            statusDisplay:  [
                { status: 10, completionDate: '17-Sep-2018', difference: '3 days' },
                { status: 40, completionDate: '20-Sep-2018', difference: '3 days' },
                { status: 50, completionDate: '23-Sep-2018', difference: '4 hrs' },
                { status: 60, completionDate: 'NA', difference: 'pending 4 hrs' },
                { status: 70, completionDate: 'NA', difference: 'pending 4 hrs' },
                { status: 80, completionDate: 'NA', difference: 'pending 4 hrs'},
            ]
         },
        { 
            complainRefNo: 'DI000005', 
            commercialSett: false, 
            currentStatus: 60 ,
            currentStatusDate: '23-Sep-2018',
            statusDisplay:  [
                { status: 10, completionDate: '17-Sep-2018', difference: '3 days' },
                { status: 40, completionDate: '20-Sep-2018', difference: '3 days' },
                { status: 50, completionDate: '23-Sep-2018', difference: '4 hrs' },
                { status: 60, completionDate: '23-Sep-2018', difference: '4 hrs' },
                { status: 70, completionDate: 'NA', difference: 'pending 4 hrs' },
                { status: 80, completionDate: 'NA', difference: 'pending 4 hrs'},
            ]
        },
        { 
            complainRefNo: 'DI000006', 
            commercialSett: false, 
            currentStatus: 70 ,
            currentStatusDate: '24-Sep-2018',
            statusDisplay:  [
                { status: 10, completionDate: '17-Sep-2018', difference: '4 days' },
                { status: 40, completionDate: '21-Sep-2018', difference: '2 days' },
                { status: 50, completionDate: '23-Sep-2018', difference: '1 day' },
                { status: 60, completionDate: '24-Sep-2018', difference: '10 hrs' },
                { status: 70, completionDate: '24-Sep-2018', difference: '11 hrs' },
                { status: 80, completionDate: 'NA', difference: 'pending 4 hrs'},
            ]
        },
        { 
            complainRefNo: 'DI000007', 
            commercialSett: true, 
            currentStatus: 80 ,
            currentStatusDate: '24-Sep-2018',
            statusDisplay:  [
                { status: 10, completionDate: '17-Sep-2018', difference: '4 days' },
                { status: 40, completionDate: '21-Sep-2018', difference: '2 days' },
                { status: 50, completionDate: '23-Sep-2018', difference: '1 day' },
                { status: 60, completionDate: '24-Sep-2018', difference: '11 hrs' },
                { status: 70, completionDate: '24-Sep-2018', difference: '12 hrs' },
                { status: 80, completionDate: '24-Sep-2018', difference: '18 hrs'},
            ]
        }
    ];

   
    //modal
    comSetFlag: boolean = false;
    private compRefNoOfCommSet: string = '';
    private toggleModalBtn(){
        this.comSetFlag = this.comSetFlag ? false : true;
    }
    onCommSetSwitchBtnClick(compRefNo: string){
        this.compRefNoOfCommSet = compRefNo;
        this.toggleModalBtn();
    }
    cancelModal(){
        this.toggleModalBtn();
    }
    onCommSetModalSubmitClick(btnVal){
            this.testjson.forEach((el,index)=>{
                if(el.complainRefNo == this.compRefNoOfCommSet){
                    if(btnVal === 'Y'){
                        el.commercialSett = true;
                    }else if(btnVal === 'N'){
                        el.commercialSett = false;
                        this.activityTrackingFormGroup.controls['commercialCheck'].setValue(false);
                    }
                }
            });
        this.toggleModalBtn();
    }  

}