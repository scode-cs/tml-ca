import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastService } from "../../../../home/services/toast-service";
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { ComplaintDIRegisterDataService } from "../../../../complain/complain-di/services/complaint-di-register-data.service";
import { InvestigationReportInvoiceDetailsService } from "../../../services/investigation-report-invoice-details.service";
import { SessionErrorService } from "../../../../shared/services/session-error.service";

@Component({
  selector: 'ispl-complaint-reference-no-search.component-form',
  templateUrl: 'complaint-reference-no-search.component.html',
  styleUrls: ['complaint-reference-no-search.component.css']
})
export class ComplaintReferenceNoSearchComponent implements OnInit {
  public custName: string = "";
  public title: string = "Add Investigation Report";
  public custCode: string = "";
  public salesGroup: string = "";
  public salesOffice: string = "";

  public allInvDetails: any[] = [];//array for showing all invoice dets


  public complaintPIInvoiceDetails: any = {};//to show the complaint det in html page

  public invDetailsItemsHeader: any = {};

  public selectedInvDet: any[] = [];// array for showing selected invoice dets

  public searchFormGroup: FormGroup;

  public complaintTypeDropDownList: any[] = [];
  public natureOfComDropDownList: any = [];

  //create a formgroup for complain reg
  public complaintRegisterFormGroup: FormGroup;

  private complaintTypeName: string = "";
  private natureCmpName: string= "";
  private complaintTypeId: string;
  public complaintDetailsEnable: boolean = false;

  //for busy spinner
  public busySpinner: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private complaintDIRegisterDataService: ComplaintDIRegisterDataService,
    private sessionErrorService: SessionErrorService,
    private investigationReportInvoiceDetailsService: InvestigationReportInvoiceDetailsService
  ) {
  }//end of constructor

  ngOnInit(): void {
    this.initform();
    this.getItemsHeader("ispl");
    this.setInitialNatureOfCompVal();


    // this.title = this.complaintDIInvoiceDetailsService.title;
    this.custCode = this.investigationReportInvoiceDetailsService.custCode;
    this.custName = this.investigationReportInvoiceDetailsService.custName;
    this.salesGroup = this.investigationReportInvoiceDetailsService.salesGroup;
    this.salesOffice = this.investigationReportInvoiceDetailsService.salesOffice;
    this.getCustomerInvDet();
    this.getAllDropDownVal();

  }//end of onInit

  /**
   * @description init form data
   */
  private initform() {
    this.complaintRegisterFormGroup = new FormGroup({
      complaintTypeId: new FormControl({ value: '' }, Validators.required),
      natureOfComplaintId: new FormControl({ value: '' }, Validators.required),
      complaintDetails: new FormControl('')
    });
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


  //start method getItemsVal
  private getItemsHeader(invoiceNo) {
    this.complaintDIRegisterDataService.getInvoiceDetails(invoiceNo).
      subscribe(res => {
        if (res.msgType === "Info") {
          this.invDetailsItemsHeader = res.invoiceDetails.itemsHeader;
        } else {
          this.busySpinner = false;
        }
      },
        err => {
          console.log(err);
          this.busySpinner = false;
          this.sessionErrorService.routeToLogin(err._body);
        });
  }//end method of getItemsVal

  private getCustomerInvDet() {
    this.busySpinner = true;
    this.complaintDIRegisterDataService.getCustomerInvDet(this.custCode).
      subscribe(res => {
        if (res.msgType === "Info") {
          this.complaintPIInvoiceDetails = res;
          if (this.selectedInvDet.length == 0) {
            this.allInvDetails = res.invoiceDetails.items;
            this.invDetailsItemsHeader = this.complaintPIInvoiceDetails.invoiceDetails.itemsHeader;
          } else if (this.selectedInvDet.length > 0) {
            let allItemDet = res.invoiceDetails.items;
            let flag: boolean = false;
            for (let alItm of allItemDet) {
              flag = this.selectedItemDetails(alItm.invoiceNo, alItm.itemCode, alItm.customerCode);
              if (flag == false) {
                this.allInvDetails.push(alItm);
              }//end of if flag == false
            }//end of for
          }//end of else if    
          this.busySpinner = false;  
        }else{
          this.busySpinner = false;
        }
        console.log(" this.allInvDetails ========> ", this.allInvDetails);
        console.log(" complaintPIInvoiceDetails ", this.complaintPIInvoiceDetails);
      },
        err => {
          console.log(err);
          this.busySpinner = false;
          this.sessionErrorService.routeToLogin(err._body);
        });
  }//end of method 

  //start method for getting distinct items row
  private selectedItemDetails(invoiceNo: string, itemCode: string, customerCode: string): boolean {
    let flag: boolean = false;
    for (let selItmDet of this.selectedInvDet) {
      if (selItmDet.invoiceNo == invoiceNo && selItmDet.itemCode == itemCode && selItmDet.customerCode == customerCode) {
        flag = true;
        break;
      }//end of if 
    }//end of for
    return flag;
  }//end of the method selectedItemDetails


  //start method deleteSelInvDetFromAllInvDetArr for deleting the ivoice details from all invoice data grid array
  // private deleteSelInvDetFromAllInvDetArr(invoiceNoParam?: string, itemCodeParam?: string) {
  //   console.log(" allInvDetails before splice ", this.allInvDetails);
  //   let indexCount: number = 0;
  //   let allInvDetailsSplice: any[] = [];
  //   allInvDetailsSplice = this.allInvDetails;
  //   for (let allInvDet of allInvDetailsSplice) {
  //     if (allInvDet.invoiceNo == invoiceNoParam && allInvDet.itemCode == itemCodeParam) {
  //       allInvDetailsSplice.splice(indexCount, 1);
  //       break;
  //     }//end of if
  //     indexCount++;
  //   }//end of for
  //   this.allInvDetails = [];
  //   this.allInvDetails = allInvDetailsSplice;
  //   console.log(" allInvDetails after splice ", this.allInvDetails);
  // }//end of the method deleteSelInvDetFromAllInvDet

  //start method deleteSelInvDetFromAllInvDetArr for deleting the ivoice details from selected invoice data grid array
  private deleteSelInvDetFromSelInvDetArr(selectedInvDetParam: any) {
    console.log(" SelInvDetails before splice ", this.selectedInvDet);
    let indexCount: number = 0;
    for (let selInvDet of this.selectedInvDet) {
      if (selInvDet.invoiceNo == selectedInvDetParam.invoiceNo && selInvDet.itemCode == selectedInvDetParam.itemCode && selInvDet.complaintTypeDesc == selectedInvDetParam.complaintTypeDesc && selInvDet.natureOfComplaintDesc == selectedInvDetParam.natureOfComplaintDesc) {
        this.selectedInvDet.splice(indexCount, 1);
        break;
      }//end of if
      indexCount++;
    }//end of for
    console.log(" SelInvDetails after splice ", this.selectedInvDet);
  }//end of the method deleteSelInvDetFromSelInvDet

  // //start method insertSelInvDetToAllInvDetArr for inserting selected inv details into selected inv detais array
  // private insertSelInvDetToAllInvDetArr(selInvDetParam?: any, invoiceNoParam?: string, itemCodeParam?: string) {
  //   if (this.allInvDetails.length == 0) {
  //     this.allInvDetails.push(selInvDetParam);
  //   } else {
  //     for (let allInvDet of this.allInvDetails) {
  //       if (allInvDet.invoiceNo == invoiceNoParam && allInvDet.itemCode != itemCodeParam) {
  //         this.allInvDetails.push(selInvDetParam);
  //         break;
  //       } else if (allInvDet.invoiceNo != invoiceNoParam) {
  //         this.allInvDetails.push(selInvDetParam);
  //         break;
  //       }//end of else if
  //     }//end of for
  //   }//end of else
  // }// end of the method insertSelInvDetToSelInvDetArr

  //start method insertSelInvDetToSelInvDetArr for inserting selected inv details into all inv detais array
  private insertSelInvDetToSelInvDetArr(selInvDetParam: any,invoiceNoParam: string,itemCodeParam: string, complaintTypeName: string,natureCmpName: string) {
    if (this.selectedInvDet.length == 0) {
      selInvDetParam.complaintTypeDesc = complaintTypeName;
      selInvDetParam.natureOfComplaintDesc = natureCmpName;
      selInvDetParam.complaintDetails = this.complaintRegisterFormGroup.value.complaintDetails;
      this.selectedInvDet.push(selInvDetParam);
    } else {
      for (let selInvDet of this.selectedInvDet) {
        if (selInvDet.invoiceNo == invoiceNoParam && (selInvDet.itemCode == itemCodeParam || selInvDet.itemCode != itemCodeParam) && (selInvDet.complaintTypeDesc == complaintTypeName || selInvDet.complaintTypeDesc != complaintTypeName) && selInvDet.natureOfComplaintDesc != natureCmpName) {
          selInvDetParam.complaintTypeDesc = "";
          selInvDetParam.complaintTypeDesc = complaintTypeName;
          selInvDetParam.natureOfComplaintDesc = "";
          selInvDetParam.natureOfComplaintDesc = natureCmpName;
          selInvDetParam.complaintDetails = "";
          selInvDetParam.complaintDetails = this.complaintRegisterFormGroup.value.complaintDetails;
          this.selectedInvDet.push(selInvDetParam);
          break;
        } else if (selInvDet.invoiceNo != selInvDetParam.invoiceNo) {
          selInvDetParam.complaintTypeDesc = complaintTypeName;
          selInvDetParam.natureOfComplaintDesc = natureCmpName;
          selInvDetParam.complaintDetails = this.complaintRegisterFormGroup.value.complaintDetails;
          this.selectedInvDet.push(selInvDetParam);
          break;
        }//end of else if
      }//end of for
    }//end of else

    this.complaintRegisterFormGroup.controls['complaintTypeId'].setValue('');
    this.complaintRegisterFormGroup.controls['complaintTypeId'].markAsUntouched();
    this.complaintRegisterFormGroup.controls['natureOfComplaintId'].setValue('');
    this.complaintRegisterFormGroup.controls['natureOfComplaintId'].markAsUntouched();
    this.complaintRegisterFormGroup.controls['complaintDetails'].setValue('');
    this.complaintTypeName = "";
    this.complaintTypeId = "";
    this.natureCmpName = "";

    console.log(" selectedInvDet ====",this.selectedInvDet);

  }// end of the method insertSelInvDetToAllInvDetArr


  //method to get all values from ComplaintDIRegisterDataService  
  private getAllDropDownVal() {
    this.busySpinner = true;
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



  //start method onCheckInvoiceNo method for checking a selected item code and creating selected invoice grid
  public onCheckInvoiceNo(selInvDetParam: any,invoiceNoParam: string,itemCodeParam:string) {
    //calling the method deleteSelInvDetFromAllInvDetArr
    //this.deleteSelInvDetFromAllInvDetArr(invoiceNoParam, itemCodeParam);
    //calling the method insertSelInvDetToSelInvDetArr
    this.insertSelInvDetToSelInvDetArr(selInvDetParam,invoiceNoParam,itemCodeParam,this.complaintTypeName,this.natureCmpName);
    console.log(" selectedInvDet", this.selectedInvDet);
  }//end of the method onCheckInvoiceNo


  //start method onCloseInvoiceNo for deleting selected invoice details
  public onCloseInvoiceNo(selectedInvDet, invoiceNoParam, itemCodeParam,complaintTypeParam,natureOfComplaintParm) {
    //calling method deleteSelInvDetFromSelInvDetArr
    this.deleteSelInvDetFromSelInvDetArr(selectedInvDet);
    //calling the method insertSelInvDetToAllInvDetArr
    //this.insertSelInvDetToAllInvDetArr(selectedInvDet, invoiceNoParam, itemCodeParam);
  }//end of the method onCloseInvoiceNo

   //method for onchanging compaintType dropdown
   public onComplaintTypeSelect(args, complaintTypeId, selectedNatureOfComplaintId?: string) {
    let compDet: string = this.complaintRegisterFormGroup.value.complaintDetails.trim();
    this.natureCmpName = "";
    this.complaintTypeId = complaintTypeId;
    if (args != null) {
      this.complaintTypeName = args.target.options[args.target.selectedIndex].text;
    }
    console.log("complaintTypeId", complaintTypeId);
    console.log("this.complaintTypeName,=========================",this.complaintTypeName);
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
    console.log("  this.natureCmpName ============================= ",this.natureCmpName);
    console.log("natureCmpIdParam", this.natureCmpName);
    if (this.natureCmpName == ("Others" || "Marking & Stenciling")) {
      this.complaintDetailsEnable = true;
      this.complaintRegisterFormGroup.controls['complaintDetails'].markAsTouched();
    }
  }// end method of onNatureTypeSelect

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

  //start method onSubmitSelectedInvDet
  public onSubmitSelectedInvDet() {
    let prevSelItmDet: any = {};
    let items: any = [];
    if (this.selectedInvDet.length > 0) {
      items = this.selectedInvDet;
    }
    prevSelItmDet.items = items;

    this.investigationReportInvoiceDetailsService.selectedItemDetails = prevSelItmDet;

    this.router.navigate([ROUTE_PATHS.RouteInvestigationReportDiAdd]);
  }//end of the method onSubmitSelectedInvDet

 public onCancel() {
    console.log(" this.complaintDIInvoiceDetailsService.selectedItemDetails ", this.investigationReportInvoiceDetailsService.selectedItemDetails);
    this.router.navigate([ROUTE_PATHS.RouteInvestigationReportDiAdd]);
  }

}//end of class


