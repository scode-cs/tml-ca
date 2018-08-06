import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { DatePipe } from '@angular/common';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent } from '../../../../widget/modal/components/modal-component';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { SessionErrorService } from "../../../../shared/services/session-error.service";
import { PADIService } from "../../services/pa-di-add-edit.service";
import { ComplaintDIService } from '../../../../shared/services/complaint-di.service';
@Component({
  selector: 'ispl-pa-di-add-edit',
  templateUrl: 'pa-di-add-edit.component.html',
  styleUrls: ['pa-di-add-edit.component.css']
})
export class PADIAddEditComponent implements OnInit {
  private formData: FormData = new FormData(); // form data for file upload
  private totalFileSize: number = 0;//file upload error
  private fileSizeLimit: number = 104857600;
  private fileData: FormData;
  public fileList: FileList;
  public paDIAddEditFormGroup: FormGroup;
  public title: string = "PA";//to show titlee on html page
  public routeParam: any = {
    complaintReferenceNo: '',//to get complaint reference no from route param
    complaintStatus: ''//to fetch complaint status from route
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
    private modalService: NgbModal,//modal
    private localStorageService: LocalStorageService,
    private sessionErrorService: SessionErrorService,
    private paDIService: PADIService,
    private complaintDIService: ComplaintDIService
  ) {
    this.buildForm();//build form
  }//end of constructor

  ngOnInit(): void {
    console.log("onInit of PADIAddEditComponent..");
    this.getRouteParam();//calling method to get route param 
    this.getSystemDate();//method to get system date
  }//end of on init

  //a method named buildform for creating the paDIAddEditFormGroup and its formControl
  private buildForm(): void {
    this.paDIAddEditFormGroup = this.formBuilder.group({
      'complaintReferenceNo': [''
      ],
      'paAddEditDate': [''
        , [
          Validators.required,
        ]
      ],
      'paAddEditDetails': [''
        , [
          Validators.required,
        ]
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
    console.log("complaintReferenceNo for pa di add/edit: ", this.routeParam.complaintReferenceNo);
    console.log("this.complaintStatus for pa di view::", this.routeParam.complaintStatus);
    this.paDIAddEditFormGroup.controls['complaintReferenceNo'].setValue(this.routeParam.complaintReferenceNo);
  }//end of method

  //method to get system date
  private getSystemDate() {
    //formatting the current date
    let date = new Date();
    let currentDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.paDIAddEditFormGroup.controls["paAddEditDate"].setValue(currentDate);
  }//end of method

   //onOpenModal for opening modal from modalService
   private onOpenModal(modalMessage) {
    const modalRef = this.modalService.open(NgbdModalComponent);
    modalRef.componentInstance.modalTitle = 'Information';
    modalRef.componentInstance.modalMessage = modalMessage;//"User Id "+ manageProfileUserId + " updated successfully."
  }
  //end of method onOpenModal

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
  public onPADIAddEditSubmit() {
    this.busySpinner = true;//to load spinner
    console.log("form value of pa DI add/modify submit : ", this.paDIAddEditFormGroup.value);
    let paWsInfo: any = {};
    paWsInfo.activityId = 70;
    paWsInfo.plantType = this.localStorageService.user.plantType;
    paWsInfo.action = "";
    let paJsonForHeaderTable: any = {};
    paJsonForHeaderTable.lastActivityId = paWsInfo.activityId;
    paJsonForHeaderTable.userId = this.localStorageService.user.userId;
    paJsonForHeaderTable.complaintReferenceNo = this.paDIAddEditFormGroup.value.complaintReferenceNo;
    console.log("pa json for header table::", paJsonForHeaderTable);
    let paJsonForDetTable: any = {};
    paJsonForDetTable.activityId = paWsInfo.activityId;
    paJsonForDetTable.complaintReferenceNo = this.paDIAddEditFormGroup.value.complaintReferenceNo;
    paJsonForDetTable.preventiveAction = this.paDIAddEditFormGroup.value.paAddEditDetails;
    paJsonForDetTable.preventiveActionDate = this.paDIAddEditFormGroup.value.paAddEditDate;
    paJsonForDetTable.userId = this.localStorageService.user.userId;
    console.log("pa json for Det table::", paJsonForDetTable);
    this.complaintDIService.putHeader(paJsonForHeaderTable, paWsInfo.plantType, paWsInfo.action).
      subscribe(res => {
        if (res.msgType === 'Info') {
          this.complaintDIService.postDetail(paJsonForDetTable, paWsInfo.plantType, paWsInfo.action).
            subscribe(res => {
              if (res.msgType === 'Info') {
                console.log(" pa Det submitted successfully");
                this.onOpenModal(res.msg);//open modal to show the msg
                this.router.navigate([ROUTE_PATHS.RouteComplainDIView]);
              } else {
                this.errorMsgObj.errMsgShowFlag = true;
                this.errorMsgObj.errorMsg = res.msg;
              }
              this.busySpinner = false;//to stop spinner
            },
              err => {
                console.log(err);
                this.errorMsgObj.errMsgShowFlag = true;
                this.errorMsgObj.errorMsg = err.msg;
                this.busySpinner = false;//to stop spinner
                this.sessionErrorService.routeToLogin(err._body);
              });
        } else {
          this.errorMsgObj.errMsgShowFlag = true;
          this.errorMsgObj.errorMsg = res.msg;
          this.busySpinner = false;//to stop spinner
        }
      },
        err => {
          console.log(err);
          this.busySpinner = false;//to stop spinner
          this.errorMsgObj.errMsgShowFlag = true;
          this.errorMsgObj.errorMsg = err.msg;
          this.sessionErrorService.routeToLogin(err._body);
        });
  } //end of method submit modify capa actn pi

  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method

}//end of class