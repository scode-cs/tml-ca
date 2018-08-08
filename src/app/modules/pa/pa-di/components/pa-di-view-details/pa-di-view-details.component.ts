import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { DatePipe } from '@angular/common';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { SessionErrorService } from "../../../../shared/services/session-error.service";
import { PADIConfigModel } from '../../models/pa-di-config.model';
import { ComplaintDIService } from '../../../../shared/services/complaint-di.service';

@Component({
  selector: 'ispl-pa-di-view-details',
  templateUrl: 'pa-di-view-details.component.html',
  styleUrls: ['pa-di-view-details.component.css']

})
export class PADIViewDetailsComponent implements OnInit {

  // public fileList: FileList;
  public title: string = "PA";//to show titlee on html page
  public paDIAddEditFormGroup: FormGroup;
  public routeParam: any ={
    complaintReferenceNo:'',//to get complaint reference no from route param
    complaintStatus:  ''//to fetch complaint status from route
  }; 
  public paReportTable: any[] = [];//to store prev rca report
  public paDetails: any[] = [];//to store complain reference detailS
  public paIndex: number = 0;
  //for busy spinner
  public busySpinner: boolean = false;
  //for error msg
  public errorMsgObj: any = {
    errorMsg: '',
    errMsgShowFlag: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private datePipe: DatePipe,//for date
    // private localStorageService: LocalStorageService,
    private sessionErrorService: SessionErrorService,
    private complaintDIService: ComplaintDIService
  ) {
  }//end of constructor

  ngOnInit(): void {
    console.log("onInit of PADIViewDetailsComponent..");
    this.initform();
    this.getRouteParam();//to get route param 
    this.paReportTable = new PADIConfigModel().paReportHeader;//getting prev inv report details
    this.getviewComplainReferenceDetailsWSCall();//service call
  }//end of on init

   //method to get route param
  private getRouteParam() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.routeParam.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : 'DI000009';
      this.routeParam.complaintStatus = params.complaintStatus ? params.complaintStatus : ''; 
    });
    console.log("complaintReferenceNo for pa di view: ", this.routeParam.complaintReferenceNo);
    console.log("this.complaintStatus for pa di view::",this.routeParam.complaintStatus);
    this.paDIAddEditFormGroup.controls['complaintReferenceNo'].setValue(this.routeParam.complaintReferenceNo);

  }//end of method

  /**
   * @description initform data
   */
  initform() {
    this.paDIAddEditFormGroup = new FormGroup({
      complaintReferenceNo: new FormControl(''),
      paAddEditDate: new FormControl(''),
      paAddEditDetails: new FormControl(''),
    });
  }//end of init form
//method to get complain det by comp ref no
private getviewComplainReferenceDetailsWSCall() {
  let pageCompStatus: number = 70;
  this.complaintDIService.getComplainViewDetails(this.routeParam.complaintReferenceNo, pageCompStatus).
    subscribe(res => {
      console.log("res of ref det::::", res);
      if (res.msgType === 'Info') {
        let json: any = JSON.parse(res.mapDetails);
        console.log("json::::", json);
        this.paDetails = json;
        this.paIndex = this.paDetails ? this.paDetails.length - 1 : 0;
        this.setResValToForm();
        this.busySpinner = false;
      } else {
        this.errorMsgObj.errMsgShowFlag = true;
        this.errorMsgObj.errorMsg = res.msg;
        this.busySpinner = false;
      }
    },
      err => {
        console.log(err);
        this.errorMsgObj.errMsgShowFlag = true;
        this.errorMsgObj.errorMsg = err.msg;
        this.busySpinner = false;
        this.sessionErrorService.routeToLogin(err._body);
      });
}//end of method

//method to set res value to form
private setResValToForm() {
  let paFormData: any = this.paDetails[this.paIndex];
  this.paDIAddEditFormGroup.controls['complaintReferenceNo'].setValue(paFormData.complaintReferenceNo);
  this.paDIAddEditFormGroup.controls['paAddEditDate'].setValue(this.datePipe.transform(paFormData.preventiveActionDate, 'dd-MMM-yyyy'));
  this.paDIAddEditFormGroup.controls['paAddEditDetails'].setValue(paFormData.preventiveAction);
}//end of method 

//for clicking cancel button this method will be invoked
public onCancel(): void {
  this.router.navigate([ROUTE_PATHS.RouteHome]);
}// end of onCancel method

public selectData(cmpIndex: number) {
  this.busySpinner = true;
  this.paIndex = cmpIndex;
  this.setResValToForm();
  setTimeout(() => {
    this.busySpinner = false;
  }, 300);
}

//method to delete error msg
public deleteResErrorMsgOnClick() {
  this.errorMsgObj.errMsgShowFlag = false;
  this.errorMsgObj.errorMsg = "";
}//end of method delete error msg

  

}//end of class