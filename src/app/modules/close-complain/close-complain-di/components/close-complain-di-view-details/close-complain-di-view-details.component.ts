import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { CloseComplaintDIService } from '../../../../close-complaint/close-complaint-di/services/close-complaint-di.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { SessionErrorService } from '../../../../shared/services/session-error.service';
// import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ispl-close-complain-di-view-details',
  templateUrl: 'close-complain-di-view-details.component.html',
  styleUrls: ['close-complain-di-view-details.component.css']

})
export class CloseComplainDIViewDetailsComponent {
  
  private currentDate: string;//for sysdate
  public title: string = 'Close Complain';

  public closeComplainDIFormGroup: FormGroup;
  public complaintReferenceNo: string;//to get complaint reference no from route param
  public complaintStatus: string;//to get complaint status from route
  public fileActivityId: number = this.localStorageService.appSettings.closeComplaintActivityId;//to load the files
  //for busy spinner
  public busySpinner: any = {
    compRefDetBusy: true,
    submitBusy: false,//for submit spinner
    busy: true
  };
  public closeDate: string;//close date

  public selectedComplaintReferenceDetails: any = {};//to get selected complaint values  
  //for view in html page
  public remarksDetails: string = '';//text area value for remarks details
  public acknoledgementReceived: string;//radio value for acknoledgement received


  //for error msg
  public errMsgShowFlag: boolean = false;//to show the error msg div
  public errorMsg: string;//to store the error msg

  public closeRemarksLength: number = this.localStorageService.dbSettings.closeRemarks;

  constructor(
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private closeComplaintDIService: CloseComplaintDIService,
    private localStorageService: LocalStorageService,
    private sessionErrorService: SessionErrorService,
    private datePipe: DatePipe//for date
  ) { }

  ngOnInit(): void {
    this.buildForm();//build form
    this.getRouteParam();//calling method to get route param 
    //checking if route param has value or not 
    if (this.complaintReferenceNo) {
      this.getComplaintReferenceDetails(this.complaintReferenceNo, this.fileActivityId);
    }
  }//end of onInit

  //method to get route param
  private getRouteParam() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
      this.complaintStatus = params.complaintStatus ? params.complaintStatus : ''; 
    });
    console.log('complaintReferenceNo for complaint close di view: ', this.complaintReferenceNo);
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
      ]
    });
  }//end of method buildForm
  //method to get system date
  private getSystemDate() {
    //formatting the current date
    let date = new Date();
    this.currentDate = this.datePipe.transform(date, 'dd-MMM-yyyy');
    this.closeComplainDIFormGroup.controls['closeDate'].setValue(this.currentDate);
    this.closeDate = this.datePipe.transform(this.currentDate, 'dd-MMM-yyyy');
    console.log('  preli::: this.closeDate   ', this.closeDate);
  }//end of method

  //to load the spinner
  private updateBusySpinner() {
    if (this.busySpinner.compRefDetBusy || this.busySpinner.submitBusy) {
      this.busySpinner.busy = true;
    } else if (this.busySpinner.compRefDetBusy == false && this.busySpinner.submitBusy == false) {
      this.busySpinner.busy = false;
    }
  }//end of busy spinner method

  //radio button click method of acknoledgement received
  public onAcknoledgementReceivedRadioClick(acknoledgementvalue) {
    console.log('acknoledgementvalue:: ', acknoledgementvalue);
    this.acknoledgementReceived = acknoledgementvalue;
    this.closeComplainDIFormGroup.controls['acknoledgementReceived'].setValue(this.acknoledgementReceived);
  }//end of method

  //method to get complaint ref details and set the values to the html page
  public getComplaintReferenceDetails(complaintReferenceNo: string, fileActivityId: number) {
    this.closeComplaintDIService.getComplaintReferenceDetailsView(complaintReferenceNo, fileActivityId)
      .subscribe(res => {
        //getting the comp ref details from webservice 
        console.log('res for view close comp: ', res);
        this.selectedComplaintReferenceDetails = res.details[0];
        if (res.msgType == 'Info') {
          let remarksDetRes: string = this.selectedComplaintReferenceDetails.closeRemarks;
          this.remarksDetails = remarksDetRes.trim();
          this.closeComplainDIFormGroup.controls['remarks'].setValue(this.remarksDetails);
          //close date
          let resCloseDate = this.selectedComplaintReferenceDetails.closeDate.trim();
          if (resCloseDate) {
            this.closeDate = resCloseDate;
          } else {
            this.getSystemDate();
          }

          // //plant type
          // this.plantType = this.selectedComplaintReferenceDetails.plantType;
          //acknoledgement receive
          let acknoledgementReceivedCloseRes: string = this.selectedComplaintReferenceDetails.acknoledgementReceived;
          if (acknoledgementReceivedCloseRes) {//checking acknoledgementReceivedCloseRes has value dn substring the value
            acknoledgementReceivedCloseRes = acknoledgementReceivedCloseRes.substring(0, 1);
          }
          this.acknoledgementReceived = acknoledgementReceivedCloseRes;
          this.closeComplainDIFormGroup.controls['acknoledgementReceived'].setValue(this.acknoledgementReceived);
        } else {
          // show error msg on html page
          this.errMsgShowFlag = true;
          this.errorMsg = 'Sorry! Netowrk/Server Problem. Please try again.';
        }//end of else
        this.busySpinner.compRefDetBusy = false;//busy spinner
        this.updateBusySpinner();//method for busy spinner
      },
        err => {
          console.log(err);
          this.busySpinner.compRefDetBusy = false;//busy spinner
          this.updateBusySpinner();//method for busy spinner
          this.sessionErrorService.routeToLogin(err._body);
        });
  }//end of method to get complaint ref details and set the values to the html page 

  // start method of deleteResErrorMsgOnClick
  public deleteResErrorMsgOnClick() {
    this.errMsgShowFlag = false;
    this.errorMsg = '';
  }//method to delete error msg

  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method


}//end of class
