import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { DatePipe } from '@angular/common';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { SessionErrorService } from "../../../../shared/services/session-error.service";
import { PADIService } from "../../services/pa-di-add-edit.service";
import { NgbdModalComponent } from '../../../../widget/modal/components/modal-component';


@Component({
  selector: 'ispl-pa-di-view-details',
  templateUrl: 'pa-di-view-details.component.html',
  styleUrls: ['pa-di-view-details.component.css']

})
export class PADIViewDetailsComponent implements OnInit {

  // public fileList: FileList;
  public title: string = "PA";//to show titlee on html page
  public paDIAddEditFormGroup: FormGroup;
  public routeParam: any ={
    complaintReferenceNo:'',//to get complaint reference no from route param
    complaintStatus:  ''//to fetch complaint status from route
  }; 
  //for busy spinner
  public busySpinner: boolean = false;
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
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private sessionErrorService: SessionErrorService,
    private pADIService: PADIService
  ) {
    this.buildForm();//build form
  }//end of constructor

  ngOnInit(): void {
    console.log("onInit of PADIViewDetailsComponent..");
    this.getRouteParam();//calling method to get route param 
    this.getSystemDate();//method to get system date
  }//end of on init

  //a method named buildform for creating the rcaDIAddEditFormGroup and its formControl
  private buildForm(): void {
    this.paDIAddEditFormGroup = this.formBuilder.group({
      'complaintReferenceNo': [''
      ],
      'paAddEditDate': [''
      ],
      'paAddEditDetails': [''
      ]
    });
  }//end of method buildForm

  //method to get route param
  private getRouteParam() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.routeParam.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : 'DI000009';
      this.routeParam.complaintStatus = params.complaintStatus ? params.complaintStatus : ''; 
    });
    console.log("complaintReferenceNo for pa di view: ", this.routeParam.complaintReferenceNo);
    console.log("this.complaintStatus for pa di view::",this.routeParam.complaintStatus);
    this.paDIAddEditFormGroup.controls['complaintReferenceNo'].setValue(this.routeParam.complaintReferenceNo);

  }//end of method

  //method to get system date
  private getSystemDate() {
    //formatting the current date
    let date = new Date();
    let currentDate: string =  this.datePipe.transform(date, 'yyyy-MM-dd');
    this.paDIAddEditFormGroup.controls["paAddEditDate"].setValue(currentDate);
  }//end of method

  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method

}//end of class