import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActiivityTrackingModel } from '../models/activity-tracking-di.model';
import { ActivityTrackingDIService } from '../services/activity-tracking-di.services';
import { ActivityTrackingDIParamModel } from '../models/activity-tracking-di-param.model';

@Component({
    selector: 'ispl-activity-tracking-di',
    templateUrl: './activity-tracking-di.component.html',
    styleUrls: ['./activity-tracking-di.component.css']
})

export class ActivityTrackingDIComponent implements OnInit {
    private headerParam: ActivityTrackingDIParamModel;//model

    public activityTrackingFormGroup: FormGroup;
    public gridConfigModel: any = {};//to store the grid model 
    public compDIStatusRes: any[] = [];//to store comp status 
    public busySpinner: boolean = false;//spinner

    constructor(
        private activityTrackingDIService: ActivityTrackingDIService
    ) {
        let formGroup: any = {};
        formGroup['commercialCheck'] = new FormControl();
        this.activityTrackingFormGroup = new FormGroup(formGroup);
    }

    ngOnInit(): void {
        console.log("onInit of ActivityTrackingDIComponent..");
        this.gridConfigModel = new  ActiivityTrackingModel().activityTrackingGridConfig;
        this.getCompStatusWSCall();
    }//end of on init


    //method to get comp-status details by ws call
    private getCompStatusWSCall(){
        this.busySpinner = true;
        this.activityTrackingDIService.getComStatusDet().
        subscribe(res =>{
            console.log(res);
            this.compDIStatusRes = res;
            this.busySpinner = false;
        },
        err => {
            console.log(err);
            this.busySpinner = false;
        });
        
    }//end of method
   
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
        this.activityTrackingFormGroup.controls['commercialCheck'].reset();//to reset the control value
        this.toggleModalBtn();
    }
    onCommSetModalSubmitClick(btnVal){
            this.compDIStatusRes.forEach((el,index)=>{
                if(el.complainRefNo == this.compRefNoOfCommSet){
                    if(btnVal === 'Y'){
                        this.busySpinner = true;
                        // this.updateComSetWSCall();
                        let updateComSetBody: any = {};
                        updateComSetBody.complainRefNo = this.compRefNoOfCommSet;
                        updateComSetBody.commercialSett = true;
                        this.activityTrackingDIService.updateComSetFromCompStatusGrid(updateComSetBody).
                        subscribe(res=>{
                            el.commercialSett = true;
                            this.busySpinner = false;
                        },err=>{
                            el.commercialSett = false;
                            console.log(err);
                            this.busySpinner = false;
                        })
                    }else if(btnVal === 'N'){
                        el.commercialSett = false;
                        this.activityTrackingFormGroup.controls['commercialCheck'].setValue(false);
                    }
                }
            });
        this.toggleModalBtn();
    }  

}