import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent } from '../../../../widget/modal/components/modal-component';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { ComplaintDIService } from '../../../../shared/services/complaint-di.service';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { SessionErrorService } from "../../../../shared/services/session-error.service";
// import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ispl-close-complain-di-add-edit',
  templateUrl: 'close-complain-di-add-edit.component.html',
  styleUrls: ['close-complain-di-add-edit.component.css']

})
export class CloseComplainDIAddEditComponent {

  public title: string = "Close Complain";
  public closeComplainDIFormGroup: FormGroup;
  public closeRemarksLength: number = this.localStorageService.dbSettings.closeRemarks;
  public fileActivityId: number = this.localStorageService.appSettings.closeComplaintActivityId;//to load the files

  public routeParam: any = {
    complaintReferenceNo: '',//to get complaint reference no from route param
    complaintStatus: ''//to fetch complaint status from route
  };
  //for busy spinner
  public busySpinner: boolean = false;
  //for error msg
  public errorMsgObj: any = {
    errorMsg: '',
    errMsgShowFlag: false
  };

  constructor(
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,//modal
    private datePipe: DatePipe,//for date
    private localStorageService: LocalStorageService,
    private sessionErrorService: SessionErrorService,
    private complaintDIService: ComplaintDIService
  ) {
    this.buildForm();//build form
  }

  ngOnInit(): void {
    this.getRouteParam();//calling method to get route param 
    this.getSystemDate();//method to get system date
  }//end of onInit

  //method to get route param
  private getRouteParam() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.routeParam.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
      this.routeParam.complaintStatus = params.complaintStatus ? params.complaintStatus : '';
    });
    console.log("complaintReferenceNo for complaint close di add: ", this.routeParam.complaintReferenceNo);
    this.closeComplainDIFormGroup.controls['complaintReferenceNo'].setValue(this.routeParam.complaintReferenceNo);
  }//end of method

  //a method named buildform for creating the closeComplainDIFormGroup and its formControl
  private buildForm(): void {
    this.closeComplainDIFormGroup = this.formBuilder.group({
      'complaintReferenceNo': [''
      ],
      'closeDate': [''
      ],
      'acknoledgementReceived': [''
      ],
      'remarks': [''
        , [
          Validators.required,
        ]
      ]
    });
  }//end of method buildForm
  //method to get system date
  private getSystemDate() {
    //formatting the current date
    let date = new Date();
    let currentDate: string = this.datePipe.transform(date,'yyyy-MM-dd'); //'dd-MMM-yyyy');
    this.closeComplainDIFormGroup.controls["closeDate"].setValue(currentDate);
  }//end of method

  //onOpenModal for opening modal from modalService
  private onOpenModal(modalMessage) {
    const modalRef = this.modalService.open(NgbdModalComponent);
    modalRef.componentInstance.modalTitle = 'Information';
    modalRef.componentInstance.modalMessage = modalMessage;//"User Id "+ manageProfileUserId + " updated successfully."
  }
  //end of method onOpenModal

  //method of submit modify allocate complaint
  public onComplaintResolutionPISubmit() {
    console.log("form value of Close complain di submit : ", this.closeComplainDIFormGroup.value);
    let closeComplainWsInfo: any = {};
    closeComplainWsInfo.activityId = 80;
    closeComplainWsInfo.plantType = this.localStorageService.user.plantType;
    closeComplainWsInfo.action = "";
    let closeComplainJsonForHeaderTable: any = {};
    closeComplainJsonForHeaderTable.lastActivityId = closeComplainWsInfo.activityId;
    closeComplainJsonForHeaderTable.userId = this.localStorageService.user.userId;
    closeComplainJsonForHeaderTable.complaintReferenceNo = this.closeComplainDIFormGroup.value.complaintReferenceNo;
    console.log("close complain json for header table::", closeComplainJsonForHeaderTable);
    let closeComplainJsonForDetTable: any = {};
    closeComplainJsonForDetTable.activityId = closeComplainWsInfo.activityId;
    closeComplainJsonForDetTable.complaintReferenceNo = this.closeComplainDIFormGroup.value.complaintReferenceNo;
    closeComplainJsonForDetTable.closeRemarks = this.closeComplainDIFormGroup.value.remarks;
    closeComplainJsonForDetTable.acknoledgementReceived = this.closeComplainDIFormGroup.value.acknoledgementReceived;
    closeComplainJsonForDetTable.closeDate = this.closeComplainDIFormGroup.value.closeDate;
    closeComplainJsonForDetTable.userId = this.localStorageService.user.userId;
    console.log("close complain json for Det table::", closeComplainJsonForDetTable);
    this.complaintDIService.putHeader(closeComplainJsonForHeaderTable, closeComplainWsInfo.plantType, closeComplainWsInfo.action).
      subscribe(res => {
        if (res.msgType === 'Info') {
          this.complaintDIService.postDetail(closeComplainJsonForDetTable, closeComplainWsInfo.plantType, closeComplainWsInfo.action).
            subscribe(res => {
              if (res.msgType === 'Info') {
                console.log(" ca Det submitted successfully");
                this.onOpenModal(res.msg);//open modal to show the msg
                this.router.navigate([ROUTE_PATHS.RouteComplainDIView]);
              } else {
                this.errorMsgObj.errMsgShowFlag = true;
                this.errorMsgObj.errorMsg = res.msg;
              }
              this.busySpinner = false;//to stop spinner
            },
              err => {
                console.log(err);
                this.errorMsgObj.errMsgShowFlag = true;
                this.errorMsgObj.errorMsg = err.msg;
                this.busySpinner = false;//to stop spinner
                this.sessionErrorService.routeToLogin(err._body);
              });
        } else {
          this.errorMsgObj.errMsgShowFlag = true;
          this.errorMsgObj.errorMsg = res.msg;
          this.busySpinner = false;//to stop spinner
        }
      },
        err => {
          console.log(err);
          this.busySpinner = false;//to stop spinner
          this.errorMsgObj.errMsgShowFlag = true;
          this.errorMsgObj.errorMsg = err.msg;
          this.sessionErrorService.routeToLogin(err._body);
        });

  } //end of method submit close di add

  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method

  //method to delete error msg
  public deleteResErrorMsgOnClick() {
    this.errorMsgObj.errMsgShowFlag = false;
    this.errorMsgObj.errorMsg = "";
  }//end of method delete error msg

  //file change
  public fileChange(evt){

  }//
}//end of class
