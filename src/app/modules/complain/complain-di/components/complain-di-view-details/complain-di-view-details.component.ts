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


@Component({
  selector: 'ispl-complain-di-view-details-form',
  templateUrl: 'complain-di-view-details.component.html',
  styleUrls: ['complain-di-view-details.component.css']
})
export class ComplainDIViewDetailsComponent implements OnInit {

 
  public title: string = "Complaint Register";
  public complaintRegisterFormGroup: FormGroup;
  public complaintReferenceNo: string = '';//to store route param
  public complaintStatus: string = '';//to store route param 
  public invReportTable: any[] = [];//to store prev inv report
  
  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.buildForm();//to build form
    this.getRouteParam();//to get route param 
    this.invReportTable = new ComplaintDIConfigModel().prevInvReportHeader;//getting prev inv report details
       
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

  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method
 
}//end of class
