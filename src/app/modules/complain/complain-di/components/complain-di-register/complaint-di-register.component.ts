/* tslint:disable: member-ordering forin */
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormControl, MaxLengthValidator } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { ComplaintDIRegisterDataService } from '../../services/complaint-di-register-data.service';
import { NgbdModalComponent } from '../../../../widget/modal/components/modal-component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ComplaintDIService } from '../../../../shared/services/complaint-di.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgbdComplaintDIRegisterModalComponent } from './complaint-di-register-modal/complaint-di-register-modal.component';
import { ComplaintDIRegisterEmitService } from '../../services/complaint-di-register-emit.service';
import { ComplaintDIInvoiceDetailsService } from '../../services/complaint-di-invoice-details.service';
import { SessionErrorService } from '../../../../shared/services/session-error.service';
import { ComplaintDIConfigModel } from '../../models/complain-di-config.model';
import { IcomplainRegDIDbFieldMaxLength } from '../../models/complain-reg-di.model';
@Component({
  selector: 'ispl-complaint-di-register-form',
  templateUrl: 'complaint-di-register.component.html',
  styleUrls: ['complaint-di-register.component.css']
})
export class ComplaintDIRegisterComponent implements OnInit {

  // private formData: FormData = new FormData();
  private compRegDbMaxLength: IcomplainRegDIDbFieldMaxLength = {
    invoiceNoLength: this.localStorageService.dbSettings.invoiceNo,
    contactPersonNameLength: this.localStorageService.dbSettings.contactPersonName,
    contactPersonEmailIdLength: this.localStorageService.dbSettings.contactPersonEmailId,
    contactPersonPhoneNoLength: this.localStorageService.dbSettings.contactPersonPhoneNo,
    complaintDetailsLength: this.localStorageService.dbSettings.complaintDetails,
    batchNoInInvoiceDetailsLength: this.localStorageService.dbSettings.batchNoInInvoiceDetails
  };

   //busySpinner 
   public busySpinner: boolean = true;

  //activity Id for complain register
  private activityId: number = 10;

  //to store customer details
  private empInfo: any = {
    empId: this.localStorageService.user.employeeId,
    empName: this.localStorageService.user.userDisplayName
  };

  private invData: any = {};//interface
  private complaintTypeId: string;

  // form data for file upload
  private fileData: FormData;
  public fileList: FileList;
  private items: any[] = [];
  private complaintTypeName: string;
  private natureCmpName: string;

  //create a formgroup for complain reg
  public complaintRegisterFormGroup = new FormGroup({
    modeId: new FormControl({ value: '' }, Validators.required),
    officialDocNo: new FormControl('', Validators.maxLength(3)),
    complaintReferenceDt: new FormControl(''),
    batchNo: new FormControl(''),
    contactPersonName: new FormControl(''),
    contactPersonPhoneNo: new FormControl('', Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
    contactPersonEmailId: new FormControl('', Validators.email),
    loggedBy: new FormControl(''),
    loggedOnDt: new FormControl(''),
    complaintTypeId: new FormControl({ value: '' }, Validators.required),
    natureOfComplaintId: new FormControl({ value: '' }, Validators.required),
    complaintDetails: new FormControl(''),
    siteVisit: new FormControl({ value: '' }, Validators.required),
    siteVisitByDepartmentName: new FormControl('')
  });

  public title: string = "Complaint Register";//set title
  public errorMsgObj: any = {
    errorMsg: '',
    errMsgShowFlag: false
  };

  public modeOfReceiptDropDownList: any = [];
  public complaintTypeDropDownList: any[] = [];
  public natureOfComDropDownList: any = [];

  //variable used for radio button
  public siteVisitValue: string = "";
  public invoiceNo: string;

  public buttonEnable: boolean = true;
  public submitButtonEnable: boolean = true;

  public complaintReferenceNo: string;//to get complaint reference no from route param
  // public selectedComplaintReferenceDetails: any = {};//to get selected complaint values  

  public selectedItemDetails: any[] = [];
  //to store the itemsHeader
  public itemsHeader: any = {};
  public complaintDetailsEnable: boolean = false;
  //for complaint qty error
  public complaintQtyInMtrsError: boolean = true;
  //to store  selected items grid row
  public selectedItemsGrid: any[] = [];
  //to store customer details
  public custInfo: any = { custCode: '', custName: '', custSegment: '', salesGroup: '', salesOffice: '' };
  public departmentNameDropDownList: any[] = [];//for department name dropdown
  public invReportTable: any[] = [];//to store prev inv report
  //
  public complaintStatus = '10';

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private complaintDIService: ComplaintDIService,
    private complaintDIRegisterDataService: ComplaintDIRegisterDataService,
    private complaintDIRegisterEmitService: ComplaintDIRegisterEmitService,
    private complaintDIInvoiceDetailsService: ComplaintDIInvoiceDetailsService,
    private datePipe: DatePipe,
    private localStorageService: LocalStorageService,
    private sessionErrorService: SessionErrorService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getRouteParam();//to get route param
    this.invReportTable = new ComplaintDIConfigModel().prevComplainHeader;//getting prev complain report details  
    this.getItemsVal("ispl");//get item header by ws call   
    this.getAllDropDownVal();//ws call to get all dropdown val
    this.getDepartmentNameValues();//method to get department name value
    this.getSystemDate();//method to get system date
    this.setInitialNatureOfCompVal();//to set nature of complain val
    //calling event emit service method
    this.getModalResultEventEmitter();
    this.getInvDet();//method to get inv det
    this.getInvItemGridDet();//method to get inv item grid
    this.complaintQtyErrorCheck();//to check complain qty error
    this.complaintRegisterFormGroup.controls["loggedBy"].setValue(this.empInfo.empName);//set emp name to control
  }//end of ngOnInit

  //method to get route param
  private getRouteParam() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
    });
    console.log("complaintReferenceNo for modify Complaint di: ", this.complaintReferenceNo);
  }//end of method to get route param

  //method to get system date
  private getSystemDate() {
    //formatting the current date
    let date = new Date();
    let currentDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.complaintRegisterFormGroup.controls["loggedOnDt"].setValue(currentDate);
    this.complaintRegisterFormGroup.controls["complaintReferenceDt"].setValue(currentDate);

  }//end of method

  //method to set nature of complain 'select'
  private setInitialNatureOfCompVal() {
    this.natureOfComDropDownList = [
      { Key: '', Value: '-- Select --' }
    ]
    for (let natureCmp of this.natureOfComDropDownList) {
      if (natureCmp.Key === "") {
        this.complaintRegisterFormGroup.controls["natureOfComplaintId"].setValue(natureCmp.Key);
        break;
      }//end if
    }//end for
  }//end of method

  //start method of getDepartmentNameValues
  private getDepartmentNameValues() {
    this.departmentNameDropDownList.push({ key: "", value: "-- Select --" });
    this.departmentNameDropDownList.push({ key: "SELF", value: "SELF" });
    this.departmentNameDropDownList.push({ key: "QA", value: "QA" });
    this.departmentNameDropDownList.push({ key: "OTHERS", value: "OTHERS" });
  }//end method of getDepartmentNameValues

  //method to getinv det
  private getInvDet() {
    console.log(" invoiceDetails===>", this.complaintDIInvoiceDetailsService.invoiceDetails);
    let invDet: any;
    console.log("this.complaintDIInvoiceDetailsService.testVar=====>>>>>>>>>", this.complaintDIInvoiceDetailsService.testVar)
    if (!this.complaintDIInvoiceDetailsService.testVar) {
      this.clearInvDetService();
    }//end of if
    //invoice Search deatails model value is not undefined then setInvDet method will be invoked
    if (this.complaintDIInvoiceDetailsService && this.complaintDIInvoiceDetailsService.invoiceDetails) {
      invDet = this.complaintDIInvoiceDetailsService.invoiceDetails;
      this.setInvDet(invDet);
    }//end of if
  }//end of method

  //method to get invitemgrid det
  private getInvItemGridDet() {
    //if selected items grid length is greater than zero setSelectItemsGrid method will invoked
    if (this.complaintDIInvoiceDetailsService && this.complaintDIInvoiceDetailsService.selectedItemDetails) {
      let selItemsDet = this.complaintDIInvoiceDetailsService.selectedItemDetails;
      //for setting selected items grid row
      this.setSelectItemsGrid(selItemsDet);
    }//end of if
  }//end of method


  //method to refesh the grid after closing the modal
  private getModalResultEventEmitter() {
    // this.getErrorInItemGrid();
    this.complaintDIRegisterEmitService.getModalResultEventEmitter().
      subscribe(selectedItemDetailsRes => {
        console.log(" eventEmitter res : ", selectedItemDetailsRes);
        if (this.selectedItemDetails.length == 0) {
          for (let selectedDetRes of selectedItemDetailsRes) {
            this.selectedItemDetails.push({ key: selectedDetRes.key, value: selectedDetRes.value });
          }//end of for
        } else {
          for (let selectedDetRes of selectedItemDetailsRes) {
            this.getDistinctKeyValuePairOfSelectedItmsGrid(selectedDetRes)
          }//end of for 
        }//end of else
        if (this.selectedItemDetails.length > 0) {
          this.setCustInforOnEventEmit(this.selectedItemDetails);
        }
      },
        err => {
          console.log(err);
          this.sessionErrorService.routeToLogin(err._body);
        });
  }//end of event emiiter result

  //start method for getting distinct key value pair map of selected item grid 4.11.17
  getDistinctKeyValuePairOfSelectedItmsGrid(selectedDetRes: any) {
    let prevKey: string = "";
    let lastKey: string = "";
    for (let selectedDet of this.selectedItemDetails) {
      if (selectedDetRes.key == selectedDet.key) {
        let selectedItemFromRes: any[] = selectedDetRes.value.selectedItem;
        if (selectedItemFromRes.length > 0) {
          selectedDet.value.selectedItem = [];
          selectedDet.value.selectedItem = selectedItemFromRes;
          break;
        }
      } else if (selectedDetRes.key != selectedDet.key) {
        prevKey = selectedDet.key;
        lastKey = this.selectedItemDetails[this.selectedItemDetails.length - 1].key;
        if (prevKey != selectedDetRes.key && lastKey == prevKey) {
          this.selectedItemDetails.push({ key: selectedDetRes.key, value: selectedDetRes.value });
          break;
        }//end of if
      }//end of else if
    }//end of for
  }//end of the method

  //start method of setCustInforOnEventEmit
  private setCustInforOnEventEmit(selectedItemDetailsParam: any[]) {
    //let selectedItemDet : any[] = selectedItemDetailsParam;
    this.selectedItemsGrid = [];
    for (let selectedDet of selectedItemDetailsParam) {
      for (let selItm of selectedDet.value.selectedItem) {
        this.custInfo.custCode = selItm.customerCode;
        this.custInfo.custName = selItm.customerName;
        this.custInfo.custSegment = selItm.customerSegment;
        this.custInfo.salesGroup = selItm.salesGroup;
        this.custInfo.salesOffice = selItm.salesOffice;
        this.selectedItemsGrid.push(selItm);
        // this.contactPersonNameForModify = selItm.customerContactPersonName;
        // this.contactPersonPhoneNoForModify = selItm.customerContactPersonPhoneNo;
        // this.contactPersonEmailIdForModify = selItm.customerContactPersonEmailId;
      }//end of for
    }//end of for
    this.complaintDIInvoiceDetailsService.custCode = this.custInfo.custCode;
    this.complaintQtyErrorCheck();
  }//end of the method setCustInforOnEventEmit

  //method to get all values from ComplaintDIRegisterDataService  
  private getAllDropDownVal() {
    this.busySpinner = true;
    //getting all values of ReceiptMode 
    this.complaintDIRegisterDataService.getSelectValReceiptMode().
      subscribe(res => {
        this.modeOfReceiptDropDownList = res.details;

        for (let receipt of this.modeOfReceiptDropDownList) {
          if (receipt.Key == "") {
            this.complaintRegisterFormGroup.controls["modeId"].setValue(receipt.Key);
            break;
          }//end if
        }//end for
        this.busySpinner = false;
      },
        err => {
          console.log(err);
          this.busySpinner = false;
          this.sessionErrorService.routeToLogin(err._body);
        });

    //getting all values of complaintType
    this.complaintDIRegisterDataService.getSelectComplaintType().
      subscribe(res => {
        this.complaintTypeDropDownList = res.details;
        for (let cmpType of this.complaintTypeDropDownList) {
          if (cmpType.Key == "") {
            this.complaintRegisterFormGroup.controls["complaintTypeId"].setValue(cmpType.Key);
            break;
          }//end if
        }//end for
        this.busySpinner = false;
      },
        err => {
          console.log(err);
          this.busySpinner = false;
          this.sessionErrorService.routeToLogin(err._body);
        });

  }//end method getAllDropDownVal

  //start method tableGridDataConverterFromRes for creating table grid json array from res 
  private tableGridDataConverterFromRes(resItemsParam) {
    let disInvNoArr: string[] = [];
    let selectedItem: any[] = [];
    let invNo: string = "";
    let itemDets: any = {};
    for (let selectedDetRes of resItemsParam) {
      if (disInvNoArr.length == 0) {
        disInvNoArr.push(selectedDetRes.invoiceNo);
        invNo = selectedDetRes.invoiceNo;
      } else {
        if (disInvNoArr.includes(selectedDetRes.invoiceNo) == false) {
          disInvNoArr.push(selectedDetRes.invoiceNo);
        }
      }
    }
    console.log(" disInvNoArr ====>", disInvNoArr);
    disInvNoArr.forEach(invNo => {
      resItemsParam.forEach(selectedDetRes => {
        if (invNo == selectedDetRes.invoiceNo) {
          selectedItem.push(selectedDetRes);
        }
      });
      if (selectedItem.length > 0) {
        this.invMapArr(invNo, selectedItem);
        selectedItem = [];
      }
    });
  }// end method tableGridDataConverterFromRes

  //start method invMapArr
  private invMapArr(invNo, selectedItem) {
    let itemDets: any = {};
    itemDets.selectedItem = selectedItem;
    this.selectedItemDetails.push({ key: invNo, value: itemDets });
    console.log(" this.selectedItemDetails=====.>>>>>>  ", this.selectedItemDetails);
  }//end of the method invMapArr

  //start method setInvDetsForInvNoSearch for storing the invoice Details to invoice details model
  private setInvDetsForInvNoSearch() {
    console.log(this.complaintRegisterFormGroup.value);
    if (this.complaintReferenceNo) {
      this.complaintDIInvoiceDetailsService.compRefNo = this.complaintReferenceNo;
    }
    let invDet: any = {};
    // invDet.departmentNameOther = this.complaintRegisterFormGroup.value.departmentNameOther;
    // invDet.complaintReceivedByName = this.complaintRegisterFormGroup.value.complaintReceivedByName;
    // invDet.complaintReceivedByPhoneNo = this.complaintRegisterFormGroup.value.complaintReceivedByPhoneNo;
    invDet.modeId = this.complaintRegisterFormGroup.value.modeId;
    //invDet.modeReferenceNo = this.complaintRegisterFormGroup.value.modeReferenceNo;

    invDet.complaintReferenceDt = this.complaintRegisterFormGroup.value.complaintReferenceDt;
    invDet.contactPersonName = this.complaintRegisterFormGroup.value.contactPersonName;
    invDet.contactPersonPhoneNo = this.complaintRegisterFormGroup.value.contactPersonPhoneNo;
    invDet.contactPersonEmailId = this.complaintRegisterFormGroup.value.contactPersonEmailId;
    invDet.complaintTypeId = this.complaintRegisterFormGroup.value.complaintTypeId;
    invDet.complaintTypeName = this.complaintTypeName;
    invDet.natureOfComplaintId = this.complaintRegisterFormGroup.value.natureOfComplaintId;
    invDet.complaintDetails = this.complaintRegisterFormGroup.value.complaintDetails;
    invDet.loggedOnDt = this.complaintRegisterFormGroup.value.loggedOnDt;
    invDet.siteVisit = this.complaintRegisterFormGroup.value.siteVisit;
    invDet.siteVisitBy = this.complaintRegisterFormGroup.value.siteVisitBy;
    invDet.siteVisitByDepartmentName = this.complaintRegisterFormGroup.value.siteVisitByDepartmentName;

    this.complaintDIInvoiceDetailsService.invoiceDetails = invDet;

    let items: any[] = [];
    items = this.selectedItemsGrid;

    let selectedItemsDet: any = {};

    selectedItemsDet.items = items;
    this.complaintDIInvoiceDetailsService.selectedItemDetails = selectedItemsDet;

    for (let selItm of this.selectedItemsGrid) {
      this.custInfo.custCode = selItm.customerCode;
      this.custInfo.custName = selItm.customerName;
      this.custInfo.salesGroup = selItm.salesGroup;
      this.custInfo.salesOffice = selItm.salesOffice;
      break;
    }

    this.complaintDIInvoiceDetailsService.title = this.title;
    this.complaintDIInvoiceDetailsService.custCode = this.custInfo.custCode;
    this.complaintDIInvoiceDetailsService.custName = this.custInfo.custName;
    this.complaintDIInvoiceDetailsService.salesGroup = this.custInfo.salesGroup;
    this.complaintDIInvoiceDetailsService.salesOffice = this.custInfo.salesOffice;
    this.complaintDIInvoiceDetailsService.testVar = "data stored";
  }//end of the method setInvDetsForInvNoSearch

  // start method setInvDet for setting invDet from invoiceDetails model
  private setInvDet(invDetParam) {
    let invDet = invDetParam;
    if (this.complaintDIInvoiceDetailsService && this.complaintDIInvoiceDetailsService.compRefNo) {
      this.complaintReferenceNo = this.complaintDIInvoiceDetailsService.compRefNo;
    }

    let complaintReferenceDate: string = invDet.complaintReferenceDt;
    if (complaintReferenceDate) {
      this.complaintRegisterFormGroup.controls["complaintReferenceDt"].setValue(complaintReferenceDate);
    }


    this.invData.modeId = invDet.modeId;
    if (this.invData.modeId) {
      this.complaintRegisterFormGroup.controls["modeId"].setValue(this.invData.modeId);
    }

    this.invData.complaintTypeId = invDet.complaintTypeId;
    this.invData.natureOfComplaintId = invDet.natureOfComplaintId;
    this.invData.complaintTypeName = invDet.complaintTypeName;
    this.invData.complaintDetails = invDet.complaintDetails.trim();
    if (this.invData.complaintDetails) {
      this.complaintRegisterFormGroup.controls["complaintDetails"].setValue(this.invData.complaintDetails);
    }
    if (this.invData.complaintTypeId) {
      this.complaintRegisterFormGroup.controls["complaintTypeId"].setValue(this.invData.complaintTypeId);
      if (this.invData.natureOfComplaintId) {
        this.onComplaintTypeSelect(null, this.invData.complaintTypeId, this.invData.natureOfComplaintId);
      } else {
        this.onComplaintTypeSelect(null, this.invData.complaintTypeId);
      }
    }
    this.getCompDetValidations(this.complaintTypeName, this.invData.complaintDetails);


    this.invData.contactPersonName = invDet.contactPersonName;
    if (this.invData.contactPersonName) {
      this.complaintRegisterFormGroup.controls["contactPersonName"].setValue(this.invData.contactPersonName);
    }

    this.invData.contactPersonPhoneNo = invDet.contactPersonPhoneNo;
    if (this.invData.contactPersonPhoneNo) {
      this.complaintRegisterFormGroup.controls["contactPersonPhoneNo"].setValue(this.invData.contactPersonPhoneNo);
    }

    this.invData.contactPersonEmailId = invDet.contactPersonEmailId;
    if (this.invData.contactPersonEmailId) {
      this.complaintRegisterFormGroup.controls["contactPersonEmailId"].setValue(this.invData.contactPersonEmailId);
    }

    this.siteVisitValue = invDet.siteVisit;
    if (this.siteVisitValue) {
      this.complaintRegisterFormGroup.controls["siteVisit"].setValue(this.siteVisitValue);
    }

    this.invData.siteVisitByDepartmentName = invDet.siteVisitByDepartmentName;
    if (this.invData.siteVisitByDepartmentName) {
      this.complaintRegisterFormGroup.controls["siteVisitByDepartmentName"].setValue(this.invData.siteVisitByDepartmentName);
    }

    this.invData.siteVisitBy = invDet.siteVisitBy;
    if (this.invData.siteVisitBy) {
      this.complaintRegisterFormGroup.controls["siteVisitBy"].setValue(this.invData.siteVisitBy);
    }

    //setting the invoiceDetails value as blank
    this.complaintDIInvoiceDetailsService.invoiceDetails = "";

  }//end of the method setInvDet


  private setSelectItemsGrid(selItemsDetParam) {
    if (selItemsDetParam.items.length != 0) {
      let items: any[] = selItemsDetParam.items;

      for (let selItm of items) {
        this.custInfo.custCode = selItm.customerCode;
        this.custInfo.custName = selItm.customerName;
        this.custInfo.custSegment = selItm.customerSegment;
        this.custInfo.salesGroup = selItm.salesGroup;
        this.custInfo.salesOffice = selItm.salesOffice;
        // this.contactPersonNameForModify = selItm.customerContactPersonName;
        // this.contactPersonPhoneNoForModify = selItm.customerContactPersonPhoneNo;
        // this.contactPersonEmailIdForModify = selItm.customerContactPersonEmailId;
        break;
      }
      this.complaintDIInvoiceDetailsService.custCode = this.custInfo.custCode;
      this.complaintDIInvoiceDetailsService.custName = this.custInfo.custName;
      this.complaintDIInvoiceDetailsService.salesGroup = this.custInfo.salesGroup;
      this.complaintDIInvoiceDetailsService.salesOffice = this.custInfo.salesOffice;
      //storing the inv details which are selected
      this.selectedItemsGrid = items;

      //calling  method tableGridDataConverterFromRes for creating table grid json array from res and passing the res as parameter
      this.tableGridDataConverterFromRes(this.selectedItemsGrid);
    }//end of if
  }

  //to get compDet validations after returning from invoice search page
  private getCompDetValidations(compTypeName: string, compDet: string) {
    console.log("  getCompDetValidations method called ")
    if (compTypeName === "Others(CAT C)" && (!compDet)) {
      this.complaintRegisterFormGroup.get('complaintDetails').setValidators(Validators.required);
      this.complaintRegisterFormGroup.controls['complaintDetails'].markAsTouched();
      this.complaintRegisterFormGroup.controls['natureOfComplaintId'].markAsUntouched();
      this.complaintDetailsEnable = true;
    } else if (compTypeName != "Others(CAT C)") {
      this.complaintRegisterFormGroup.get('complaintDetails').setValidators(null)
      this.complaintRegisterFormGroup.get('complaintDetails').updateValueAndValidity();
      this.complaintRegisterFormGroup.controls['complaintDetails'].markAsUntouched();
      this.complaintDetailsEnable = false;
    }//end of else if
  }//end of the method

  // start method clearInvDetService to clear all inv det value
  private clearInvDetService() {
    this.complaintDIInvoiceDetailsService.invoiceDetails = "";
    this.complaintDIInvoiceDetailsService.selectedItemDetails = "";
    this.complaintDIInvoiceDetailsService.custCode = "";
    this.complaintDIInvoiceDetailsService.custName = "";
    this.complaintDIInvoiceDetailsService.salesOffice = "";
    this.complaintDIInvoiceDetailsService.salesGroup = "";
    this.complaintDIInvoiceDetailsService.compRefNo = "";
  }//end of the method

  //start method getItemsVal
  private getItemsVal(invoiceNo, selectedItemsId?: any[]) {
    this.complaintDIRegisterDataService.getInvoiceDetails(invoiceNo).
      subscribe(res => {
        //getting the items object array for webservice and initialing it to a publically defind array named items 
        this.itemsHeader = res.invoiceDetails.itemsHeader;
        this.busySpinner = false;
      },
        err => {
          console.log(err);
          this.busySpinner = false;
          this.sessionErrorService.routeToLogin(err._body);
        });
  }//end method of getItemsVal

  //start method complaintQtyErrorCheck
  private complaintQtyErrorCheck() {
    console.log("complaintQtyErrorCheck start===>");
    for (let selectedItmDet of this.selectedItemDetails) {
      for (let itemDet of selectedItmDet.value.selectedItem) {
        let invoiceQtyInMtrs: number = parseFloat(itemDet.invoiceQtyInMtrs);
        let complaintQtyInMtrs: number = parseFloat(itemDet.complaintQtyInMtrs);
        if (isNaN(complaintQtyInMtrs) || complaintQtyInMtrs == 0) {
          itemDet.uiInpErrFlag = true;
          itemDet.uiInpErrDesc = 'Complaint Quantity can’t be empty or zero';
          this.complaintQtyErrorCorrection();
          // this.complaintQtyInMtrsError = true;
          // break;
        } if (complaintQtyInMtrs > invoiceQtyInMtrs) {
          itemDet.uiInpErrFlag = true;
          itemDet.uiInpErrDesc = 'Complaint Quantity can’t be greater than Invoice Quantity';
          this.complaintQtyErrorCorrection();
          // this.complaintQtyInMtrsError = true;
          // break;
        } else if (complaintQtyInMtrs > 0 && complaintQtyInMtrs < invoiceQtyInMtrs && !(isNaN(complaintQtyInMtrs))) {
          itemDet.uiInpErrFlag = false;
          this.complaintQtyErrorCorrection();
        }//end of else
      }//end of for
    }//end of for
  }//end of cmpQtyerrorcheck

  //start method of complaintQtyErrorCorrection
  private complaintQtyErrorCorrection() {
    for (let selectedItmDet of this.selectedItemDetails) {
      for (let itemDet of selectedItmDet.value.selectedItem) {
        if (itemDet.uiInpErrFlag == true || itemDet.uiInpErrFlag == undefined) {
          this.complaintQtyInMtrsError = true;
          break;
        } else if (itemDet.uiInpErrFlag == false) {
          this.complaintQtyInMtrsError = false;
        }//end of else if
      }//end of for
      if (this.complaintQtyInMtrsError === true) {
        break;
      }//end of if
    }//end of for
  }//end of the method complaintQtyErrorCorrection 
  
  //onOpenModal for opening modal from modalService
  private onOpenModal(msgBody: string) {
    const modalRef = this.modalService.open(NgbdModalComponent);
    modalRef.componentInstance.modalTitle = 'Information';
    modalRef.componentInstance.modalMessage = msgBody;
  }//end of method onOpenModal

  //start method onKeyupComplaintQty
  public onKeyupComplaintQty(complaintQtyInMtrsParam, invoiceNo, itemCode, invoiceQtyInMtrsParam) {
    let flag: boolean = false;
    console.log("complaintQtyInMtrsParam===>", complaintQtyInMtrsParam);
    // let cmpQtyErr : boolean = false;
    for (let selectedItmDet of this.selectedItemDetails) {
      for (let itemDet of selectedItmDet.value.selectedItem) {
        if (itemDet.invoiceNo == invoiceNo && itemDet.itemCode == itemCode) {
          let complaintQtyInMtrs: number = parseFloat(complaintQtyInMtrsParam);
          let invoiceQtyInMtrs: number = parseFloat(invoiceQtyInMtrsParam);
          if (complaintQtyInMtrs > invoiceQtyInMtrs) {
            itemDet.uiInpErrFlag = true;
            itemDet.uiInpErrDesc = 'Complaint Quantity can’t be greater than Invoice Quantity.';
            this.complaintQtyErrorCorrection();
            break;
          } else if (isNaN(complaintQtyInMtrs) || complaintQtyInMtrs == 0) {
            itemDet.uiInpErrFlag = true;
            itemDet.uiInpErrDesc = 'Complaint Quantity can’t be empty or zero';
            this.complaintQtyErrorCorrection();
          } else if (complaintQtyInMtrs < 0) {
            itemDet.uiInpErrFlag = true;
            itemDet.uiInpErrDesc = 'Complaint Quantity can’t be less than zero';
            this.complaintQtyErrorCorrection();
          } else if (complaintQtyInMtrs > 0 && complaintQtyInMtrs <= invoiceQtyInMtrs && !(isNaN(complaintQtyInMtrs))) {
            itemDet.complaintQtyInMtrs = complaintQtyInMtrs;
            flag = true;
            itemDet.uiInpErrFlag = false;
            itemDet.uiInpErrDesc = '';
            this.complaintQtyErrorCorrection();
            break;
          }//end of else
        }//end of if
      }//end of inner for
      if (flag == true) {
        break;
      }//end of 
    }//end of outer for
    console.log(" this.selectedItemDetails onkeyup ", this.selectedItemDetails);
  }//end of the method onKeyupComplaintQty
  //method for onchanging compaintType dropdown
  public onComplaintTypeSelect(args, complaintTypeId, selectedNatureOfComplaintId?: string) {
    let compDet: string = this.complaintRegisterFormGroup.value.complaintDetails.trim();
    this.complaintTypeId = complaintTypeId;
    if (args != null) {
      this.complaintTypeName = args.target.options[args.target.selectedIndex].text;
    }
    console.log("complaintTypeId", complaintTypeId);
    console.log("selectedNatureOfComplaintId == ", selectedNatureOfComplaintId);
    if (this.complaintTypeId == "") {
      this.natureOfComDropDownList = [
        { Key: '', Value: '-- Select --' }
      ]
      this.complaintRegisterFormGroup.controls["natureOfComplaintId"].setValue("");
    } else {
      this.busySpinner = true;
      this.complaintDIRegisterDataService.getSelectValNatureOfComplaint(this.complaintTypeId).
        subscribe(res => {
          this.natureOfComDropDownList = res.details;

          for (let natureCmp of this.natureOfComDropDownList) {
            console.log(" natureCmp.Key ", natureCmp.Key);
            if (this.complaintTypeName == "Others(CAT C)" && !compDet) {
              this.complaintRegisterFormGroup.controls["natureOfComplaintId"].setValue(natureCmp.Key);
              this.complaintDetailsEnable = true;
              this.complaintRegisterFormGroup.controls['complaintDetails'].markAsTouched();
              break;
            } else if (natureCmp.Key == "" && (!selectedNatureOfComplaintId)) {
              this.complaintRegisterFormGroup.controls["natureOfComplaintId"].setValue(natureCmp.Key);
              break;
            } else if (selectedNatureOfComplaintId) {
              // (selectedNatureOfComplaintId != null || selectedNatureOfComplaintId != "" || selectedNatureOfComplaintId != undefined) {
              console.log(" selectedNatureOfComplaintId == ", selectedNatureOfComplaintId);
              if (natureCmp.Key == selectedNatureOfComplaintId) {
                this.complaintRegisterFormGroup.controls["natureOfComplaintId"].setValue(selectedNatureOfComplaintId);
                break;
              }//end of if
            }//end of else if
          }//end for
          this.busySpinner = false;
        },
          err => {
            console.log(err);
            this.busySpinner = false;
            this.sessionErrorService.routeToLogin(err._body);
          });
    }//end else
    if (this.complaintTypeName === "Others(CAT C)" && !compDet) {
      this.complaintRegisterFormGroup.get('complaintDetails').setValidators(Validators.required);
      this.complaintRegisterFormGroup.controls['complaintDetails'].markAsTouched();
      this.complaintRegisterFormGroup.controls['natureOfComplaintId'].markAsUntouched();
      this.complaintDetailsEnable = true;
    } else if (this.complaintTypeName != "Others(CAT C)") {
      this.complaintRegisterFormGroup.get('complaintDetails').setValidators(null)
      this.complaintRegisterFormGroup.get('complaintDetails').updateValueAndValidity();
      this.complaintRegisterFormGroup.controls['complaintDetails'].markAsUntouched();
      this.complaintDetailsEnable = false;
    }
  }//end of the method onComplaintTypeSelect

  // start method of onNatureTypeSelect
  public onNatureTypeSelect(args) {
    this.complaintDetailsEnable = false;
    this.natureCmpName = args.target.options[args.target.selectedIndex].text;
    console.log("natureCmpIdParam", this.natureCmpName);
    if (this.natureCmpName == "Others") {
      this.complaintDetailsEnable = true;
      this.complaintRegisterFormGroup.controls['complaintDetails'].markAsTouched();
    }
  }// end method of onNatureTypeSelect

  //start method of onKeyupBatchNo
  public onKeyupBatchNo(batchNoParam: string, invoiceNo: string, itemCode: string) {
    for (let selectedItmDet of this.selectedItemDetails) {
      for (let itemDet of selectedItmDet.value.selectedItem) {
        if (itemDet.invoiceNo == invoiceNo && itemDet.itemCode == itemCode) {
          if (batchNoParam) {
            itemDet.batchNo = batchNoParam;
          } else {
            itemDet.batchNo = "";
          }//end of else
        }//end of if
      }//end of inner for
    }//end of outer for
  }//end of the method onKeyupBatchNo

  // start method comDetsOnkeyup
  public comDetsOnkeyup(complaintDetails) {
    this.complaintDetailsEnable = false;
    console.log(" complaintDetails ", complaintDetails);
    if ((complaintDetails == "" || complaintDetails == " ") && this.complaintTypeName == "Others(CAT C)") {
      // this.complaintRegisterFormGroup.controls['natureOfComplaintId'].markAsUntouched();
      this.complaintDetailsEnable = true;
    } else if ((complaintDetails == "" || complaintDetails == " ") && this.complaintTypeName != "Others(CAT C)") {
      if (this.natureCmpName == "Others") {
        this.complaintDetailsEnable = true;
        this.complaintRegisterFormGroup.controls['complaintDetails'].markAsTouched();
      }
    }
  }//end of method comDetsOnkeyup

  //start method for closing invoice bubble and removing invoice details for the array
  public deleteItemDetOnClick(selectedInvoiceNo) {
    console.log(" this.selectedItemDetails ========== ", this.selectedItemDetails);
    let indexCount: number = 0;
    for (let selectedDet of this.selectedItemDetails) {
      if (selectedInvoiceNo == selectedDet.key) {
        this.selectedItemDetails.splice(indexCount, 1);
        break;
      }//end of if
      indexCount++;
    }//end of for
    if (this.selectedItemDetails.length == 0) {
      this.selectedItemsGrid = [];
      if (this.complaintDIInvoiceDetailsService.compRefNo == undefined || this.complaintDIInvoiceDetailsService.compRefNo == "") {
        this.custInfo.custCode = "";
        this.custInfo.custName = "";
      }
      this.custInfo.custSegment = "";
      this.custInfo.salesGroup = "";
      this.custInfo.salesOffice = "";
      this.complaintDIInvoiceDetailsService.custCode = this.custInfo.custCode;
    } else if (this.selectedItemDetails.length > 0) {
      let selectedItemObj: any[] = [];
      for (let selectedDet of this.selectedItemDetails) {
        for (let selItem of selectedDet.value.selectedItem) {
          selectedItemObj.push(selItem);
        }//end of for
      }//end of for
      this.selectedItemsGrid = selectedItemObj;
    }//end of else if
  }//end of the method deleteItemDetOnClick 

  //start method for clicking radio button 
  public onRadioClick(radioValue) {
    console.log("radioValue ", radioValue);
    this.siteVisitValue = radioValue;
    //  if siteVisitValue is Y then this if condition will be executed
    if (this.siteVisitValue == "Y") {

      this.complaintRegisterFormGroup.controls["siteVisit"].setValue(this.siteVisitValue);

      //set sitevisitby field mandatory
      this.complaintRegisterFormGroup.get('siteVisitByDepartmentName').setValidators(Validators.required);
      // this.complaintRegisterFormGroup.controls['siteVisitByDepartmentName'].markAsTouched();
    } else if (this.siteVisitValue == "N") { // siteVisitValue is N then this if condition will be executed

      this.complaintRegisterFormGroup.get('siteVisitByDepartmentName').setValidators(null);
      this.complaintRegisterFormGroup.get('siteVisitByDepartmentName').updateValueAndValidity();
      this.complaintRegisterFormGroup.controls['siteVisitByDepartmentName'].markAsUntouched();
    } // end of else
  }//end of method onRadioClick

  //file upload event  
  public fileChange(event) {
    this.fileData = new FormData();
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      for (let i: number = 0; i < this.fileList.length; i++) {
        let file: File = this.fileList[i];
        this.fileData.append('uploadFile' + i.toString(), file, file.name);
      }//end of for
    }//end of if
  }//end of filechange method

  //for clicking submit button this method will be invoked
  public onComplainSubmit(): void {
    console.log("form value::", this.complaintRegisterFormGroup.value);
    let complainHeaderJson: any = {};
    complainHeaderJson.lastActivityId = this.activityId;
    complainHeaderJson.userId = this.localStorageService.user.userId;
    console.log(" complainHeaderJson =========", complainHeaderJson);
    let plantType: string = this.localStorageService.user.plantType;
    let action: string = "reg_add";
    let complainDetailJson: any = {};
    complainDetailJson.activityId = this.activityId;
    complainDetailJson.modeId = this.complaintRegisterFormGroup.value.modeId;
    complainDetailJson.siteVisit = this.siteVisitValue;
    complainDetailJson.siteVisitByDepartmentName = this.complaintRegisterFormGroup.value.siteVisitByDepartmentName;
    complainDetailJson.complaintReferenceDt = this.complaintRegisterFormGroup.value.complaintReferenceDt;
    complainDetailJson.loggedOnDt = this.complaintRegisterFormGroup.value.loggedOnDt;
    complainDetailJson.contactPersonName = this.complaintRegisterFormGroup.value.contactPersonName;
    complainDetailJson.contactPersonPhoneNo = this.complaintRegisterFormGroup.value.contactPersonPhoneNo;
    complainDetailJson.contactPersonEmailId = this.complaintRegisterFormGroup.value.contactPersonEmailId;
    complainDetailJson.loggedBy = this.empInfo.empId;
    complainDetailJson.complaintTypeId = parseInt(this.complaintRegisterFormGroup.value.complaintTypeId);
    complainDetailJson.natureOfComplaintId = parseInt(this.complaintRegisterFormGroup.value.natureOfComplaintId);
    complainDetailJson.complaintDetails = this.complaintRegisterFormGroup.value.complaintDetails;
    complainDetailJson.custCode = this.custInfo.custCode;
    complainDetailJson.userId = this.localStorageService.user.userId;
    console.log(" complainDetailJson =========", complainDetailJson);
    this.busySpinner = true;
    this.complaintDIService.putHeader(complainHeaderJson, plantType, action).
      subscribe(res => {
        if (res.msgType === 'Info') {
          complainDetailJson.complaintReferenceNo = res.value;
          this.complaintDIService.postDetail(complainDetailJson, plantType, action).
            subscribe(res => {
              if (res.msgType === 'Info') {
                console.log(" complain submitted successfully");
              }
              this.busySpinner = false;
              this.onOpenModal(res.msg);
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
  }//end of method complainregDiSubmit  

  //onOpenModal for opening modal from modalService
  public onInvoiceNoOpenModal(invoiceNo: string) {
    const modalRef = this.modalService.open(NgbdComplaintDIRegisterModalComponent);
    modalRef.componentInstance.modalTitle = this.title;
    modalRef.componentInstance.invoiceNo = invoiceNo;
    modalRef.componentInstance.items = this.items;
    if (invoiceNo == '') {
      this.setInvDetsForInvNoSearch();
      modalRef.componentInstance.custCode = this.custInfo.custCode;
      modalRef.componentInstance.custName = this.custInfo.custName;
    } else if (invoiceNo != '') {
      this.complaintDIInvoiceDetailsService.selectedItemDetails = this.selectedItemsGrid;
      console.log("selected grid in pi reg====>>>>>", this.complaintDIInvoiceDetailsService.selectedItemDetails);
    }
  }//end of method onOpenModal

  // method to delete error msg
  public deleteResErrorMsgOnClick() {
    this.errorMsgObj.errMsgShowFlag = false;
  }//end of method to delete error msg

  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.clearInvDetService();
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method

}//end of class