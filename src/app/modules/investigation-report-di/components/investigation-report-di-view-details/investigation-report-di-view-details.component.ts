import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_PATHS } from '../../../router/router-paths';
import 'rxjs/add/observable/forkJoin';//new add for forkjoin
import { Subscription } from 'rxjs/Subscription';//to get route param
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { DatePipe } from '@angular/common';
import { SessionErrorService } from "../../../shared/services/session-error.service";
import { InvestigationReportDIConfigModel } from '../../models/investigation-report-di-config.model';

@Component({
  selector: 'ispl-investigation-report-di-view-details-form',
  templateUrl: 'investigation-report-di-view-details.component.html',
  // templateUrl: 'test.html',
  styleUrls: ['investigation-report-di-view-details.component.css']
})
export class InvestigationReportDiViewDetailsComponent implements OnInit {
 
  public title: string;

  //creating a FormGroup for Preliminary Investigation
  public preliInvestFormGroup: FormGroup;
  public complaintReferenceNo: string;//to get complaint ref no from html and send it as a parameter
  //variable used for radio button
  public invReportVar: any = { siteVisitMadeValue: 'Y', sampleCollectedValue: 'Y' };
  public invReportTable: any[] = [];//to store prev inv report
  public complaintStatus: string = "";//to fetch complaint status from route
  constructor(
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    // private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private sessionErrorService: SessionErrorService,
    private datePipe: DatePipe//for date
  ) {
  }

  ngOnInit(): void {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
      this.complaintStatus = params.complaintStatus ? params.complaintStatus : ''; 
    });
    console.log("complaintReferenceNo for view in preliminary-investigation-di-add-component: ",
      this.complaintReferenceNo);
      this.buildForm();   
    this.title = 'Investigation Report';
    this.invReportTable = new InvestigationReportDIConfigModel().prevInvReportHeader;
  }//end of onInit

  private buildForm(): void {
    this.preliInvestFormGroup = this.formBuilder.group({
      'complaintRefNo': [''
    ],
    'complaintRefNoForModify': [''
    ],
    'siteVisitMade': [''
    ],
    'siteVisitDate': [''
    ],
    'sampleColleted': [''
    ],
    'sampleColletedDate': [''
    ],
    'preliDate': [''
    ],
    'unloadingEquipment': [''
    ],
    'lubricantUsed': [''
    ], 
    'layingPosiion': [''
    ],
    'jointingtype': [''
    ]
    });
  }//end of build form

  //cancel method
  public onCancel(): void {
    // Not authenticated
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }//end of cancel method

}//end of class