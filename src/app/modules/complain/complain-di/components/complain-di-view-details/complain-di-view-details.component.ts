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


@Component({
  selector: 'ispl-complain-di-view-details-form',
  templateUrl: 'complain-di-view-details.component.html',
  styleUrls: ['complain-di-view-details.component.css']
})
export class ComplainDIViewDetailsComponent implements OnInit {

 
  public title: string = "Complaint Register";
  public complaintRegisterFormGroup: FormGroup;
  public complaintReferenceNo: string = '';//to store route param
  public complaintStatus: number ;//to store route param 
  public invReportTable: any[] = [];//to store prev complain report
  public complainDetails: any[] = [];//to store complain reference detailS

  public complainIndex: number = 0;
  
  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private datePipe: DatePipe,//for date
    private formBuilder: FormBuilder,
    private complaintDIRegisterDataService: ComplaintDIRegisterDataService
  ) {
    this.buildForm();//to build form
  }

  ngOnInit(): void {
    this.getRouteParam();//to get route param 
    this.invReportTable = new ComplaintDIConfigModel().prevInvReportHeader;//getting prev inv report details
    this.getviewComplainReferenceDetailsWSCall();//service call
  }//end of on init

  //method to get route param
  private getRouteParam(){
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
      this.complaintStatus = params.complaintStatus ? params.complaintStatus : '';
    });
    console.log("complaintReferenceNo for view Complaint di: ", this.complaintReferenceNo);
  }//end of method

  //a method named buildform for creating the complaintRegisterFormGroup and its formControl
  private buildForm(): void {
    this.complaintRegisterFormGroup = this.formBuilder.group({
      'modeId': [''
      ],
      'complaintReferenceDt': [''
      ],
      'custCode':[''
      ],
      'custName':[''
      ],
      'salesGroup':[''
      ],
      'salesOffice':[''
      ],
      'contactPersonName': [''
      ],
      'contactPersonPhoneNo': [''
      ],
      'contactPersonEmailId': [''
      ],
      'loggedBy': [''
      ],
      'loggedOnDt': [''
      ],
      'complaintTypeId': [''
      ],
      'natureOfComplaintId': [''
      ],
      'complaintDetails': [''
      ],
      'siteVisit': [''
      ],
      'siteVisitByDepartmentName':[''
      ]
    });

  }//end of method buildForm

  //method to get complain reference details by service call
  private getviewComplainReferenceDetailsWSCall() {
    this.complaintDIRegisterDataService.getComplaintReferenceViewDetails(this.complaintReferenceNo,this.complaintStatus).
      subscribe(res => {
       console.log("res of ref det::::",res);
       if(res.msgType==='Info') {
         let json : any = JSON.parse(res.mapDetails);
         console.log("json::::",json);
         this.complainDetails = json;
         this.complainIndex = this.complainDetails ? this.complainDetails.length-1 : 0;
          this.setResValToForm();
       }//end of if
      },
      err => {
        console.log(err);        
        // this.sessionErrorService.routeToLogin(err._body);
      });
  }//end of method

  //method to set res value to form
  private setResValToForm() {
    let complainFormData: any = this.complainDetails[this.complainIndex];

    this.complaintRegisterFormGroup.controls['modeId'].setValue(complainFormData.modeId);
    this.complaintRegisterFormGroup.controls['complaintReferenceDt'].setValue(this.datePipe.transform(complainFormData.complaintReferenceDt,'dd-MMM-yyyy'));
    this.complaintRegisterFormGroup.controls['custCode'].setValue(complainFormData.custCode);
    this.complaintRegisterFormGroup.controls['custName'].setValue(complainFormData.customerName);
    this.complaintRegisterFormGroup.controls['salesGroup'].setValue(complainFormData.salesGroup);
    this.complaintRegisterFormGroup.controls['salesOffice'].setValue(complainFormData.salesOffice);
    this.complaintRegisterFormGroup.controls['contactPersonName'].setValue(complainFormData.contactPersonName);
    this.complaintRegisterFormGroup.controls['contactPersonPhoneNo'].setValue(complainFormData.contactPersonPhoneNo);
    this.complaintRegisterFormGroup.controls['contactPersonEmailId'].setValue(complainFormData.contactPersonEmailId);
    this.complaintRegisterFormGroup.controls['loggedBy'].setValue(complainFormData.loggedByName);
    this.complaintRegisterFormGroup.controls['loggedOnDt'].setValue(this.datePipe.transform(complainFormData.loggedOnDt,'dd-MMM-yyyy'));
    this.complaintRegisterFormGroup.controls['complaintTypeId'].setValue(complainFormData.complaintTypeDesc);
    this.complaintRegisterFormGroup.controls['natureOfComplaintId'].setValue(complainFormData.natureOfComplaintDesc);
    this.complaintRegisterFormGroup.controls['complaintDetails'].setValue(complainFormData.complaintDetails);
    this.complaintRegisterFormGroup.controls['siteVisit'].setValue(complainFormData.siteVisit);
    this.complaintRegisterFormGroup.controls['siteVisitByDepartmentName'].setValue(complainFormData.siteVisitByDepartmentName);
  
  }//end of method 

  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method

  public selectData(cmpIndex: number) {
    this.complainIndex = cmpIndex;
    this.setResValToForm();
  }
 
}//end of class
