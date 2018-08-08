import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { DatePipe } from '@angular/common';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { SessionErrorService } from "../../../../shared/services/session-error.service";
import { RCADIConfigModel } from '../../models/rca-di-config.model';
import { ComplaintDIService } from '../../../../shared/services/complaint-di.service';

@Component({
  selector: 'ispl-rca-di-view-details',
  templateUrl: 'rca-di-view-details.component.html',
  styleUrls: ['rca-di-view-details.component.css']

})
export class RCADIViewDetailsComponent implements OnInit {

  // public fileList: FileList;
  public title: string = "RCA";//to show titlee on html page
  public rcaDIAddEditFormGroup: FormGroup;
  public routeParam: any = {
    complaintReferenceNo: '',//to get complaint reference no from route param
    complaintStatus: ''//to fetch complaint status from route
  };
  public rcaReportTable: any[] = [];//to store prev rca report
  public rcaDetails: any[] = [];//to store complain reference detailS
  public rcaIndex: number = 0;
  public busySpinner: boolean = true;
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
    private complaintDIService: ComplaintDIService,
    private localStorageService: LocalStorageService,
    private sessionErrorService: SessionErrorService,
  ) {

  }//end of constructor

  ngOnInit(): void {
    console.log("onInit of RCADIViewDetailsComponent..");
    this.initform();
    this.getRouteParam();//to get route param 
    this.rcaReportTable = new RCADIConfigModel().rcaReportHeader;//getting prev inv report details
    this.getviewComplainReferenceDetailsWSCall();//service call
  }//end of on init

  //method to get route param
  private getRouteParam() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.routeParam.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
      this.routeParam.complaintStatus = params.complaintStatus ? params.complaintStatus : '';
    });
    console.log("complaintReferenceNo for rca di view: ", this.routeParam.complaintReferenceNo);
    console.log("this.complaintStatus for pa di view::", this.routeParam.complaintStatus);
  }//end of method

  /**
   * @description initform data
   */
  initform() {
    this.rcaDIAddEditFormGroup = new FormGroup({
      complaintReferenceNo: new FormControl(''),
      rcaAddEditDate: new FormControl(''),
      rcaAddEditDetails: new FormControl(''),
    });
  }

  private getviewComplainReferenceDetailsWSCall() {
    let pageCompStatus: number = 50;
    this.complaintDIService.getComplainViewDetails(this.routeParam.complaintReferenceNo, pageCompStatus).
      subscribe(res => {
        console.log("res of ref det::::", res);
        if (res.msgType === 'Info') {
          let json: any = JSON.parse(res.mapDetails);
          console.log("json::::", json);
          this.rcaDetails = json;
          this.rcaIndex = this.rcaDetails ? this.rcaDetails.length - 1 : 0;
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
    let rcaFormData: any = this.rcaDetails[this.rcaIndex];
    this.rcaDIAddEditFormGroup.controls['complaintReferenceNo'].setValue(rcaFormData.complaintReferenceNo);
    this.rcaDIAddEditFormGroup.controls['rcaAddEditDate'].setValue(this.datePipe.transform(rcaFormData.rootCauseAnanysisDate, 'dd-MMM-yyyy'));
    this.rcaDIAddEditFormGroup.controls['rcaAddEditDetails'].setValue(rcaFormData.rootCauseAnanysisRemarks);
  }//end of method 

  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method

  public selectData(cmpIndex: number) {
    this.busySpinner = true;
    this.rcaIndex = cmpIndex;
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