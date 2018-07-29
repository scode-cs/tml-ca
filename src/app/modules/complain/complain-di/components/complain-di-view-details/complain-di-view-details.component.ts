/* tslint:disable: member-ordering forin */
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_PATHS } from '../../../../router/router-paths';
// import { DatePipe } from '@angular/common';
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
  public invReportTable: any[] = [];//to store prev inv report
  
  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
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
    console.log("complaintReferenceNo for modify Complaint di: ", this.complaintReferenceNo);
  }//end of method

  //a method named buildform for creating the complaintRegisterFormGroup and its formControl
  private buildForm(): void {
    this.complaintRegisterFormGroup = this.formBuilder.group({
      'modeId': [''
      ],
      'complaintReferenceDt': [''
      ],
      'invoiceNo': [''
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
       let json : any = JSON.parse(res.mapDetails);
       console.log("json::::",json);
      },
      err => {
        console.log(err);
        
        // this.sessionErrorService.routeToLogin(err._body);
      });

  }//end of method

  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method
 
}//end of class
