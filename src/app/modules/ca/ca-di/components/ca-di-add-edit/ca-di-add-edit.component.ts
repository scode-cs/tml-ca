import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { DatePipe } from '@angular/common';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { SessionErrorService } from "../../../../shared/services/session-error.service";
import { CADIService } from "../../services/ca-di-add-edit.service";

@Component({
    selector: 'ispl-ca-di-add-edit',
    templateUrl: 'ca-di-add-edit.component.html',
    styleUrls: ['ca-di-add-edit.component.css']
  
  })
  export class CADIAddEditComponent implements OnInit{
      
    // form data for file upload
    private formData: FormData = new FormData();
    private totalFileSize: number = 0;//file upload error
    private fileSizeLimit: number = 104857600;
    private fileData: FormData;

    public fileList: FileList;
    public title: string = "RCA";//to show titlee on html page
    public complaintReferenceNo: string;//to get complaint reference no from route param
    public caDIAddEditFormGroup: FormGroup;
    //for busy spinner
    public busySpinner: any = {
        compRefDetBusy: true,
        submitBusy: false,//for submit spinner
        busy: true
    };
    public currentDate: string;//for sysdate
    public caAddEditDate: string;//close date
    public selectedComplaintReferenceDetails: any = {};//to get selected complaint values  
    public caAddEditDetails: string = "";//text area value for rca details

    //for error msg
    public errMsgShowFlag: boolean = false;//to show the error msg div
    public errorMsg: string;//to store the error msg

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedroute: ActivatedRoute,
        private datePipe: DatePipe,//for date
        private localStorageService: LocalStorageService,
        private sessionErrorService: SessionErrorService,
        private caDIService: CADIService
    ){

    }//end of constructor

    ngOnInit(): void {
        console.log("onInit of CADIAddEditComponent..");
        this.buildForm();//build form
        this.getRouteParam();//calling method to get route param 
        this.getSystemDate();//method to get system date
        
        this.busySpinner.busy = false;
    }//end of on init

    //a method named buildform for creating the caDIAddEditFormGroup and its formControl
  private buildForm(): void {
    this.caDIAddEditFormGroup = this.formBuilder.group({
      'complaintReferenceNo': [''
      ],
      'caAddEditDate': [''
        , [
            Validators.required,
        ]
      ],
      'caAddEditDetails': [''
        , [
          Validators.required,
        ]
      ]
    });
  }//end of method buildForm

  //method to get route param
  private getRouteParam(){
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
    });
    console.log("complaintReferenceNo for ca di add/edit: ", this.complaintReferenceNo);  
  }//end of method

  //method to get system date
  private getSystemDate(){
    //formatting the current date
    let date = new Date();
    this.currentDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.caDIAddEditFormGroup.controls["caAddEditDate"].setValue(this.currentDate);
    this.caAddEditDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    console.log("  rca::: this.caAddEditDate   ", this.caAddEditDate);    
  }//end of method

  //to load the spinner
  private updateBusySpinner() {
    if (this.busySpinner.compRefDetBusy || this.busySpinner.submitBusy) {
      this.busySpinner.busy = true;
    } else if(this.busySpinner.compRefDetBusy == false || this.busySpinner.submitBusy == false) {
      this.busySpinner.busy = false;
    }
  }//end of busy spinner method

   //file upload event  
   public fileChangeCADIAddEdit(event) {
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
  
   //method of submit modify allocate complaint
   public onCADIAddEditSubmit() {
    console.log("form value of ca DI add/modify submit : ", this.caDIAddEditFormGroup.value);
    let caDIAddEditSubmitDet: any = {};
    caDIAddEditSubmitDet.complaintReferenceNo = "DI000010";//this.complaintReferenceNo;
    caDIAddEditSubmitDet.rootCauseAnanysisRemarks = this.caDIAddEditFormGroup.value.caAddEditDetails;//actn det
    caDIAddEditSubmitDet.plantType = "DI";
    caDIAddEditSubmitDet.rootCauseAnanysisDate = this.caAddEditDate;
    console.log("ca di submit: ", caDIAddEditSubmitDet);
    console.log("this.totalFileSize on submit method:::::::::::", this.totalFileSize);
    
    if (this.totalFileSize > this.fileSizeLimit) {
       // show error msg on html page
       this.errMsgShowFlag = true;
       this.errorMsg = "File size should be within 100 mb !";
    } else {
      let jsonArr: any[] = [];//json arr to convert obj toString
      jsonArr.push(JSON.stringify(caDIAddEditSubmitDet));
      this.formData.append("caDet", jsonArr.toString());
      //method to add or update preli
      if (this.fileData != undefined) {
        for (let i: number = 0; i < this.fileList.length; i++) {
          console.log(" file upload", this.fileData.get('uploadFile' + i.toString()));
          if (this.fileData.get('uploadFile' + i.toString()) != null) {
            this.formData.append('uploadFile' + i.toString(), this.fileData.get('uploadFile' + i.toString()));
          }//end of if
        }//end of for
      }//end of if fileData is !undefined
      this.formData.append('Accept', 'application/json');
      this.formData.append('accessToken', 'bearer ' + this.localStorageService.user.accessToken);
      this.formData.append('menuId', 'DEFAULT1');
      this.formData.append('userId', this.localStorageService.user.userId);
      let formDataObj: any = {};
      formDataObj = this.formData;
      this.busySpinner.submitBusy = true;
      this.updateBusySpinner();
      this.caDIService.rcaDIAddEditSubmitWithFileUpload(formDataObj).
        subscribe(res => {
          console.log("rca di add Success Response: ", res);
          this.busySpinner.submitBusy = false;
          this.updateBusySpinner();
          if (res.msgType === "Info") {
            this.router.navigate([ROUTE_PATHS.RouteHome]);
            // this.router.navigate([ROUTE_PATHS.RouteCloseComplaintDI]);//route to the previous page
          } else {
             // show error msg on html page
            this.errMsgShowFlag = true;
            this.errorMsg = res.msg;
            // this.resErrorMsg = "Netowrk/Server Problem. Please try again.";
            this.formData = new FormData();//new instance create of formdata
          }
        },
        err => {
          this.busySpinner.submitBusy = false;
          this.updateBusySpinner();
          // show error msg on html page
          this.errMsgShowFlag = true;
        //   this.errorMsg = err.msg;
          if (err.status == 401) {
            this.errorMsg = "Sorry! Unable to save data. Please try again.";
          } else {
            this.errorMsg = "Netowrk/Server Problem";
          }
          this.formData = new FormData();//new instance create of formdata
          this.sessionErrorService.routeToLogin(err._body);
        });
    }//end of else
  } //end of method submit modify capa actn pi

  
  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method

  }//end of class