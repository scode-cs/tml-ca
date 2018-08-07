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
  
  public title: string = 'Close Complain';
  public closeComplainDIFormGroup: FormGroup;
  public complaintReferenceNo: string;//to get complaint reference no from route param
  public complaintStatus: string;//to get complaint status from route
  public fileActivityId: number = this.localStorageService.appSettings.closeComplaintActivityId;//to load the files
  //for busy spinner
  public busySpinner: boolean = false;
  
  //for error msg
  public errMsgShowFlag: boolean = false;//to show the error msg div
  public errorMsg: string;//to store the error msg



  constructor(
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private closeComplaintDIService: CloseComplaintDIService,
    private localStorageService: LocalStorageService,
    private sessionErrorService: SessionErrorService,
    private datePipe: DatePipe//for date
  ) { 
    this.buildForm();//build form
  }

  ngOnInit(): void {
    this.getRouteParam();//calling method to get route param 
  }//end of onInit

  //method to get route param
  private getRouteParam() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
      this.complaintStatus = params.complaintStatus ? params.complaintStatus : ''; 
    });
    console.log('complaintReferenceNo for complain close di view: ', this.complaintReferenceNo);
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
    let currentDate: string = this.datePipe.transform(date, 'dd-MMM-yyyy');
    this.closeComplainDIFormGroup.controls['closeDate'].setValue(currentDate);
  }//end of method
  
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
