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
import { ComplaintDIService } from '../../../shared/services/complaint-di.service';
import { NgbdModalComponent } from '../../../widget/modal/components/modal-component';
import { AppUrlsConst, WebServiceConst } from '../../../app-config';
import { DatePipe } from '@angular/common';
import { SessionErrorService } from '../../../shared/services/session-error.service';
import { NgbdComplaintReferenceNoModalComponent } from './complaint-reference-no-modal/complaint-reference-no-modal.component';
import { DIPolygonModel } from '../../../shared/components/process-flow/complain-di-polygon.model';
import { InvestigationReportDIConfigModel } from '../../models/investigation-report-di-config.model';
import { InvestigationDataModel } from '../../models/investigation-data-model';
import { InvestigationReportInvoiceDetailsService } from "../../services/investigation-report-invoice-details.service";
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

  //activity Id for complain register
  private activityId: number = 40;

  public invReportTable: any[] = [];//to store prev inv report
  public itemGridTable: any[] = [];//to store item grid
  public complaintStatus: number;//to fetch complaint status from route
  public invReportDetails: any[] = [];// to store invReport deatils from response
  public invItemDetails: any[] = [];// to store inv item deatils from response
  public selectedInvItemDetails: any[] = [];// to store inv item deatils from response
  public invReportIndex: number = 0;
  public ivtReportDataList: any = { unloadingEquipmentList: '', lubricantUsedList: '', layingPositionList: '', jointingTypeList: '' };
  public unloadingEquipmentList: any[] = [];
  public lubricantUsedList: any[] = [];
  public layingPositionList: any[] = [];
  public jointingTypeList: any[] = [];

  //creating a FormGroup for Investigation Report
  public invReportFormGroup = new FormGroup({
    complaintReferenceNo: new FormControl(''),
    siteVisit: new FormControl('', Validators.required),
    siteVisitDt: new FormControl(''),
    sampleCollected: new FormControl('', Validators.required),
    sampleCollectedDate: new FormControl(''),
    investigationReportDate: new FormControl(''),
    customerCode: new FormControl(''),
    customerName: new FormControl('')
  });


  public complaintReferenceNo: string;//to get complaint ref no from html and send it as a parameter

  //busySpinner 
  public busySpinner: boolean = true;

  public prevInvReportShowFlag: boolean = false;


  //variable used for radio button
  public invReportVar: any = { siteVisitMadeValue: '', sampleCollectedValue: '' };

  public resMsgType: string = "Info";//for showing error msg in html page
  public errorConst: string = "Error";//error constant
  public infoConstant: string = "Info";//info constant
  public resErrorMsg: string;
  //for file
  private fileActivityId: number = this.localStorageService.appSettings.preliminaryInvestigationActivityId;//to get uploaded file for DI edit
  private plantType: string = this.localStorageService.user.plantType;
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private complaintDIService: ComplaintDIService,
    private localStorageService: LocalStorageService,
    private investigationReportDIDataService: InvestigationReportDIDataService,
    private investigationReportInvoiceDetailsService: InvestigationReportInvoiceDetailsService,
    private modalService: NgbModal,//modal
    private formBuilder: FormBuilder,
    private sessionErrorService: SessionErrorService,
    private datePipe: DatePipe//for date
  ) {
  }

  ngOnInit(): void {
    this.getRouteParam();
    this.getSystemDate();
    this.getInvestigationViewDetailsWSCall();
    this.getInvItemGridDet();//method to get inv item grid
    this.invReportTable = new InvestigationReportDIConfigModel().prevInvReportHeader;
    this.itemGridTable = new InvestigationReportDIConfigModel().invItemGridHeader;
    this.ivtReportDataList.unloadingEquipmentList = new InvestigationDataModel().unloadingEquipmentList;
    this.ivtReportDataList.lubricantUsedList = new InvestigationDataModel().lubricantUsedList;
    this.ivtReportDataList.layingPositionList = new InvestigationDataModel().layingPositionList;
    this.ivtReportDataList.jointingTypeList = new InvestigationDataModel().jointingTypeList;
  }//end of onInit

  //start method getRouteParam to get route parameter
  private getRouteParam() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
      this.complaintStatus = params.complaintStatus ? params.complaintStatus : '';
    });
    console.log("complaintReferenceNo investigation-report-di-add-component: ", this.complaintReferenceNo);
    this.invReportFormGroup.controls['complaintReferenceNo'].setValue(this.complaintReferenceNo);
  }//end of the method

  //method to get system date
  private getSystemDate() {
    //formatting the current date
    let date = new Date();
    let currentDate: string = this.datePipe.transform(date, 'dd-MM-yyyy');
    this.invReportFormGroup.controls['investigationReportDate'].setValue(currentDate);
  }//end of method

  //method to get invitemgrid det
  private getInvItemGridDet() {
    //if selected items grid length is greater than zero setSelectItemsGrid method will invoked
    if (this.investigationReportInvoiceDetailsService && this.investigationReportInvoiceDetailsService.selectedItemDetails) {
      let selItemsDet : any =  {};
      selItemsDet = this.investigationReportInvoiceDetailsService.selectedItemDetails;
      let items: any = [];
      items = selItemsDet.items;
      console.log(" items ==================== ", items);
      this.setSelectItemsGrid(items);
      // //for setting selected items grid row
      // this.setSelectItemsGrid(selItemsDet);
    }//end of if
  }//end of method

  //start method of setSelectItemsGrid
  private setSelectItemsGrid(selItemsParam: any[]){
    let selItems: any [] = selItemsParam;
    selItems.forEach(selItm => {
      this.selectedInvItemDetails.push(selItm);
    });

    console.log(" this.selectedInvItemDetails ======",this.selectedInvItemDetails);
  }//end method of setSelectItemsGrid

  //method to get investigation report details by service call
  private getInvestigationViewDetailsWSCall() {
    // let pageCompStatus: number = 40;
    let prevCompStatus: number = 10;
    this.complaintDIService.getComplainViewDetails(this.complaintReferenceNo, prevCompStatus).
      subscribe(res => {
        //console.log("res of ref det::::",res);
        if (res.msgType === "Info") {
          let invReportDeatilsJson: any = JSON.parse(res.mapDetails);
          this.invReportDetails = invReportDeatilsJson;
          console.log("res of inv Report Deatils::::", this.invReportDetails);
          this.invReportIndex = this.invReportDetails ? this.invReportDetails.length - 1 : 0;
          let pageActivityId: number = 10;
          let complaintDetailsAutoId: number = this.invReportDetails[this.invReportIndex].complaintDetailAutoId;
          this.getInvoiceItemDetailWSCall(this.complaintReferenceNo,pageActivityId,complaintDetailsAutoId);
          //this.setFormValue();
        } else {
          this.busySpinner = false;
        }//end of else if
      },
        err => {
          console.log(err);
          this.busySpinner = false;
          this.sessionErrorService.routeToLogin(err._body);
        });
  }//end of method

  //start method getInvoiceItemDetailWSCall to get item details
  private getInvoiceItemDetailWSCall(complaintReferenceNo: string, pageActivityId: number, complaintDetailsAutoId: number) {
    this.busySpinner = true;
    this.complaintDIService.getInvoiceItemDetail(complaintReferenceNo, pageActivityId,complaintDetailsAutoId).
      subscribe(res => {
        if (res.msgType === "Info") {
          let invItemDeatilsJson: any = JSON.parse(res.mapDetails);
          this.invItemDetails = invItemDeatilsJson;
          this.busySpinner = false;
          console.log("item details =========.........>>>>>>>>>", this.invItemDetails);
          this.invReportFormGroup.controls['customerCode'].setValue(this.invItemDetails[0].customerCode);
          this.invReportFormGroup.controls['customerName'].setValue(this.invItemDetails[0].customerName);
        }else{
          this.busySpinner = false;
        }
      },
        err => {
          console.log(err);
          this.busySpinner = false;
          this.sessionErrorService.routeToLogin(err._body);
        });
  }//end method of getInvoiceItemDetailWSCall

  //start method setFormValue to set the value in invreport form
  private setFormValue() {
    let formData: any = this.invReportDetails[this.invReportIndex];
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
    
    if (formData.investigationReportDate) {
      this.invReportFormGroup.controls['investigationReportDate'].setValue(this.datePipe.transform(formData.investigationReportDate, 'dd-MM-yyyy'));
    } else {
      this.invReportFormGroup.controls['investigationReportDate'].setValue(formData.investigationReportDate);
    }//end of else of inv report date value
  }//end method setFormValue

   //onOpenModal for opening modal from modalService
   private onOpenModal(complaintReferenceNo: string, msgBody: string) {
    const modalRef = this.modalService.open(NgbdModalComponent);
    modalRef.componentInstance.modalTitle = 'Complaint Reference Number: ' + complaintReferenceNo;//'Information';
    modalRef.componentInstance.modalMessage = msgBody;
  }//end of method onOpenModal

  //start method deleteInvoiceItemDetailWSCall to delete item details
  private deleteInvoiceItemDetailWSCall() {
    let activityId: number = 40;
    this.busySpinner = true;
    let complaintDetailsAutoId: number = this.invItemDetails[0].complaintDetailsAutoId
    this.complaintDIService.deleteInvoiceItemDetail(this.plantType, this.complaintReferenceNo, complaintDetailsAutoId, activityId).
      subscribe(res => {
        if (res.msgType === "Info") {
          console.log("delete item msg====   ", res.msg);
          this.busySpinner = false;
        }//end of if
      },
        err => {
          console.log(err);
          this.busySpinner = false;
          this.sessionErrorService.routeToLogin(err._body);
        });
  }//end of the method

  //start method postInvoiceItemDetailWsCall to post item details
  private postInvoiceItemDetailWsCall() {
    this.busySpinner = true;
    let items: any[] = [];
    this.invItemDetails.forEach( invItmDet=> {
      items.push(invItmDet);
    });
    this.selectedInvItemDetails.forEach(selInvItmDet => {
      items.push(selInvItmDet);
    });
    console.log(" total itemssssss::::::",items);
    this.complaintDIService.postInvoiceItemDetail(items,this.plantType).
      subscribe(res => {
        if (res.msgType === 'Info') {
          console.log("submit item msg====   ", res.msg);
        }//end of if of msgType Info
      },
        err => {
          console.log(err);
          this.busySpinner = false;
          this.sessionErrorService.routeToLogin(err._body);
        });
  }//end of the method of postInvoiceItemDetailWsCall

  //start method uploadInvoiceItemDetails
  private uploadInvoiceItemDetails(){
    //this.deleteInvoiceItemDetailWSCall();
    this.postInvoiceItemDetailWsCall();
  }//end of the method uploadInvoiceItemDetails

  //start method of submitInvReportDIDetWSCall to submit invReport details
  private submitInvReportDIDetWSCall(invReportHeaderJson: any, invReportDetailJson: any, action: string){
    this.busySpinner = true;
    this.complaintDIService.putHeader(invReportHeaderJson, this.plantType, action).
      subscribe(res => {
        if (res.msgType === 'Info') {
          invReportDetailJson.complaintReferenceNo = res.value;
          this.complaintDIService.postDetail(invReportDetailJson, this.plantType, action).
            subscribe(res => {
              if (res.msgType === 'Info') {
                console.log(" complain submitted successfully");
              }
              this.busySpinner = false;
              this.onOpenModal(res.value,res.msg);
            },
              err => {
                console.log(err);
                this.busySpinner = false;
                this.sessionErrorService.routeToLogin(err._body);
              });
        }//end of if of msgType Info

      },
        err => {
          console.log(err);
          this.busySpinner = false;
          this.sessionErrorService.routeToLogin(err._body);
        });
  }//end of the method of submitInvReportDIDetWSCall

  //start method deleteSelInvDetFromAllInvDetArr for deleting the ivoice details from selected invoice data grid array
  private deleteSelInvDetFromSelInvDetArr(selectedInvDetParam: any) {
    console.log(" SelInvDetails before splice ", this.selectedInvItemDetails);
    let indexCount: number = 0;
    for (let selInvDet of this.selectedInvItemDetails) {
      if (selInvDet.invoiceNo == selectedInvDetParam.invoiceNo && selInvDet.itemCode == selectedInvDetParam.itemCode && selInvDet.complaintTypeDesc == selectedInvDetParam.complaintTypeDesc && selInvDet.natureOfComplaintDesc == selectedInvDetParam.natureOfComplaintDesc) {
        this.selectedInvItemDetails.splice(indexCount, 1);
        break;
      }//end of if
      indexCount++;
    }//end of for
    console.log(" SelInvDetails after splice ", this.selectedInvItemDetails);
  }//end of the method deleteSelInvDetFromSelInvDet


  //on click investigationReportDISubmit method
  public investigationReportDISubmit(): void {
    let invReportHeaderJson: any = {};
    invReportHeaderJson.lastActivityId = this.activityId;
    invReportHeaderJson.userId = this.localStorageService.user.userId;
    invReportHeaderJson.complaintReferenceNo = this.invReportFormGroup.value.complaintReferenceNo;
    console.log(" invReportHeaderJson =========", invReportHeaderJson);
    let action: string = "";
    let invReportDetailJson: any = {};
    invReportDetailJson.activityId = this.activityId;
    invReportDetailJson.userId = this.localStorageService.user.userId;
    console.log("invReportFormGroup: ", this.invReportFormGroup.value);
    invReportDetailJson.complaintReferenceNo = this.invReportFormGroup.value.complaintReferenceNo;
    invReportDetailJson.investigationReportDate = this.invReportFormGroup.value.investigationReportDate;
    invReportDetailJson.sampleCollected = this.invReportFormGroup.value.sampleCollected;
    invReportDetailJson.sampleCollectedDate = this.invReportFormGroup.value.sampleCollectedDate;
    invReportDetailJson.siteVisitMade = this.invReportFormGroup.value.siteVisit;
    invReportDetailJson.siteVisitMadeDate = this.invReportFormGroup.value.siteVisitDt;

    let unloadingEquipment: string = "";
    this.unloadingEquipmentList.forEach(unloadingEquip => {
      unloadingEquipment = unloadingEquipment ? (unloadingEquipment + "," + unloadingEquip) : unloadingEquip;
    });
    console.log("unloadingEquipment ======== ", unloadingEquipment);
    invReportDetailJson.unloadingEquipement = unloadingEquipment;

    let lubricantUsed: string = "";
    this.lubricantUsedList.forEach(lbUsed => {
      lubricantUsed = lubricantUsed ? (lubricantUsed + "," + lbUsed) : lbUsed;
    });
    console.log("lubricantUsed ======== ", lubricantUsed);
    invReportDetailJson.lubricantUsed = lubricantUsed;

    let layingPosition: string = "";
    this.layingPositionList.forEach(layPos => {
      layingPosition = layingPosition ? (layingPosition + "," + layPos) : layPos;
    });
    console.log("layingPosition ======== ", layingPosition);
    invReportDetailJson.layingPosition = layingPosition;

    let jointingType: string = "";
    this.jointingTypeList.forEach(jType => {
      jointingType = jointingType ? (jointingType + "," + jType) : jType;
    });
    console.log("jointingType ======== ", jointingType);
    invReportDetailJson.jointingType = jointingType;

    console.log("invReportDetailJson====== ", invReportDetailJson);

    this.submitInvReportDIDetWSCall(invReportHeaderJson,invReportDetailJson,action);//calling the me
    this.uploadInvoiceItemDetails();

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

  //start method of onclickUnloadingEquipmentSelect
  public onclickUnloadingEquipmentSelect(paramId) {
    if (this.unloadingEquipmentList.length === 0) {
      this.unloadingEquipmentList.push(paramId);
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.unloadingEquipmentList) {
        if (data == paramId) {
          this.unloadingEquipmentList.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing unloadingEquipmentList items : ", this.unloadingEquipmentList);
      if (!removeFlag) {
        this.unloadingEquipmentList.push(paramId);
      }//end of if
      console.log("after pushing unloadingEquipmentList items : ", this.unloadingEquipmentList);
    }//end of else

  }//end of onclickUnloadingEquipmentSelect

  // start method of onclickLubricantUsedSelect
  public onclickLubricantUsedSelect(paramId) {
    if (this.lubricantUsedList.length === 0) {
      this.lubricantUsedList.push(paramId);
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.lubricantUsedList) {
        if (data == paramId) {
          this.lubricantUsedList.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing lubricantUsedList items : ", this.lubricantUsedList);
      if (!removeFlag) {
        this.lubricantUsedList.push(paramId);
      }//end of if
      console.log("after pushing lubricantUsedList items : ", this.lubricantUsedList);
    }//end of else
  }//end method of onclickLubricantUsedSelect

  // start method onclickLayingPositionSelect
  public onclickLayingPositionSelect(paramId) {
    if (this.layingPositionList.length === 0) {
      this.layingPositionList.push(paramId);
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.layingPositionList) {
        if (data == paramId) {
          this.layingPositionList.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing layingPositionList items : ", this.layingPositionList);
      if (!removeFlag) {
        this.layingPositionList.push(paramId);
      }//end of if
      console.log("after pushing layingPositionList items : ", this.layingPositionList);
    }//end of else
  }//end method of onclickLayingPositionSelect

  // start method onclickJointingTypeListSelect
  public onclickJointingTypeListSelect(paramId) {
    if (this.jointingTypeList.length === 0) {
      this.jointingTypeList.push(paramId);
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.jointingTypeList) {
        if (data == paramId) {
          this.jointingTypeList.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing jointingTypeList items : ", this.jointingTypeList);
      if (!removeFlag) {
        this.jointingTypeList.push(paramId);
      }//end of if
      console.log("after pushing jointingTypeList items : ", this.jointingTypeList);
    }//end of else
  }//end of method onclickJointingTypeListSelect

  //start method selectData
  public selectData(invRepIndex: number) {
    this.busySpinner = true;
    this.invReportIndex = invRepIndex;
    this.setFormValue();
    setTimeout(() => {
      this.busySpinner = false;
    }, 500);
  }//end method of selectData

  //onOpenModal for opening modal from modalService
  public onItemsOpenModal() {
    const modalRef = this.modalService.open(NgbdComplaintReferenceNoModalComponent);
    modalRef.componentInstance.modalTitle = this.title;
    let customerCode: string = this.invReportFormGroup.value.customerCode;
    this.investigationReportInvoiceDetailsService.custCode = customerCode;
    let customerName: string = this.invReportFormGroup.value.customerName;
    this.investigationReportInvoiceDetailsService.custName = customerName;
    this.investigationReportInvoiceDetailsService.compRefNo = this.complaintReferenceNo;
    this.investigationReportInvoiceDetailsService.complaintStatus = this.complaintStatus;
    let items: any = [];
    items = this.selectedInvItemDetails;
    let selItemsDet : any =  {};
      selItemsDet.items = items;
    this.investigationReportInvoiceDetailsService.selectedItemDetails = selItemsDet;
  }//end of method onOpenModal

  // start method of onCloseInvoiceNo
  public onCloseInvoiceNo(selectedInvDet: any){
    this.deleteSelInvDetFromSelInvDetArr(selectedInvDet);
  }//end of the method of onCloseInvoiceNo

}//end of class