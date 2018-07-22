import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { DatePipe } from '@angular/common';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { SessionErrorService } from "../../../../shared/services/session-error.service";
import { RCADIService } from "../../services/rca-di-add-edit.service";
import { NgbdModalComponent } from '../../../../widget/modal/components/modal-component';


@Component({
  selector: 'ispl-rca-di-view-details',
  templateUrl: 'rca-di-view-details.component.html',
  styleUrls: ['rca-di-view-details.component.css']

})
export class RCADIViewDetailsComponent implements OnInit {

  // public fileList: FileList;
  public title: string = "RCA";//to show titlee on html page
  public complaintReferenceNo: string;//to get complaint reference no from route param
  public rcaDIAddEditFormGroup: FormGroup;
  //for busy spinner
  public busySpinner: any = {
    compRefDetBusy: true,
    submitBusy: false,//for submit spinner
    busy: true
  };
  public currentDate: string;//for sysdate
  public rcaAddEditDate: string;//close date
  public selectedComplaintReferenceDetails: any = {};//to get selected complaint values  
  public rcaAddEditDetails: string = "";//text area value for rca details

  //for error msg
  public errMsgShowFlag: boolean = false;//to show the error msg div
  public errorMsg: string;//to store the error msg

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private datePipe: DatePipe,//for date
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private sessionErrorService: SessionErrorService,
    private rCADIService: RCADIService
  ) {

  }//end of constructor

  ngOnInit(): void {
    console.log("onInit of RCADIViewDetailsComponent..");
    this.buildForm();//build form
    this.getRouteParam();//calling method to get route param 
    this.getSystemDate();//method to get system date

    this.busySpinner.busy = false;
  }//end of on init

  //a method named buildform for creating the rcaDIAddEditFormGroup and its formControl
  private buildForm(): void {
    this.rcaDIAddEditFormGroup = this.formBuilder.group({
      'complaintReferenceNo': [''
      ],
      'rcaAddEditDate': [''
      ],
      'rcaAddEditDetails': [''
      ]
    });
  }//end of method buildForm

  //method to get route param
  private getRouteParam() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : 'DI000009';
    });
    console.log("complaintReferenceNo for rca di view: ", this.complaintReferenceNo);
  }//end of method

  //method to get system date
  private getSystemDate() {
    //formatting the current date
    let date = new Date();
    this.currentDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.rcaDIAddEditFormGroup.controls["rcaAddEditDate"].setValue(this.currentDate);
    // this.rcaAddEditDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.rcaAddEditDate = this.datePipe.transform(this.currentDate, 'dd-MMM-YYYY');
    console.log("  rca::: this.rcaAddEditDate   ", this.rcaAddEditDate);
  }//end of method

  //to load the spinner
  private updateBusySpinner() {
    if (this.busySpinner.compRefDetBusy || this.busySpinner.submitBusy) {
      this.busySpinner.busy = true;
    } else if (this.busySpinner.compRefDetBusy == false || this.busySpinner.submitBusy == false) {
      this.busySpinner.busy = false;
    }
  }//end of busy spinner method

  //onOpenModal for opening modal from modalService
  private onOpenModal(complaintRefNo,modalMsg) {
    const modalRef = this.modalService.open(NgbdModalComponent);
    modalRef.componentInstance.modalTitle = 'Information';
    modalRef.componentInstance.modalMessage = modalMsg;
      // this.complaintReferenceNo ?
      //   "Complaint Reference Number(DI) " + complaintRefNo + " updated successfully."
      //   : "Complaint Reference Number(DI) " + complaintRefNo + " created successfully.";
  }
  //end of method onOpenModal


  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method

}//end of class