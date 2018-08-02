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
import { InvestigationReportDIDataService } from '../../services/investigation-report-di.service';

@Component({
  selector: 'ispl-investigation-report-di-view-details-form',
  templateUrl: 'investigation-report-di-view-details.component.html',
  // templateUrl: 'test.html',
  styleUrls: ['investigation-report-di-view-details.component.css']
})
export class InvestigationReportDiViewDetailsComponent implements OnInit {

  public title: string = 'Investigation Report';
  //creating a FormGroup for Investigation Report
  public invReportFormGroup = new FormGroup({
    complaintReferenceNo: new FormControl(''),
    siteVisitMade: new FormControl({ value: '', disabled: true }),
    siteVisitDate: new FormControl(''),
    sampleCollected: new FormControl({ value: '', disabled: true }),
    sampleCollectedDate: new FormControl(''),
    investigationReportDate: new FormControl(''),
    unloadingEquipment: new FormControl(''),
    lubricantUsed: new FormControl(''),
    layingPosiion: new FormControl(''),
    jointingtype: new FormControl('')
  });
  public complaintReferenceNo: string;//to get complaint ref no from html and send it as a parameter
  //variable used for radio button
  public invReportVar: any = { siteVisitMadeValue: '', sampleCollectedValue: '' };
  public invReportTable: any[] = [];//to store prev inv report
  public complaintStatus: number;//to fetch complaint status from route
  public invReportDeatils: any[] = [];// to store invReport deatils from response
  public invReportIndex: number = 0;
  //busySpinner 
  public busySpinner: boolean = true;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private sessionErrorService: SessionErrorService,
    private investigationReportDIDataService: InvestigationReportDIDataService,
    private datePipe: DatePipe//for date
  ) {
    // this.buildForm();
  }

  ngOnInit(): void {
    this.busySpinner = true;
    this.getRouteParam();
    this.invReportTable = new InvestigationReportDIConfigModel().prevInvReportHeader;
    this.getInvestigationViewDetailsWSCall();
  }//end of onInit

  //start method getRouteParam to get route parameter
  private getRouteParam() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
      this.complaintStatus = params.complaintStatus ? params.complaintStatus : '';
    });
    console.log("complaintReferenceNo for view in preliminary-investigation-di-add-component: ", this.complaintReferenceNo);
  }//end of the method

  //method to get investigation report details by service call
  private getInvestigationViewDetailsWSCall() {
    let pageCompStatus: number = 40;
    this.investigationReportDIDataService.getInvestigationReportViewDetails(this.complaintReferenceNo, pageCompStatus).
      subscribe(res => {
        //console.log("res of ref det::::",res);
        if (res.msgType === "Info") {
          let invReportDeatilsJson: any = JSON.parse(res.mapDetails);
          this.invReportDeatils = invReportDeatilsJson;
          console.log("res of inv Report Deatils::::", this.invReportDeatils);
          this.invReportIndex = this.invReportDeatils ? this.invReportDeatils.length - 1 : 0;
          this.setFormValue();
          this.busySpinner = false;
        }
      },
        err => {
          console.log(err);
          this.busySpinner = false;
          this.sessionErrorService.routeToLogin(err._body);
        });
  }//end of method

  //start method setFormValue to set the value in invreport form
  private setFormValue() {
    let formData: any = this.invReportDeatils[this.invReportIndex];
    this.invReportFormGroup.controls['complaintReferenceNo'].setValue(formData.complaintReferenceNo);
    this.invReportFormGroup.controls['siteVisitDate'].setValue(this.datePipe.transform(formData.siteVisitDt, 'dd-MMM-yyyy'));
    this.invReportVar.siteVisitMadeValue = formData.siteVisit;
    this.invReportFormGroup.controls['siteVisitMade'].setValue(formData.siteVisit);
    this.invReportVar.sampleCollectedValue = formData.sampleCollected;
    this.invReportFormGroup.controls['sampleCollected'].setValue(formData.sampleCollected);
    this.invReportFormGroup.controls['sampleCollectedDate'].setValue(this.datePipe.transform(formData.sampleCollectedDate, 'dd-MMM-yyyy'));
    this.invReportFormGroup.controls['investigationReportDate'].setValue(this.datePipe.transform(formData.investigationReportDate, 'dd-MMM-yyyy'));
  }//end method setFormValue

  // start method selectData
  public selectData(invReportIndexParam: number) {
    this.busySpinner = true;
    this.invReportIndex = invReportIndexParam;
    this.setFormValue();
    setTimeout(() => {
      this.busySpinner = false;
    }, 500);
  }//end method of selectData

  //cancel method
  public onCancel(): void {
    // Not authenticated
    // this.router.navigate([ROUTE_PATHS.RouteHome]);
  }//end of cancel method

}//end of class