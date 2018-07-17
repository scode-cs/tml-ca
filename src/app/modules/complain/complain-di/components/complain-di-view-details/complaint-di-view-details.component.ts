/* tslint:disable: member-ordering forin */
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';//to get route param
// import { ToastService } from "../../../../home/services/toast-service";
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { ComplaintDIRegisterDataService } from "app/modules/complain/complain-di/services/complaint-di-register-data.service";
import { NgbdModalComponent } from '../../../../widget/modal/components/modal-component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgbdComplaintDIRegisterModalComponent } from 'app/modules/complain/complain-di/components/complain-di-register/complaint-di-register-modal/complaint-di-register-modal.component';
import { ComplaintDIRegisterEmitService } from "app/modules/complain/complain-di/services/complaint-di-register-emit.service";
import { ComplaintDIInvoiceDetailsService } from "app/modules/complain/complain-di/services/complaint-di-invoice-details.service";
import { DIPolygonModel } from "app/modules/shared/components/process-flow/complain-di-polygon.model";
import { SessionErrorService } from "app/modules/shared/services/session-error.service";

@Component({
  selector: 'ispl-complaint-di-view-details-form',
  templateUrl: 'complaint-di-view-details.component.html',
  styleUrls: ['complaint-di-view-details.component.css']
})
export class ComplaintDIViewDetailsComponent implements OnInit {

  // form data for file upload
  private formData: FormData = new FormData();
  private fileData: FormData;
  public fileList: FileList;
  public resMsgType: string = "Info";//for showing error msg in html page
  public errorConst: string = "Error";//error constant
  public infoConstant: string = "Info";//info constant
  public resErrorMsg: string;

  public title: string = "Complaint Register";
  public complaintRegisterFormGroup: FormGroup;
  public modeOfReceiptDropDownList: any = [];
  public complaintLoggedByDropDownList: any = [];
  public complaintTypeDropDownList: any = [];
  public natureOfComDropDownList: any = [];
  public items: any[] = [];
  public complaintTypeId: string;
  public complaintTypeName: string;
  //Array for selected Item
  public checkedItemIdArr: any[] = [];
  public selectedItems: any = {};
  //for checkbox
  public otherItems: boolean = false;//for other checkbox
  public checked: number = 0;

  public selectedInvoiceNo: string;

  //variable used for radio button
  public siteVisitValue: string = "";
  public invoiceNo: string;
  //string variable for showing complain submit error msg 
  public complainSubmitError: string = "";
  //string variable for checking if the invoice no is correct or not
  public invoiceNoCheckMsg: string = "Info";
  public invoiceNoSpaceCheckMsg: string = "Info";

  //for storing max length
  public invoiveNoLength: number;
  public contactPersonNameLength : number;
  public contactPersonPhoneNoLength: number;
  public contactPersonEmailIdLength: number;
  public complaintDetailsLength: number;


  //this variables are used for Complaint Logged On and Compliant Reference Date validation
  public complaintReferenceDt: string = "Info";
  public loggedOnDt: string;
  public loggedOnDate: string;
  public complaintReferenceDate: string;
  public siteVisitDt: string = "Info";
  public siteVisitDtloggedOnDt = "Info";
  public currentDate: string;
  public currentDtloggedOnDt = "Info";
  public currentDtComplaintReferenceDt = "Info";
  //public currentDtSiteVistDt = "Info";
  public cmplntRefDtLoggedOnDtDiff = "Info";
  public loggedOnDtCmplntRefDtDiff = "Info";
  public cmplntRefDtLoggedOnDtDiffZero = "Info";
  public loggedOnDtCmplntRefDtDiffZero = "Info";
  public diffBetwnCmplntRefDtAndLoggedOnDt: number;

  public actionTakenValue: string;
  public actionTakenChecked: boolean = false;
  public buttonEnable: boolean = true;
  public submitButtonEnable: boolean = true;

  public complaintReferenceNo: string;//to get complaint reference no from route param
  public selectedComplaintReferenceDetails: any = {};//to get selected complaint values  
  public departmentNameDropDownList: any[] = [];//for department name dropdown

  //for modify complaint
  public modeIdForModify: string = "";
  public invoiceNoForModify: string = "";
  public contactPersonNameForModify: string = "";
  public contactPersonPhoneNoForModify: string = "";
  public contactPersonEmailIdForModify: string = "";
  public complaintTypeIdForModify: string = "";
  public natureOfComplaintIdForModify: string = "";
  public complaintDetailsForModify: string = "";
  public loggedByForModify: string = "";
  public loggedOnDtForModify: string = "";
  public itemNosForModify: any[] = [];
  public itemCheckboxError: boolean = false;
  public siteVisitByForModify: string = "";
  public siteVisitDtForModify: string = "";

  public selectedItemDetails: any[] = [];

  //to store the itemsHeader
  public itemsHeader: any = {};

  public complaintDetailsEnable: boolean = false;

  public fileActivityId: number = this.localStorageService.appSettings.complaintRegistrationActivityId;//to get uploaded file for DI edit

  //for complaint qty error
  public complaintQtyInMtrsError: boolean = true;
  //to store  selected items grid row
  public selectedItemsGrid: any[] = [];
  public custCode: string = "";
  public custName: string = "";
  public custSegment: string = "";
  public salesGroup: string = "";
  public salesOffice: string = "";
  //var to check index for process flow
  public processFlowPageIndex: number = 0;
  public processFlowData: string[] = [];
  public siteVisitByDepartmentName: string = "";//to store siteVisitByDepartmentName


  //busySpinner 
  public busySpinner: any = {
    selectedBusy: true,
    itemBusy: true,
    compEditBusy: false,//for edit comp webservice
    natureOfCompdropdownBusy: false,//for nature of complaint dropdown
    submitBusy: false,//for submit spinner
    busy: true
  }

  constructor(
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private complaintDIRegisterDataService: ComplaintDIRegisterDataService,
    private complaintDIRegisterEmitService: ComplaintDIRegisterEmitService,
    private complaintDIInvoiceDetailsService: ComplaintDIInvoiceDetailsService,
    // private toastService: ToastService,
    private datePipe: DatePipe,
    private localStorageService: LocalStorageService,
    private sessionErrorService: SessionErrorService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
    });
    console.log("complaintReferenceNo for modify Complaint di: ", this.complaintReferenceNo);
    this.processFlowData = new DIPolygonModel().siteVisitRequired;//set the process flow step from model    

    // this.toastService.toastElementRef.info('Complaint Register!', 'Info!');
    this.getItemsVal("ispl");
    this.buildForm();
    this.getSelectValues();
    this.getDepartmentNameValues();

    //formatting the current date
    let date = new Date();
    this.currentDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.loggedOnDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.complaintRegisterFormGroup.controls["loggedOnDt"].setValue(this.loggedOnDate);
    this.complaintReferenceDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.complaintRegisterFormGroup.controls["complaintReferenceDt"].setValue(this.complaintReferenceDate);
    this.siteVisitDtForModify = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');;
    this.complaintRegisterFormGroup.controls["siteVisitDt"].setValue(this.siteVisitDtForModify);
    //getting diffBetwnCmplntRefDtAndLoggedOnDt from localStorage
    this.diffBetwnCmplntRefDtAndLoggedOnDt = this.localStorageService.appSettings.diffBetwnCmplntRefDtAndLoggedOnDt;
    this.invoiveNoLength = this.localStorageService.dbSettings.invoiceNo;
    this.contactPersonNameLength = this.localStorageService.dbSettings.contactPersonName;
    this.contactPersonEmailIdLength = this.localStorageService.dbSettings.contactPersonEmailId;
    this.contactPersonPhoneNoLength = this.localStorageService.dbSettings.contactPersonPhoneNo;
    this.complaintDetailsLength = this.localStorageService.dbSettings.complaintDetails;
    //if complaintReferenceNo isn't equal to blank then getComplaintReferenceDetails will be invoked
    if (this.complaintReferenceNo != "") {
      this.submitButtonEnable = true;
      this.getComplaintReferenceDetails(this.complaintReferenceNo, this.fileActivityId);
    }//end of if

    this.natureOfComDropDownList = [
      { Key: '', Value: '-- Select --' }
    ]
    for (let natureCmp of this.natureOfComDropDownList) {
      if (natureCmp.Key == "") {
        this.complaintRegisterFormGroup.controls["natureOfComplaintId"].setValue(natureCmp.Key);
        break;
      }//end if
    }//end for


    //calling event emit service method
    this.getModalResultEventEmitter();

    console.log(" invoiceDetails===>", this.complaintDIInvoiceDetailsService.invoiceDetails);

    let invDet: any;


    //invoice Search deatails model value is not undefined then setInvDet method will be invoked
    if (this.complaintDIInvoiceDetailsService && this.complaintDIInvoiceDetailsService.invoiceDetails) {
      invDet = this.complaintDIInvoiceDetailsService.invoiceDetails;
      this.setInvDet(invDet);
    }//end of if


    //if selected items grid length is greater than zero setSelectItemsGrid method will invoked
    if (this.complaintDIInvoiceDetailsService && this.complaintDIInvoiceDetailsService.selectedItemDetails) {
      let selItemsDet = this.complaintDIInvoiceDetailsService.selectedItemDetails;
      //for setting selected items grid row
      this.setSelectItemsGrid(selItemsDet);
    }//end of if
    this.complaintQtyErrorCheck();

  }

   //start method of getDepartmentNameValues
   private getDepartmentNameValues() {
    this.departmentNameDropDownList.push({ key: "", value: "-- Select --" });
    this.departmentNameDropDownList.push({ key: "SELF", value: "SELF" });
    this.departmentNameDropDownList.push({ key: "QA", value: "QA" });
    this.departmentNameDropDownList.push({ key: "OTHERS", value: "OTHERS" });
    // this.siteVisitByDropDownList = [
    //   { Key: '', Value: '-- Select --' }
    // ];
    // for (let siteVisitBy of this.siteVisitByDropDownList) {
    //   if (siteVisitBy.Key == "") {
    //     this.allocateComplaintAddFormGroup.controls["siteVisitBy"].setValue(siteVisitBy.Key);
    //     break;
    //   }//end if
    // }//end for
  }//end method of getDepartmentNameValues


  //method to refesh the grid after closing the modal
  private getModalResultEventEmitter() {
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
        let selectedItemInPiReg: any[] = selectedDet.value.selectedItem;
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
        this.custCode = selItm.customerCode;
        this.custName = selItm.customerName;
        this.custSegment = selItm.customerSegment;
        this.salesGroup = selItm.salesGroup;
        this.salesOffice = selItm.salesOffice;
        this.selectedItemsGrid.push(selItm);
        this.contactPersonNameForModify = selItm.customerContactPersonName;
        this.contactPersonPhoneNoForModify = selItm.customerContactPersonPhoneNo;
        this.contactPersonEmailIdForModify = selItm.customerContactPersonEmailId;
      }//end of for
    }//end of for
    this.complaintDIInvoiceDetailsService.custCode = this.custCode;
    this.complaintQtyErrorCheck();
  }//end of the method setCustInforOnEventEmit

  //method to get all values from ComplaintDIRegisterDataService  
  private getSelectValues() {
    let loadBusySpinner: any = {
      receiptModeBusy: true,
      loggedByBusy: true,
      complaintTypeBusy: true,
    }
    //getting all values of ReceiptMode
    this.complaintDIRegisterDataService.getSelectValReceiptMode().
      subscribe(res => {
        this.modeOfReceiptDropDownList = res.details;
        loadBusySpinner.receiptModeBusy = false;
        selectedValuesUpdateSpinner();
        for (let receipt of this.modeOfReceiptDropDownList) {
          if (this.modeIdForModify == "" || this.modeIdForModify == undefined) {
            if (receipt.Key == "") {
              this.complaintRegisterFormGroup.controls["modeId"].setValue(receipt.Key);
              break;
            }//end if
          }//end of if
        }//end for
      },
      err => {
        console.log(err);
        loadBusySpinner.receiptModeBusy = false;
        selectedValuesUpdateSpinner();
        this.sessionErrorService.routeToLogin(err._body);
      });
    //getting all values of LoggedBy
    this.complaintDIRegisterDataService.getSelectValLoggedBy().
      subscribe(res => {
        this.complaintLoggedByDropDownList = res.details;
        loadBusySpinner.loggedByBusy = false;
        selectedValuesUpdateSpinner();
        for (let cmpLoggedBy of this.complaintLoggedByDropDownList) {
          if (this.loggedByForModify == "" || this.loggedByForModify == undefined) {
            if (cmpLoggedBy.Key == this.localStorageService.user.employeeId) {
              this.complaintRegisterFormGroup.controls["loggedBy"].setValue(cmpLoggedBy.Key);
            }//end of if
          }//end of if
        }//end for
      },
      err => {
        console.log(err);
        loadBusySpinner.loggedByBusy = false;
        selectedValuesUpdateSpinner();
        this.sessionErrorService.routeToLogin(err._body);
      });
    //getting all values of complaintType
    this.complaintDIRegisterDataService.getSelectComplaintType().
      subscribe(res => {
        this.complaintTypeDropDownList = res.details;
        loadBusySpinner.complaintTypeBusy = false;
        selectedValuesUpdateSpinner();
        for (let cmpType of this.complaintTypeDropDownList) {
          if (this.complaintTypeIdForModify == "" || this.complaintTypeIdForModify == undefined) {
            if (cmpType.Key == "") {
              this.complaintRegisterFormGroup.controls["complaintTypeId"].setValue(cmpType.Key);
              break;
            }//end if
          }//end of if
        }//end for
      },
      err => {
        console.log(err);
        loadBusySpinner.complaintTypeBusy = false;
        selectedValuesUpdateSpinner();
        this.sessionErrorService.routeToLogin(err._body);
      });

    // method to stop selected spinner
    let selectedValuesUpdateSpinner = (): any => {
      if (loadBusySpinner.receiptModeBusy == false &&
        loadBusySpinner.loggedByBusy == false &&
        loadBusySpinner.complaintTypeBusy == false) {
        this.busySpinner.selectedBusy = false;
        this.updateBusySpinner();
      }//end of if
    }//end of selected spinner method to stop the spinner
  }//end method getSelectValues

  //a method named buildform for creating the complaintRegisterFormGroup and its formControl
  private buildForm(): void {
    this.complaintRegisterFormGroup = this.formBuilder.group({
      'modeId': [''
        // , [
        //   Validators.required,
        // ]
      ],
      'complaintReferenceDt': [''
      ],
      'invoiceNo': [''
        // , [
        //   Validators.required
        // ]
      ],
      'contactPersonName': [''
      ],
      'contactPersonPhoneNo': [''
      ],
      'contactPersonEmailId': [''
      ],
      'loggedBy': [''
        // , [
        //   Validators.required,
        // ]
      ],
      'loggedOnDt': [''
        // , [
        //   Validators.required,
        // ]
      ],
      'complaintTypeId': [''
        // , [
        //   Validators.required,
        // ]
      ],
      'natureOfComplaintId': [''
        // , [
        //   Validators.required,
        // ]
      ],
      'complaintDetails': [''
      ],
      'siteVisit': [''
        // , [
        //   Validators.required,
        // ]
      ],
      'siteVisitDt': [''
      ],
      'siteVisitBy': [''
      ],
      'siteVisitByDepartmentName':[''
      ]
    });

  }//end of method buildForm
  //to load the spinner
  private updateBusySpinner() {
    if (this.busySpinner.selectedBusy || this.busySpinner.itemBusy || this.busySpinner.compEditBusy || this.busySpinner.natureOfCompdropdownBusy || this.busySpinner.submitBusy) {
      this.busySpinner.busy = true;
    } else if (this.busySpinner.selectedBusy == false && this.busySpinner.itemBusy == false && this.busySpinner.compEditBusy == false && this.busySpinner.natureOfCompdropdownBusy== false && this.busySpinner.submitBusy== false) {
      this.busySpinner.busy = false;
    }//end of else if
  }//end of busy spinner method


  //onOpenModal for opening modal from modalService
  private onOpenModal(complaintRefNo) {
    const modalRef = this.modalService.open(NgbdModalComponent);
    modalRef.componentInstance.modalTitle = 'Information';
    modalRef.componentInstance.modalMessage =
      this.complaintReferenceNo ?
        "Complaint Reference Number(DI) " + complaintRefNo + " updated successfully."
        : "Complaint Reference Number(DI) " + complaintRefNo + " created successfully.";
  }
  //end of method onOpenModal



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
  }
  // end method tableGridDataConverterFromRes

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
    if(this.complaintReferenceNo != undefined || this.complaintReferenceNo !=""){
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
    invDet.natureOfComplaintId = this.complaintRegisterFormGroup.value.natureOfComplaintId;
    invDet.complaintDetails = this.complaintRegisterFormGroup.value.complaintDetails;
    invDet.loggedOnDt = this.complaintRegisterFormGroup.value.loggedOnDt;
    invDet.siteVisit = this.complaintRegisterFormGroup.value.siteVisit;
    invDet.siteVisitDt = this.complaintRegisterFormGroup.value.siteVisitDt;
    invDet.siteVisitBy = this.complaintRegisterFormGroup.value.siteVisitBy;

    this.complaintDIInvoiceDetailsService.invoiceDetails = invDet;

    let items: any[] = [];
    items = this.selectedItemsGrid;

    let selectedItemsDet: any = {};

    selectedItemsDet.items = items;
    this.complaintDIInvoiceDetailsService.selectedItemDetails = selectedItemsDet;

    for (let selItm of this.selectedItemsGrid) {
      this.custCode = selItm.customerCode;
      this.custName = selItm.customerName;
      this.salesGroup = selItm.salesGroup;
      this.salesOffice = selItm.salesOffice;
      break;
    }

    this.complaintDIInvoiceDetailsService.title = this.title;
    this.complaintDIInvoiceDetailsService.custCode = this.custCode;
    this.complaintDIInvoiceDetailsService.custName = this.custName;
    this.complaintDIInvoiceDetailsService.salesGroup = this.salesGroup;
    this.complaintDIInvoiceDetailsService.salesOffice = this.salesOffice;
  }//end of the method setInvDetsForInvNoSearch

  // start method setInvDet for setting invDet from invoiceDetails model
  private setInvDet(invDetParam) {
    let invDet = invDetParam;
    if(this.complaintDIInvoiceDetailsService && this.complaintDIInvoiceDetailsService.compRefNo){
      this.complaintReferenceNo = this.complaintDIInvoiceDetailsService.compRefNo;
    }

    this.complaintReferenceDate = invDet.complaintReferenceDt;
    if (this.complaintReferenceDate) {
      this.complaintRegisterFormGroup.controls["complaintReferenceDt"].setValue(this.complaintReferenceDate);
    }

    this.modeIdForModify = invDet.modeId;
    if (this.modeIdForModify) {
      this.complaintRegisterFormGroup.controls["modeId"].setValue(this.modeIdForModify);
    }

    this.complaintTypeIdForModify = invDet.complaintTypeId;
    this.natureOfComplaintIdForModify = invDet.natureOfComplaintId;
    if (this.complaintTypeIdForModify) {
      this.complaintRegisterFormGroup.controls["complaintTypeId"].setValue(this.complaintTypeIdForModify);
      if (this.natureOfComplaintIdForModify) {
        this.onComplaintTypeSelect(null, this.complaintTypeIdForModify, this.natureOfComplaintIdForModify);
      }else{
        this.onComplaintTypeSelect(null, this.complaintTypeIdForModify);
      }
    }

    this.contactPersonNameForModify = invDet.contactPersonName;
    if (this.contactPersonNameForModify) {
      this.complaintRegisterFormGroup.controls["contactPersonName"].setValue(this.contactPersonNameForModify);
    }

    this.contactPersonPhoneNoForModify = invDet.contactPersonPhoneNo;
    if (this.contactPersonPhoneNoForModify) {
      this.complaintRegisterFormGroup.controls["contactPersonPhoneNo"].setValue(this.contactPersonPhoneNoForModify);
    }

    this.contactPersonEmailIdForModify = invDet.contactPersonEmailId;
    if (this.contactPersonEmailIdForModify) {
      this.complaintRegisterFormGroup.controls["contactPersonEmailId"].setValue(this.contactPersonEmailIdForModify);
    }

    this.complaintDetailsForModify = invDet.complaintDetails;
    if (this.complaintDetailsForModify) {
      this.complaintRegisterFormGroup.controls["complaintDetails"].setValue(this.complaintDetailsForModify);
    }

    this.siteVisitValue = invDet.siteVisit;
    if (this.siteVisitValue) {
      this.complaintRegisterFormGroup.controls["siteVisit"].setValue(this.siteVisitValue);
    }

    this.siteVisitDtForModify = invDet.siteVisitDt;
    if (this.siteVisitDtForModify) {
      this.complaintRegisterFormGroup.controls["siteVisitDt"].setValue(this.siteVisitDtForModify);
    }

    this.siteVisitByForModify = invDet.siteVisitBy;
    if (this.siteVisitByForModify) {
      this.complaintRegisterFormGroup.controls["siteVisitBy"].setValue(this.siteVisitByForModify);
    }

    //setting the invoiceDetails value as blank
    this.complaintDIInvoiceDetailsService.invoiceDetails = "";

  }//end of the method setInvDet


  private setSelectItemsGrid(selItemsDetParam) {
    if (selItemsDetParam.items.length != 0) {
      let items: any[] = selItemsDetParam.items;

      for (let selItm of items) {
        this.custCode = selItm.customerCode;
        this.custName = selItm.customerName;
        this.custSegment = selItm.customerSegment;
        this.salesGroup = selItm.salesGroup;
        this.salesOffice = selItm.salesOffice;
        this.contactPersonNameForModify = selItm.customerContactPersonName;
        this.contactPersonPhoneNoForModify = selItm.customerContactPersonPhoneNo;
        this.contactPersonEmailIdForModify = selItm.customerContactPersonEmailId;
        break;
      }
      this.complaintDIInvoiceDetailsService.custCode = this.custCode;
      this.complaintDIInvoiceDetailsService.custName = this.custName;
      this.complaintDIInvoiceDetailsService.salesGroup = this.salesGroup;
      this.complaintDIInvoiceDetailsService.salesOffice = this.salesOffice;
      //storing the inv details which are selected
      this.selectedItemsGrid = items;

      //calling  method tableGridDataConverterFromRes for creating table grid json array from res and passing the res as parameter
      this.tableGridDataConverterFromRes(this.selectedItemsGrid);
    }//end of if
  }

  //for clicking submit button this method will be invoked
  public onComplainSubmit(): void {
    console.log(this.complaintRegisterFormGroup.value);
    let user: any = {};
    user.modeId = this.complaintRegisterFormGroup.value.modeId;
    user.complaintReferenceDt = this.complaintRegisterFormGroup.value.complaintReferenceDt;
    user.contactPersonName = this.complaintRegisterFormGroup.value.contactPersonName;
    user.contactPersonPhoneNo = this.complaintRegisterFormGroup.value.contactPersonPhoneNo;
    user.contactPersonEmailId = this.complaintRegisterFormGroup.value.contactPersonEmailId;
    user.loggedBy = this.complaintRegisterFormGroup.value.loggedBy;
    user.loggedOnDt = this.complaintRegisterFormGroup.value.loggedOnDt;
    user.complaintTypeId = parseInt(this.complaintRegisterFormGroup.value.complaintTypeId);
    user.natureOfComplaintId = parseInt(this.complaintRegisterFormGroup.value.natureOfComplaintId);
    user.complaintDetails = this.complaintRegisterFormGroup.value.complaintDetails;
    let selectedItemObj: any[] = [];
    for (let selectedDet of this.selectedItemDetails) {
      for (let selItem of selectedDet.value.selectedItem) {
        selectedItemObj.push(selItem);
      }
    }
    let itemNos: any = {};
    itemNos.items = selectedItemObj;
    console.log("itemNos.items: ", itemNos.items);
    user.itemNos = itemNos;
    console.log(" user.itemNos", user.itemNos);
    user.siteVisit = this.complaintRegisterFormGroup.value.siteVisit;
    user.siteVisitDt = this.complaintRegisterFormGroup.value.siteVisitDt;
    //user.siteVisitBy = this.complaintRegisterFormGroup.value.siteVisitBy;
    if (this.complaintReferenceNo != '' || this.complaintReferenceNo != null) {
      user.complaintReferenceNo = this.complaintReferenceNo;
    }
    console.log("user=====>", user);
    //new add

    // console.log("preli investigation report submit val: ", preliInvestiReportDet);

    let jsonArr: any[] = [];
    jsonArr.push(JSON.stringify(user));
    this.formData.append("complaintRegisterDet", jsonArr.toString());
    //method to add or update preli
    if (this.fileData != undefined) {
      for (let i: number = 0; i < this.fileList.length; i++) {
        console.log(" file upload", this.fileData.get('uploadFile' + i.toString()));
        if (this.fileData.get('uploadFile' + i.toString()) != null) {
          this.formData.append('uploadFile' + i.toString(), this.fileData.get('uploadFile' + i.toString()));
        }
      }//end of for
    }//end of if fileData is !undefined

    this.formData.append('Accept', 'application/json');
    this.formData.append('accessToken', 'bearer ' + this.localStorageService.user.accessToken);
    this.formData.append('menuId', 'DEFAULT1');
    this.formData.append('userId', this.localStorageService.user.userId);

    let formDataObj: any = {};
    formDataObj = this.formData;
    console.log("complain di formDataObj====>>>>", formDataObj);
    // this.busySpinner.busy = true;//spinner
    let methodForAddOrEditComplaintRegDI: any;
    methodForAddOrEditComplaintRegDI = this.complaintReferenceNo ?
      this.complaintDIRegisterDataService.complaintUpdate(formDataObj) :
      this.complaintDIRegisterDataService.complainSubmit(formDataObj);
      this.busySpinner.submitBusy = true;
      this.updateBusySpinner();
    methodForAddOrEditComplaintRegDI.
      subscribe(res => {
        console.log("complaint di reg/edit Success Response: ", res);
        if (res.msgType == "Info") {
          this.resMsgType = res.msgType;
          user.complaintReferenceNo = res.value;
          this.onOpenModal(user.complaintReferenceNo);
          this.complaintDIInvoiceDetailsService.invoiceDetails = "";
          this.complaintDIInvoiceDetailsService.selectedItemDetails = "";
          this.complaintDIInvoiceDetailsService.compRefNo = "";
          this.complaintDIInvoiceDetailsService.custCode = "";
          this.complaintDIInvoiceDetailsService.custName = "";
          this.complaintDIInvoiceDetailsService.salesOffice = "";
          this.complaintDIInvoiceDetailsService.salesGroup = "";
          this.router.navigate([ROUTE_PATHS.RouteHome]);
        } else {
          this.resMsgType = this.errorConst;
          this.resErrorMsg = "Sorry! Save data fail. Please try again";
          this.formData = new FormData();//new instance created in formdata
          // "Sorry! Unable to save data.Please try again";
          // "Netowrk/Server Problem";
        }
      }, err => {
        this.busySpinner.submitBusy = true;
        this.updateBusySpinner();
        if (err.status == 401) {
          this.resErrorMsg = "Sorry! Unable to save data.Please try again";
        } else {
          this.resErrorMsg = "Netowrk/Server Problem";
        }
        this.formData = new FormData();//new instance created in formdata
        this.sessionErrorService.routeToLogin(err._body);
      });
  }//end of method preliDiSubmit  

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
  //end of new add
  //method for submitting invoice no as a parameter and getting all the invoice details
  public onSubmitInvoiceNo(invoiceNo) {
    this.invoiceNo = invoiceNo;
    this.buttonEnable = true;
    this.invoiceNoSpaceCheckMsg = "Info";
    // invoiceNo = invoiceNo.trim();
    //calling the getInvoiceDetails method from ComplaintDIRegisterDataService class and passing the user input invoice no as a parameter
    this.getItemsVal(invoiceNo);
    //initializing natureOfComListDropDownList
    this.natureOfComDropDownList = [
      { Key: '', Value: '-- Select --' }
    ]
    for (let natureCmp of this.natureOfComDropDownList) {
      if (natureCmp.Key == "") {
        this.complaintRegisterFormGroup.controls["natureOfComplaintId"].setValue(natureCmp.Key);
        break;
      }//end if
    }//end for
  }//end of the method onInvoiceSelect

  //onOpenModal for opening modal from modalService
  public onInvoiceNoOpenModal(invoiceNo: string) {
    const modalRef = this.modalService.open(NgbdComplaintDIRegisterModalComponent);
    modalRef.componentInstance.modalTitle = this.title;
    modalRef.componentInstance.invoiceNo = invoiceNo;
    modalRef.componentInstance.items = this.items;
    if (invoiceNo == '') {
      this.setInvDetsForInvNoSearch();
      modalRef.componentInstance.custCode = this.custCode;
      modalRef.componentInstance.custName = this.custName;
    } else if (invoiceNo != '') {
      this.complaintDIInvoiceDetailsService.selectedItemDetails = this.selectedItemsGrid;
      console.log("selected grid in pi reg====>>>>>", this.complaintDIInvoiceDetailsService.selectedItemDetails);
    }
  }
  //end of method onOpenModal

  //start method getItemsVal
  public getItemsVal(invoiceNo, selectedItemsId?: any[]) {
    this.complaintDIRegisterDataService.getInvoiceDetails(invoiceNo).
      subscribe(res => {
        //getting the items object array for webservice and initialing it to a publically defind array named items 
        this.itemsHeader = res.invoiceDetails.itemsHeader;
        this.busySpinner.itemBusy = false;//to stop the spinner
        this.updateBusySpinner();//method to stop the spinner 
      },
      err => {
        console.log(err);
        this.busySpinner.itemBusy = false;//to stop the spinner
        this.updateBusySpinner();//method to stop the spinner 
        this.sessionErrorService.routeToLogin(err._body);

      });
  }//end method of getItemsVal


  //method for onchanging compaintType dropdown
  public onComplaintTypeSelect(args, complaintTypeId, selectedNatureOfComplaintId?: string) {
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
      this.busySpinner.natureOfCompdropdownBusy = true;
      this.updateBusySpinner();
      this.complaintDIRegisterDataService.getSelectValNatureOfComplaint(this.complaintTypeId).
        subscribe(res => {
          this.natureOfComDropDownList = res.details;
          this.busySpinner.natureOfCompdropdownBusy = false;//to stop the spinner
          this.updateBusySpinner();
          for (let natureCmp of this.natureOfComDropDownList) {
            console.log(" natureCmp.Key ", natureCmp.Key);
            if (this.complaintTypeName == "Others(CAT C)") {
              this.complaintRegisterFormGroup.controls["natureOfComplaintId"].setValue(natureCmp.Key);
              this.complaintDetailsEnable = true;
              this.complaintRegisterFormGroup.controls['complaintDetails'].markAsTouched();
              break;
            } else if (natureCmp.Key == "" && (!selectedNatureOfComplaintId)) {
              this.complaintRegisterFormGroup.controls["natureOfComplaintId"].setValue(natureCmp.Key);
              break;
            } else if (selectedNatureOfComplaintId){
            // (selectedNatureOfComplaintId != null || selectedNatureOfComplaintId != "" || selectedNatureOfComplaintId != undefined) {
              console.log(" selectedNatureOfComplaintId == ", selectedNatureOfComplaintId);
              if (natureCmp.Key == selectedNatureOfComplaintId) {
                this.complaintRegisterFormGroup.controls["natureOfComplaintId"].setValue(selectedNatureOfComplaintId);
                break;
              }//end of if
            }//end of else if
          }//end for
        },
        err => {
          console.log(err);
          this.busySpinner.natureOfCompdropdownBusy = false;//to stop the spinner
          this.updateBusySpinner();
          this.sessionErrorService.routeToLogin(err._body);
        });
    }//end else
    if (this.complaintTypeName === "Others(CAT C)") {
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

  //method for Complaint Logged On and Compliant Reference Date validation 
  public compareTwoDates(controlName) {
    console.log(" currentDate ", this.currentDate);
    console.log("compareTwoDates method called .");
    console.log("controlName = ", controlName);
    this.submitButtonEnable = true;
    console.log(" diffBetwnCmplntRefDtAndLoggedOnDt ", this.diffBetwnCmplntRefDtAndLoggedOnDt)
    this.complaintReferenceDt = "Info";
    this.loggedOnDt = "Info";
    this.loggedOnDtCmplntRefDtDiff = "Info";
    this.currentDtloggedOnDt = "Info";
    this.loggedOnDt = "Info";
    this.loggedOnDtCmplntRefDtDiff = "Info";
    this.siteVisitDtloggedOnDt = "Info";
    this.currentDtComplaintReferenceDt = "Info";
    this.cmplntRefDtLoggedOnDtDiff = "Info";
    this.cmplntRefDtLoggedOnDtDiffZero = "Info";
    //converting the complaintReferenceDt value andloggedOnDt value into time 
    let compRefDt: number = new Date(this.complaintRegisterFormGroup.controls['complaintReferenceDt'].value).getTime();
    let logOnDt: number = new Date(this.complaintRegisterFormGroup.controls['loggedOnDt'].value).getTime();
    let oneDay = 24 * 60 * 60 * 1000;
    console.log(" compRefDt ", compRefDt);
    console.log(" logOnDt ", logOnDt);
    // calculating the difference between complaintReferenceDt and loggedOnDt
    let compRefDtLogOnDtDiff: number = Math.abs((logOnDt - compRefDt) / (oneDay));
    console.log(" date difference ", compRefDtLogOnDtDiff);

    // if the control name is complaintReferenceDt then this if condition will be executed
    if (controlName == "complaintReferenceDt") {
      // if complaintReferenceDt is greater than current date then this if conditon will be executed
      if (new Date(this.currentDate) < new Date(this.complaintRegisterFormGroup.controls['complaintReferenceDt'].value)) {
        this.currentDtComplaintReferenceDt = "Error";
        this.submitButtonEnable = false;
      } else {
        if (this.currentDtComplaintReferenceDt == "Info") {
          this.submitButtonEnable = false;

          //if complaintReferenceDt is smaller than current date then this else conditon will be executed
          this.currentDtComplaintReferenceDt = "Info";
          this.cmplntRefDtLoggedOnDtDiff = "Info";
          // if complaintReferenceDt is greater than loggedOnDt then this if condition will be executed
          if ((new Date(this.complaintRegisterFormGroup.controls['loggedOnDt'].value) < new Date(this.complaintRegisterFormGroup.controls['complaintReferenceDt'].value))) {
            console.log("Date error.")
            this.complaintReferenceDt = "Error";
            this.submitButtonEnable = false;
            this.loggedOnDt = "Info";
          } else {//if complaintReferenceDt is smaller than loggedOnDt then this else condition will be executed
            // if diffBetwnCmplntRefDtAndLoggedOnDt is not greater than or equal to zero then this if condition will be executed
            if (!(this.diffBetwnCmplntRefDtAndLoggedOnDt <= 0)) {
              // if compRefDtLogOnDtDiff is greater than diffBetwnCmplntRefDtAndLoggedOnDt and compRefDtLogOnDtDiff is not NaN then this if condition will be executed
              if ((compRefDtLogOnDtDiff > this.diffBetwnCmplntRefDtAndLoggedOnDt) && !(isNaN(compRefDtLogOnDtDiff))) {
                this.complaintReferenceDt = "Info";
                this.cmplntRefDtLoggedOnDtDiff = "Error";
                this.loggedOnDtCmplntRefDtDiff = "Info";
                this.submitButtonEnable = false;
              }// end if 
            } else if (this.diffBetwnCmplntRefDtAndLoggedOnDt == 0) { // if diffBetwnCmplntRefDtAndLoggedOnDt is equal to zero then this if condition will be executed
              // if compRefDtLogOnDtDiff is greater than diffBetwnCmplntRefDtAndLoggedOnDt and compRefDtLogOnDtDiff is not NaN
              if ((compRefDtLogOnDtDiff > this.diffBetwnCmplntRefDtAndLoggedOnDt) && !(isNaN(compRefDtLogOnDtDiff))) {
                this.cmplntRefDtLoggedOnDtDiffZero = "Error";
                this.loggedOnDtCmplntRefDtDiffZero = "Info";
                this.submitButtonEnable = false;
              } //end if
            } //end else if
          }//end else
        }//end if
        else {
          //if complaintReferenceDt is smaller than current date then this else conditon will be executed
          this.currentDtComplaintReferenceDt = "Info";
          this.cmplntRefDtLoggedOnDtDiff = "Info";
          // if complaintReferenceDt is greater than loggedOnDt then this if condition will be executed
          if ((new Date(this.complaintRegisterFormGroup.controls['loggedOnDt'].value) < new Date(this.complaintRegisterFormGroup.controls['complaintReferenceDt'].value))) {
            console.log("Date error.")
            this.complaintReferenceDt = "Error";
            this.submitButtonEnable = false;
            this.loggedOnDt = "Info";
          } else {//if complaintReferenceDt is smaller than loggedOnDt then this else condition will be executed
            // if diffBetwnCmplntRefDtAndLoggedOnDt is not greater than or equal to zero then this if condition will be executed
            if (!(this.diffBetwnCmplntRefDtAndLoggedOnDt <= 0)) {
              // if compRefDtLogOnDtDiff is greater than diffBetwnCmplntRefDtAndLoggedOnDt and compRefDtLogOnDtDiff is not NaN then this if condition will be executed
              if ((compRefDtLogOnDtDiff > this.diffBetwnCmplntRefDtAndLoggedOnDt) && !(isNaN(compRefDtLogOnDtDiff))) {
                this.complaintReferenceDt = "Info";
                this.cmplntRefDtLoggedOnDtDiff = "Error";
                this.loggedOnDtCmplntRefDtDiff = "Info";
                this.submitButtonEnable = false;
              }// end if 
            } else if (this.diffBetwnCmplntRefDtAndLoggedOnDt == 0) { // if diffBetwnCmplntRefDtAndLoggedOnDt is equal to zero then this if condition will be executed
              // if compRefDtLogOnDtDiff is greater than diffBetwnCmplntRefDtAndLoggedOnDt and compRefDtLogOnDtDiff is not NaN
              if ((compRefDtLogOnDtDiff > this.diffBetwnCmplntRefDtAndLoggedOnDt) && !(isNaN(compRefDtLogOnDtDiff))) {
                this.cmplntRefDtLoggedOnDtDiffZero = "Error";
                this.loggedOnDtCmplntRefDtDiffZero = "Info";
                this.submitButtonEnable = false;
              } //end if
            } //end else if
          }//end else
        }//end else
      }//end else
    } else if (controlName == "loggedOnDt") { //if controlName is loggedOnDt then this else if condition will be executed
      this.currentDtloggedOnDt = "Info";
      this.loggedOnDt = "Info";
      this.loggedOnDtCmplntRefDtDiff = "Info";
      this.siteVisitDtloggedOnDt = "Info";
      this.loggedOnDtCmplntRefDtDiffZero = "Info";
      //if loggedOnDt is greater than current date then this if condition will be executed
      if (new Date(this.currentDate) < new Date(this.complaintRegisterFormGroup.controls['loggedOnDt'].value)) {
        this.currentDtloggedOnDt = "Error";
        this.submitButtonEnable = false;
      } else { //if loggedOnDt is smaller than current date then this else condition will executed
        if (this.currentDtloggedOnDt == "Info" ) {
          this.submitButtonEnable = false;

          this.currentDtloggedOnDt = "Info";
          this.loggedOnDt = "Info";
          this.loggedOnDtCmplntRefDtDiff = "Info";
          this.siteVisitDtloggedOnDt = "Info";
          // if complaintReferenceDt is greater than loggedOnDt then this if condition will be executed
          if (new Date(this.complaintRegisterFormGroup.controls['loggedOnDt'].value) < new Date(this.complaintRegisterFormGroup.controls['complaintReferenceDt'].value)) {
            console.log("Date error.")
            this.loggedOnDt = "Error";
            this.submitButtonEnable = false;
            this.complaintReferenceDt = "Info";
          } else { //if complaintReferenceDt is smaller than loggedOnDt then this if condition will be executed
            // if diffBetwnCmplntRefDtAndLoggedOnDt is not greater than or equal to zero then this if condition will be executed
            if (!(this.diffBetwnCmplntRefDtAndLoggedOnDt <= 0)) {
              // compRefDtLogOnDtDiff is greater than diffBetwnCmplntRefDtAndLoggedOnDt and compRefDtLogOnDtDiff is not NaN then this if condition will be executed
              if ((compRefDtLogOnDtDiff > this.diffBetwnCmplntRefDtAndLoggedOnDt) && !(isNaN(compRefDtLogOnDtDiff))) {
                this.loggedOnDtCmplntRefDtDiff = "Error";
                this.cmplntRefDtLoggedOnDtDiff = "Info";
                this.submitButtonEnable = false;
              } // end of if
              // if loggedOnDt is greater than siteVisitDt and siteVisitDt is not blank("") then this else if condition will be invoked
              else if ((new Date(this.complaintRegisterFormGroup.controls['siteVisitDt'].value) < new Date(this.complaintRegisterFormGroup.controls['loggedOnDt'].value)) && this.complaintRegisterFormGroup.controls['loggedOnDt'].value != "") {
                this.siteVisitDtloggedOnDt = "Error";
                this.siteVisitDt = "Info";
                this.submitButtonEnable = false;
              } // end of else if
            } // end of if
            // if diffBetwnCmplntRefDtAndLoggedOnDt is equal to zero then this else if condition will be executed
            else if (this.diffBetwnCmplntRefDtAndLoggedOnDt == 0) {
              // if compRefDtLogOnDtDiff is greater than diffBetwnCmplntRefDtAndLoggedOnDt and compRefDtLogOnDtDiff is not NaN
              if ((compRefDtLogOnDtDiff > this.diffBetwnCmplntRefDtAndLoggedOnDt) && !(isNaN(compRefDtLogOnDtDiff))) {
                this.loggedOnDtCmplntRefDtDiffZero = "Error";
                this.cmplntRefDtLoggedOnDtDiffZero = "Info";
                this.submitButtonEnable = false;
              }// end of if
            } //end of else if
          }// end of else
        } else {
          this.currentDtloggedOnDt = "Info";
          this.loggedOnDt = "Info";
          this.loggedOnDtCmplntRefDtDiff = "Info";
          this.siteVisitDtloggedOnDt = "Info";
          // if complaintReferenceDt is greater than loggedOnDt then this if condition will be executed
          if (new Date(this.complaintRegisterFormGroup.controls['loggedOnDt'].value) < new Date(this.complaintRegisterFormGroup.controls['complaintReferenceDt'].value)) {
            console.log("Date error.")
            this.loggedOnDt = "Error";
            this.submitButtonEnable = false;
            this.complaintReferenceDt = "Info";
          } else { //if complaintReferenceDt is smaller than loggedOnDt then this if condition will be executed
            // if diffBetwnCmplntRefDtAndLoggedOnDt is not greater than or equal to zero then this if condition will be executed
            if (!(this.diffBetwnCmplntRefDtAndLoggedOnDt <= 0)) {
              // compRefDtLogOnDtDiff is greater than diffBetwnCmplntRefDtAndLoggedOnDt and compRefDtLogOnDtDiff is not NaN then this if condition will be executed
              if ((compRefDtLogOnDtDiff > this.diffBetwnCmplntRefDtAndLoggedOnDt) && !(isNaN(compRefDtLogOnDtDiff))) {
                this.loggedOnDtCmplntRefDtDiff = "Error";
                this.cmplntRefDtLoggedOnDtDiff = "Info";
                this.submitButtonEnable = false;
              } // end of if
              // if loggedOnDt is greater than siteVisitDt and siteVisitDt is not blank("") then this else if condition will be invoked
              else if ((new Date(this.complaintRegisterFormGroup.controls['siteVisitDt'].value) < new Date(this.complaintRegisterFormGroup.controls['loggedOnDt'].value)) && this.complaintRegisterFormGroup.controls['loggedOnDt'].value != "") {
                this.siteVisitDtloggedOnDt = "Error";
                this.siteVisitDt = "Info";
                this.submitButtonEnable = false;
              } // end of else if
            } // end of if
            // if diffBetwnCmplntRefDtAndLoggedOnDt is equal to zero then this else if condition will be executed
            else if (this.diffBetwnCmplntRefDtAndLoggedOnDt == 0) {
              // if compRefDtLogOnDtDiff is greater than diffBetwnCmplntRefDtAndLoggedOnDt and compRefDtLogOnDtDiff is not NaN
              if ((compRefDtLogOnDtDiff > this.diffBetwnCmplntRefDtAndLoggedOnDt) && !(isNaN(compRefDtLogOnDtDiff))) {
                this.loggedOnDtCmplntRefDtDiffZero = "Error";
                this.cmplntRefDtLoggedOnDtDiffZero = "Info";
                this.submitButtonEnable = false;
              }// end of if
            } //end of else if
          }// end of else
        }

      }// end of else
    }// end of else if 
  }//end of method compareTwoDates

  //start method for clicking radio button 
  public onRadioClick(radioValue) {
    console.log("radioValue ", radioValue);
    this.siteVisitValue = radioValue;
    //  if siteVisitValue is Y then this if condition will be executed
    if (this.siteVisitValue == "Y") {
      // this.complaintRegisterFormGroup.get('siteVisitDt').setValidators(Validators.required);
      // this.complaintRegisterFormGroup.get('siteVisitBy').setValidators(Validators.required);
      this.complaintRegisterFormGroup.controls["siteVisit"].setValue(this.siteVisitValue);
      this.actionTakenValue = "";
      this.actionTakenChecked = false;
    } else if (this.siteVisitValue == "N") { // siteVisitValue is N then this if condition will be executed
      this.siteVisitDt = "Info";
      this.complaintRegisterFormGroup.controls["siteVisit"].setValue(this.siteVisitValue);
    } // end of else
  }//end of method onRadioClick

  //start method compareSiteVisitDt
  public compareSiteVisitDt() {
    this.siteVisitDt = "Info";
    this.siteVisitDtloggedOnDt = "Info";
    this.submitButtonEnable = true;
    // if loggedOnDt is greater than siteVisitDtthan this else if condition will be executed
    if (new Date(this.complaintRegisterFormGroup.controls['siteVisitDt'].value) < new Date(this.complaintRegisterFormGroup.controls['loggedOnDt'].value)) {
      console.log("Date error.")
      this.siteVisitDt = "Error";
      this.submitButtonEnable = false;
      this.siteVisitDtloggedOnDt = "Info";
    } else if (this.currentDtloggedOnDt == "Error" || this.siteVisitDtloggedOnDt == "Error" || this.siteVisitDt == "Error" || this.loggedOnDt == "Error" || this.complaintReferenceDt == "Error" || this.currentDtComplaintReferenceDt == "Error" || this.cmplntRefDtLoggedOnDtDiff == "Error" || this.loggedOnDtCmplntRefDtDiff == "Error" || this.cmplntRefDtLoggedOnDtDiffZero == "Error" || this.loggedOnDtCmplntRefDtDiffZero == "Error") {
      this.submitButtonEnable = false;
    }
  }//end of method compareSiteVisitDt

  // start method of onActionTakenRadioClick 
  public onActionTakenRadioClick(actionTakenRadioValue) {
    this.actionTakenValue = actionTakenRadioValue;
  }//end of method onActionTakenRadioClick


  // start getComplaintReferenceDetails for editing a complaint
  public getComplaintReferenceDetails(complaintReferenceNo: string, fileActivityId: number) {
    this.busySpinner.compEditBusy = true;
    this.complaintDIRegisterDataService.getComplaintReferenceDetails(complaintReferenceNo, fileActivityId)
      .subscribe(res => {
        //getting the comp ref details from webservice
        this.selectedComplaintReferenceDetails = res.details[0];
        //spinner
        this.busySpinner.compEditBusy = false;
        this.updateBusySpinner();
        //end of spinner
        console.log("res for edit comp: ", res);
        console.log("comprefdetobj for edit comp: ", this.selectedComplaintReferenceDetails);
        console.log("this.selectedComplaintReferenceDetails.activityId: ", this.selectedComplaintReferenceDetails.activityId);
        console.log("this.localStorageService.appSettings.complaintRegistrationActivityId :", this.localStorageService.appSettings.complaintRegistrationActivityId);
        if (this.selectedComplaintReferenceDetails.activityId == this.localStorageService.appSettings.complaintRegistrationActivityId) {
          console.log(" ActivityId is matched");
          let invItems: any[] = this.selectedComplaintReferenceDetails.itemNos.items;
          if (invItems.length > 0) {
            for (let selItm of invItems) {
              this.custCode = selItm.customerCode;
              this.custName = selItm.customerName;
              this.custSegment = selItm.customerSegment;
              this.salesGroup = selItm.salesGroup;
              this.salesOffice = selItm.salesOffice;
              break;
            }//end of for
            this.complaintDIInvoiceDetailsService.custCode = this.custCode;
            this.complaintDIInvoiceDetailsService.custName = this.custName;
            this.complaintDIInvoiceDetailsService.salesGroup = this.salesGroup;
            this.complaintDIInvoiceDetailsService.salesOffice = this.salesOffice;
            for (let selItm of invItems) {
              this.selectedItemsGrid.push(selItm);
            }
          }//end of if
          //calling  method tableGridDataConverterFromRes for creating table grid json array from res and passing the res as parameter
          this.tableGridDataConverterFromRes(invItems);
          this.complaintDIInvoiceDetailsService.compRefNo = complaintReferenceNo;
          this.complaintQtyInMtrsError = false;
          this.modeIdForModify = this.selectedComplaintReferenceDetails.modeId;
          this.complaintRegisterFormGroup.controls["modeId"].setValue(this.modeIdForModify);
          this.complaintReferenceDate = this.datePipe.transform(this.selectedComplaintReferenceDetails.complaintReferenceDt, 'yyyy-MM-dd');
          this.complaintRegisterFormGroup.controls["complaintReferenceDt"].setValue(this.complaintReferenceDate);
          this.invoiceNoForModify = this.selectedComplaintReferenceDetails.invoiceNo;
          this.contactPersonNameForModify = this.selectedComplaintReferenceDetails.contactPersonName;
          if (this.contactPersonNameForModify == " ") {
            this.contactPersonNameForModify = "";
          }
          this.complaintRegisterFormGroup.controls["contactPersonName"].setValue(this.contactPersonNameForModify);
          this.contactPersonPhoneNoForModify = this.selectedComplaintReferenceDetails.contactPersonPhoneNo;
          if (this.contactPersonPhoneNoForModify == " ") {
            this.contactPersonPhoneNoForModify = "";
          }
          this.complaintRegisterFormGroup.controls["contactPersonPhoneNo"].setValue(this.contactPersonPhoneNoForModify);
          this.contactPersonEmailIdForModify = this.selectedComplaintReferenceDetails.contactPersonEmailId;
          if (this.contactPersonEmailIdForModify == " ") {
            this.contactPersonEmailIdForModify = "";
          }
          this.complaintRegisterFormGroup.controls["contactPersonEmailId"].setValue(this.contactPersonEmailIdForModify);
          this.complaintTypeIdForModify = this.selectedComplaintReferenceDetails.complaintTypeId;
          this.complaintRegisterFormGroup.controls["complaintTypeId"].setValue(this.complaintTypeIdForModify);
          this.natureOfComplaintIdForModify = this.selectedComplaintReferenceDetails.natureOfComplaintId;
          this.onComplaintTypeSelect(null, this.complaintTypeIdForModify, this.natureOfComplaintIdForModify);
          this.complaintDetailsForModify = this.selectedComplaintReferenceDetails.complaintDetails;
          if (this.complaintDetailsForModify == " ") {
            this.complaintDetailsForModify = "";
          }
          this.complaintRegisterFormGroup.controls["complaintDetails"].setValue(this.complaintDetailsForModify);
          this.loggedByForModify = this.selectedComplaintReferenceDetails.loggedBy;
          this.complaintRegisterFormGroup.controls["loggedBy"].setValue(this.loggedByForModify);
          this.loggedOnDtForModify = this.datePipe.transform(this.selectedComplaintReferenceDetails.loggedOnDt, 'yyyy-MM-dd');
          this.complaintRegisterFormGroup.controls["loggedOnDt"].setValue(this.loggedOnDtForModify);
          this.siteVisitValue = this.selectedComplaintReferenceDetails.siteVisit;
          this.complaintRegisterFormGroup.controls["siteVisit"].setValue(this.siteVisitValue);
          this.siteVisitByForModify = this.selectedComplaintReferenceDetails.siteVisitBy;
          if (this.siteVisitByForModify == " ") {
            this.siteVisitByForModify = "";
          }
          this.complaintRegisterFormGroup.controls["siteVisitBy"].setValue(this.siteVisitByForModify);
          this.siteVisitDtForModify = this.selectedComplaintReferenceDetails.siteVisitDt;
          this.complaintRegisterFormGroup.controls["siteVisitDt"].setValue(this.siteVisitDtForModify);
          this.siteVisitByDepartmentName = this.selectedComplaintReferenceDetails.siteVisitByDepartmentName.trim();
          this.complaintRegisterFormGroup.controls["siteVisitByDepartmentName"].setValue(this.siteVisitByDepartmentName);
         
        } else {
          console.log(" ActivityId isn't matched");
        }

      },
      err => {
        console.log(err);
        //spinner
        this.busySpinner.compEditBusy = false;
        this.updateBusySpinner();
        //end of spinner
        this.sessionErrorService.routeToLogin(err._body);

      });

  }
  //  end method getComplaintReferenceDetails

  //for clicking cancel button this method will be invoked
  public onCancel(): void {
    this.complaintDIInvoiceDetailsService.invoiceDetails = "";
    this.complaintDIInvoiceDetailsService.selectedItemDetails = "";
    this.complaintDIInvoiceDetailsService.custCode = "";
    this.complaintDIInvoiceDetailsService.custName = "";
    this.complaintDIInvoiceDetailsService.salesOffice = "";
    this.complaintDIInvoiceDetailsService.salesGroup = "";
    this.complaintDIInvoiceDetailsService.compRefNo = "";
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }// end of onCancel method

  //start method getItemsHeaderEventEmitter for getting the itemsheader from eventemitter
  getItemsHeaderEventEmitter() {
    this.complaintDIRegisterEmitService.getItemsHeaderEventEmitter().
      subscribe(itemsHeaderRes => {
        console.log(" itemsHeaderRes  : ", itemsHeaderRes);
        this.itemsHeader = itemsHeaderRes;
      },
      err => {
        console.log(err);
        this.sessionErrorService.routeToLogin(err._body);
      });

  }//end of the method getItemsHeaderEventEmitter

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
      if(this.complaintDIInvoiceDetailsService.compRefNo == undefined || this.complaintDIInvoiceDetailsService.compRefNo == ""){
        this.custCode = "";
        this.custName = "";
      }
      this.custSegment = "";
      this.salesGroup = "";
      this.salesOffice = "";
      this.complaintDIInvoiceDetailsService.custCode = this.custCode;
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

  // method to delete error msg
  public deleteResErrorMsgOnClick(resMsgType) {
    if (resMsgType == 'Error') {
      this.resMsgType = "Info";
    }//end of if
  }//end of method to delete error msg

  // start method comDetsOnkeyup
  public comDetsOnkeyup(complaintDetails) {
    this.complaintDetailsEnable = false;
    console.log(" complaintDetails ", complaintDetails);
    if ((complaintDetails == "" || complaintDetails == " ") && this.complaintTypeName == "Others") {
      this.complaintRegisterFormGroup.controls['natureOfComplaintId'].markAsUntouched();
      this.complaintDetailsEnable = true;
    }//end of if
  }//end of method comDetsOnkeyup

  //start method onKeyupComplaintQty
  onKeyupComplaintQty(complaintQtyInMtrsParam, invoiceNo, itemCode, invoiceQtyInMtrsParam) {
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

          } else {
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


  //start method onKeyupComplaintQty
  complaintQtyErrorCheck() {
    console.log("complaintQtyErrorCheck start===>");
    for (let selectedItmDet of this.selectedItemDetails) {
      for (let itemDet of selectedItmDet.value.selectedItem) {
        let invoiceQtyInMtrs: number = parseFloat(itemDet.invoiceQtyInMtrs);
        let complaintQtyInMtrs: number = parseFloat(itemDet.complaintQtyInMtrs);
        if (isNaN(complaintQtyInMtrs) || complaintQtyInMtrs == 0) {
          this.complaintQtyInMtrsError = true;
          break;
        } else {
          this.complaintQtyInMtrsError = false;
        }//end of else
      }//end of for
      if (this.complaintQtyInMtrsError == true) {
        break;
      }//end of if
    }//end of for
  }//end of cmpQtyerrorcheck


  //start method of complaintQtyErrorCorrection
  private complaintQtyErrorCorrection() {
    for (let selectedItmDet of this.selectedItemDetails) {
      for (let itemDet of selectedItmDet.value.selectedItem) {
        if (itemDet.uiInpErrFlag == true || itemDet.uiInpErrFlag == undefined) {
          this.complaintQtyInMtrsError = true;
        } else if (itemDet.uiInpErrFlag == false) {
          this.complaintQtyInMtrsError = false;
        }//end of else if
      }//end of for
    }//end of for
  }//end of the method complaintQtyErrorCorrection  

}//end of class
