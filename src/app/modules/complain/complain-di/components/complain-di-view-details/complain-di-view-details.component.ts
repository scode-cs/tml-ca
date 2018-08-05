/* tslint:disable: member-ordering forin */
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ComplaintDIConfigModel } from '../../models/complain-di-config.model';
import { ComplaintDIRegisterDataService } from "../../services/complaint-di-register-data.service";
import { SessionErrorService } from '../../../../shared/services/session-error.service';


@Component({
  selector: 'ispl-complain-di-view-details-form',
  templateUrl: 'complain-di-view-details.component.html',
  styleUrls: ['complain-di-view-details.component.css']
})
export class ComplainDIViewDetailsComponent implements OnInit {


  public title: string = "Complaint Register";
  //variable used for siteVisit radio button
  public siteVisitValue: string = "";
  //create a formgroup for complain reg
  complaintRegisterFormGroup: FormGroup;
  public complaintReferenceNo: string = '';//to store route param
  public complaintStatus: number;//to store route param 
  public invReportTable: any[] = [];//to store prev complain report
  public complainDetails: any[] = [];//to store complain reference detailS

  public complainIndex: number = 0;
  public busySpinner: boolean = true;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private datePipe: DatePipe,//for date
    private formBuilder: FormBuilder,
    private complaintDIRegisterDataService: ComplaintDIRegisterDataService,
    private sessionErrorService: SessionErrorService
  ) {
    // this.buildForm();//to build form
  }

  ngOnInit(): void {
    this.busySpinner = true;
    this.initform();
    this.getRouteParam();//to get route param 
    this.invReportTable = new ComplaintDIConfigModel().prevInvReportHeader;//getting prev inv report details
    this.getviewComplainReferenceDetailsWSCall();//service call
  }
  //end of on init

  //method to get route param
  private getRouteParam() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
      this.complaintStatus = params.complaintStatus ? params.complaintStatus : '';
    });
    // console.log("complaintReferenceNo for view Complaint di: ", this.complaintReferenceNo);
  }//end of method
  //method to get complain reference details by service 
  /**
   * @description initform data
   */
  initform() {
    this.complaintRegisterFormGroup = new FormGroup({
      modeId: new FormControl(''),
      officialDocNo: new FormControl(''),
      complaintReferenceDt: new FormControl(''),
      custCode: new FormControl(''),
      custName: new FormControl(''),
      salesGroup: new FormControl(''),
      salesOffice: new FormControl(''),
      contactPersonName: new FormControl(''),
      contactPersonPhoneNo: new FormControl(''),
      contactPersonEmailId: new FormControl(''),
      loggedBy: new FormControl(''),
      loggedOnDt: new FormControl(''),
      complaintTypeId: new FormControl(''),
      natureOfComplaintId: new FormControl(''),
      complaintDetails: new FormControl(''),
      siteVisit: new FormControl({value:'N',disabled:true}),
      siteVisitByDepartmentName: new FormControl('')
    });

  }
  private getviewComplainReferenceDetailsWSCall() {
    let pageCompStatus: number = 10;
    this.complaintDIRegisterDataService.getComplaintReferenceViewDetails(this.complaintReferenceNo, pageCompStatus).
      subscribe(res => {
        console.log("res of ref det::::", res);
        if (res.msgType === 'Info') {
          let json: any = JSON.parse(res.mapDetails);
          console.log("json::::", json);
          this.complainDetails = json;
          this.complainIndex = this.complainDetails ? this.complainDetails.length - 1 : 0;
          this.setResValToForm();
          this.busySpinner = false;
        } else {
          this.busySpinner = false;
        }
      },
        err => {
          console.log(err);
          this.busySpinner = false;
          this.sessionErrorService.routeToLogin(err._body);
        });
  }//end of method

  //method to set res value to form
  private setResValToForm() {
    let complainFormData: any = this.complainDetails[this.complainIndex];
    this.complaintRegisterFormGroup.controls['modeId'].setValue(complainFormData.modeId);
    this.complaintRegisterFormGroup.controls['complaintReferenceDt'].setValue(this.datePipe.transform(complainFormData.complaintReferenceDt, 'dd-MMM-yyyy'));
    this.complaintRegisterFormGroup.controls['custCode'].setValue(complainFormData.custCode);
    this.complaintRegisterFormGroup.controls['custName'].setValue(complainFormData.customerName);
    this.complaintRegisterFormGroup.controls['salesGroup'].setValue(complainFormData.salesGroup);
    this.complaintRegisterFormGroup.controls['salesOffice'].setValue(complainFormData.salesOffice);
    this.complaintRegisterFormGroup.controls['contactPersonName'].setValue(complainFormData.contactPersonName);
    this.complaintRegisterFormGroup.controls['contactPersonPhoneNo'].setValue(complainFormData.contactPersonPhoneNo);
    this.complaintRegisterFormGroup.controls['contactPersonEmailId'].setValue(complainFormData.contactPersonEmailId);
    this.complaintRegisterFormGroup.controls['loggedBy'].setValue(complainFormData.loggedByName);
    this.complaintRegisterFormGroup.controls['loggedOnDt'].setValue(this.datePipe.transform(complainFormData.loggedOnDt, 'dd-MMM-yyyy'));
    this.complaintRegisterFormGroup.controls['complaintTypeId'].setValue(complainFormData.complaintTypeDesc);
    this.complaintRegisterFormGroup.controls['natureOfComplaintId'].setValue(complainFormData.natureOfComplaintDesc);
    this.complaintRegisterFormGroup.controls['complaintDetails'].setValue(complainFormData.complaintDetails);
    this.siteVisitValue = complainFormData.siteVisit;
    this.complaintRegisterFormGroup.controls['siteVisit'].setValue(complainFormData.siteVisit);
    this.complaintRegisterFormGroup.controls['siteVisitByDepartmentName'].setValue(complainFormData.siteVisitByDepartmentName);
    //console.log('got the value',this.complaintRegisterFormGroup.value.siteVisit);
  }//end of method 

  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method

  public selectData(cmpIndex: number) {
    this.busySpinner = true;
    this.complainIndex = cmpIndex;
    this.setResValToForm();
    setTimeout(() => {
      this.busySpinner = false;
    }, 500);

  }

}//end of class
