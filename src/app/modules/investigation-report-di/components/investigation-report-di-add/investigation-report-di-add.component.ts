import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastService } from "../../../home/services/toast-service";
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ROUTE_PATHS } from '../../../router/router-paths';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';//new add for forkjoin
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { InvestigationReportDIDataService } from '../../services/investigation-report-di.service';
import { NgbdModalComponent } from '../../../widget/modal/components/modal-component';
import { AppUrlsConst, WebServiceConst } from '../../../app-config';
import { DatePipe } from '@angular/common';
import { SessionErrorService } from '../../../shared/services/session-error.service';
import { NgbdComplaintReferenceNoModalComponent } from './complaint-reference-no-modal/complaint-reference-no-modal.component';
import { DIPolygonModel } from '../../../shared/components/process-flow/complain-di-polygon.model';
import { InvestigationReportDIConfigModel } from '../../models/investigation-report-di-config.model';
@Component({
  selector: 'ispl-investigation-report-di-add-form',
  templateUrl: 'investigation-report-di-add.component.html',
  // templateUrl: 'test.html',
  styleUrls: ['investigation-report-di-add.component.css']
})
export class InvestigationReportDiComponent implements OnInit {
  private totalFileSize: number = 0;//file upload error
  //private fileSizeLimit: number = 104857600;

  // form data for file upload
  private formData: FormData = new FormData();
  private fileData: FormData;
  public fileList: FileList;

  public title: string = 'Add Investigation Report';//set the title;

  public invReportTable: any[] = [];//to store prev inv report
  public complaintStatus: number;//to fetch complaint status from route
  public invReportDeatils: any[] = [];// to store invReport deatils from response
  public invReportIndex: number = 0;


  //creating a FormGroup for Investigation Report
  public invReportFormGroup = new FormGroup({
    complaintReferenceNo: new FormControl(''),
    siteVisit: new FormControl('', Validators.required),
    siteVisitDt: new FormControl(''),
    sampleCollected: new FormControl('', Validators.required),
    sampleCollectedDate: new FormControl(''),
    investigationReportDate: new FormControl(''),
    unloadingEquipment: new FormControl(''),
    lubricantUsed: new FormControl(''),
    layingPosiion: new FormControl(''),
    jointingtype: new FormControl('')
  });


  public complaintReferenceNo: string;//to get complaint ref no from html and send it as a parameter

  //busySpinner 
  public busySpinner: boolean = true;


  //variable used for radio button
  public invReportVar: any = { siteVisitMadeValue: '', sampleCollectedValue: '' };

  public resMsgType: string = "Info";//for showing error msg in html page
  public errorConst: string = "Error";//error constant
  public infoConstant: string = "Info";//info constant
  public resErrorMsg: string;
  //for file
  private fileActivityId: number = this.localStorageService.appSettings.preliminaryInvestigationActivityId;//to get uploaded file for DI edit

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private investigationReportDIDataService: InvestigationReportDIDataService,
    private modalService: NgbModal,//modal
    private formBuilder: FormBuilder,
    private sessionErrorService: SessionErrorService,
    private datePipe: DatePipe//for date
  ) {
  }

  ngOnInit(): void {
    this.busySpinner = true;
    this.getRouteParam();
    this.getInvestigationViewDetailsWSCall();
    this.invReportTable = new InvestigationReportDIConfigModel().prevInvReportHeader;
  }//end of onInit

  //start method getRouteParam to get route parameter
  private getRouteParam() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
      this.complaintStatus = params.complaintStatus ? params.complaintStatus : '';
    });
    console.log("complaintReferenceNo investigation-report-di-add-component: ", this.complaintReferenceNo);
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
        } else {
          this.busySpinner = false;
          this.invReportFormGroup.controls['complaintReferenceNo'].setValue(this.complaintReferenceNo);
        }//end of else if
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
    this.invReportVar.siteVisitMadeValue = formData.siteVisit;
    this.invReportFormGroup.controls['siteVisit'].setValue(formData.siteVisit);
    if (formData.siteVisit === 'Y') {
      this.invReportFormGroup.controls['siteVisitDt'].setValue(this.datePipe.transform(formData.siteVisitDt, 'yyyy-MM-dd'));
      this.invReportFormGroup.controls['siteVisitDt'].setValidators(Validators.required);
    }
    this.invReportVar.sampleCollectedValue = formData.sampleCollected;
    this.invReportFormGroup.controls['sampleCollected'].setValue(formData.sampleCollected);
    if (formData.sampleCollected === 'Y') {
      this.invReportFormGroup.controls['sampleCollectedDate'].setValue(this.datePipe.transform(formData.sampleCollectedDate, 'yyyy-MM-dd'));
      this.invReportFormGroup.controls['sampleCollectedDate'].setValidators(Validators.required);
    }
    this.invReportFormGroup.controls['unloadingEquipment'].setValue(formData.unloadingEquipement);
    this.invReportFormGroup.controls['layingPosiion'].setValue(formData.layingPosition);
    this.invReportFormGroup.controls['lubricantUsed'].setValue(formData.lubricantUsed);
    this.invReportFormGroup.controls['jointingtype'].setValue(formData.jointingType);
    if (formData.investigationReportDate) {
      this.invReportFormGroup.controls['investigationReportDate'].setValue(this.datePipe.transform(formData.investigationReportDate, 'yyyy-MM-dd'));
    } else {
      this.invReportFormGroup.controls['investigationReportDate'].setValue(formData.investigationReportDate);
    }//end of else of inv report date value
  }//end method setFormValue

  //on click investigationReportDISubmit method
  public investigationReportDISubmit(): void {
    console.log("invReportFormGroup: ", this.invReportFormGroup.value);
  }//end of method investigationReportDISubmit

  // start method of deleteResErrorMsgOnClick
  public deleteResErrorMsgOnClick() {
  }//method to delete error msg

  //file upload event  
  public fileChange(event) {
    this.fileData = new FormData();
    this.totalFileSize = 0;
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      for (let i: number = 0; i < this.fileList.length; i++) {
        let file: File = this.fileList[i];
        this.fileData.append('uploadFile' + i.toString(), file, file.name);
        this.totalFileSize = this.totalFileSize + file.size;
        console.log("this.totalFileSize:::::::::::", this.totalFileSize);
      }//end of for
    }//end of if
  }//end of filechange method  

  //cancel method
  public onCancel(): void {
    // Not authenticated
    // this.router.navigate([ROUTE_PATHS.RouteHome]);
  }//end of cancel method

  //start method for clicking radio button 
  public onRadioClick(radioValue: string, radioButtonName: string) {
    console.log("radioValue ", radioValue);
    console.log("radioButtonName ", radioButtonName);
    if (radioButtonName === "siteVisit") {
      this.invReportVar.siteVisitMadeValue = radioValue;
      //   //  if siteVisitValue is Y then this if condition will be executed
      if (this.invReportVar.siteVisitMadeValue === 'Y') {
        this.invReportFormGroup.controls["siteVisit"].setValue(this.invReportVar.siteVisitMadeValue);
        //     //set sitevisitby field mandatory
        this.invReportFormGroup.controls['siteVisitDt'].setValidators(Validators.required);
      } else if (this.invReportVar.siteVisitMadeValue === "N") { // siteVisitValue is N then this if condition will be executed
        this.invReportFormGroup.controls["siteVisit"].setValue(this.invReportVar.siteVisitMadeValue);
        this.invReportFormGroup.controls['siteVisitDt'].setValidators(null);
        this.invReportFormGroup.controls['siteVisitDt'].updateValueAndValidity();
        this.invReportFormGroup.controls['siteVisitDt'].markAsUntouched();
      } // end of else
    } else if (radioButtonName === "sampleCollected") {
      this.invReportVar.sampleCollectedValue = radioValue;
      //   //  if sampleCollected is Y then this if condition will be executed
      if (this.invReportVar.sampleCollectedValue === 'Y') {
        this.invReportFormGroup.controls["sampleCollected"].setValue(this.invReportVar.sampleCollectedValue);
        //     //set sitevisitby field mandatory
        this.invReportFormGroup.controls['sampleCollectedDate'].setValidators(Validators.required);
      } else if (this.invReportVar.sampleCollectedValue === "N") { // sampleCollected is N then this if condition will be executed
        this.invReportFormGroup.controls["sampleCollected"].setValue(this.invReportVar.sampleCollectedValue);
        this.invReportFormGroup.controls['sampleCollectedDate'].setValidators(null);
        this.invReportFormGroup.controls['sampleCollectedDate'].updateValueAndValidity();
        this.invReportFormGroup.controls['sampleCollectedDate'].markAsUntouched();
      } // end of else
    }//end of else if of sampleCollected
  }//end of method onRadioClick
}//end of class