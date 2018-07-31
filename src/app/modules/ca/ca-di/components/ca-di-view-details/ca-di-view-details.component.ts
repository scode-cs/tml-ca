import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { DatePipe } from '@angular/common';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { SessionErrorService } from "../../../../shared/services/session-error.service";
import { CADIService } from "../../services/ca-di-add-edit.service";
// import { NgbdModalComponent } from '../../../../widget/modal/components/modal-component';


@Component({
  selector: 'ispl-ca-di-view-details',
  templateUrl: 'ca-di-view-details.component.html',
  styleUrls: ['ca-di-view-details.component.css']

})
export class CADIViewDetailsComponent implements OnInit {

  public caDIAddEditFormGroup: FormGroup;
  public title: string = "CA";//to show titlee on html page
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
    private localStorageService: LocalStorageService,
    private sessionErrorService: SessionErrorService,
    private cADIService: CADIService
  ) {
    this.buildForm();//build form
  }//end of constructor

  ngOnInit(): void {
    console.log("onInit of CADIViewDetailsComponent..");
    this.getRouteParam();//calling method to get route param 
    this.getSystemDate();//method to get system date
  }//end of on init
  
  //a method named buildform for creating the caDIAddEditFormGroup and its formControl
  private buildForm(): void {
    this.caDIAddEditFormGroup = this.formBuilder.group({
      'complaintReferenceNo': [''
      ],
      'caAddEditDate': [''
      ],
      'caAddEditDetails': [''
      ]
    });
  }//end of method buildForm

  //method to get route param
  private getRouteParam() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.routeParam.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
      this.routeParam.complaintStatus = params.complaintStatus ? params.complaintStatus : '';    
    });
    console.log("complaintReferenceNo for ca di view: ", this.routeParam.complaintReferenceNo);
    console.log("this.complaintStatus for ca di view::",this.routeParam.complaintStatus);
    this.caDIAddEditFormGroup.controls['complaintReferenceNo'].setValue(this.routeParam.complaintReferenceNo);
  }//end of method

  //method to get system date
  private getSystemDate() {
    //formatting the current date
    let date = new Date();
    let currentDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.caDIAddEditFormGroup.controls["caAddEditDate"].setValue(currentDate);
  }//end of method

  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method

}//end of class