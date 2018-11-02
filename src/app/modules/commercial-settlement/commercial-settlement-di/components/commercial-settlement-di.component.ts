import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { ROUTE_PATHS } from '../../../router/router-paths';
import { ComplaintDIService } from '../../../shared/services/complaint-di.service';
import { SessionErrorService } from '../../../shared/services/session-error.service';

@Component({
    selector: 'ispl-comm-set',
    templateUrl: './commercial-settlement-di.component.html',
    styleUrls: ['./commercial-settlement-di.component.css']
})

export class CommercialSettlementDIComponent implements OnInit {

    private routeParam: any = {
        complaintReferenceNo: '',//
        complaintStatus: ''
    }
    private totalCompensationAmount: number = 0;
    public commerCialSettlementFromGroup: FormGroup;
    public errorMsgObj: any = {
        errMsgShowFlag: false,
        errorMsg: ''
    }
    public itemDetails: any[] = [];// to store item deatils from response
    public busySpinner: boolean = false;//to load n stop the spinner
    public invoiceItemErrFlag: boolean = false;//to check invoice item have error or not 
    public itemListFormGroup: FormGroup;//to create dynamic formControl for compensation qty n rate
    constructor(
        private datePipe: DatePipe,
        private router: Router,
        private activatedroute: ActivatedRoute,
        private complaintDIService: ComplaintDIService,
        private sessionErrorService: SessionErrorService
    ) {
        console.log("constructor of CommercialSettlementComponent class");
        this.initForm();//init form
    }
    ngOnInit(): void {
        console.log("Oninit of CommercialSettlementComponent class");
        this.getRouteParam();
        let date = new Date();
        let currentDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
        this.commerCialSettlementFromGroup.controls["date"].setValue(currentDate);
        this.getviewComplainReferenceDetailsWSCall();
    }

    /**
     * @description
     */
    private initForm() {
        this.commerCialSettlementFromGroup = new FormGroup({
            complaintReferenceNo: new FormControl(''),
            date: new FormControl(''),
            totalCompensationAmount: new FormControl(''),
            compensation: new FormControl(''),
            remarks: new FormControl('', Validators.required)
        });

        // creating initial formcontrol for itemListFormGroup 
        this.itemListFormGroup = new FormGroup({
            dummyformcontrol: new FormControl(''),
        });
    }//end of method

    private getRouteParam() {
        let routeSubscription: Subscription;
        routeSubscription = this.activatedroute.params.subscribe(params => {
            this.routeParam.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
            this.routeParam.complaintStatus = params.complaintStatus ? params.complaintStatus : '';
        });
        this.commerCialSettlementFromGroup.controls["complaintReferenceNo"].setValue(this.routeParam.complaintReferenceNo);
    }//end of method route param

    //method to get complain reference details by service 
    private getviewComplainReferenceDetailsWSCall() {
        this.busySpinner = true;//to load the spinner
        let compStatus: number = this.routeParam.complaintStatus > 10 ? 40 : 10;
        this.complaintDIService.getComplainViewDetails(this.routeParam.complaintReferenceNo, compStatus).
            subscribe(res => {
                console.log("res of ref det::::", res);
                if (res.msgType === 'Info') {
                    let json: any = JSON.parse(res.mapDetails);
                    console.log("json::::", json);
                    let lastIndex = json ? json.length - 1 : 0;
                    let complainDetailsAutoId: number = json[lastIndex].complaintDetailsAutoId;
                    this.getInvoiceItemDetailWSCall(this.routeParam.complaintReferenceNo, compStatus, complainDetailsAutoId);//inv item details

                } else {
                    this.errorMsgObj.errMsgShowFlag = true;
                    this.errorMsgObj.errorMsg = res.msg;
                    this.busySpinner = false;//to stop the spinner
                }
            },
                err => {
                    console.log(err);
                    this.errorMsgObj.errMsgShowFlag = true;
                    this.errorMsgObj.errorMsg = err.msg;
                    this.busySpinner = false;//to stop the spinner
                    this.sessionErrorService.routeToLogin(err._body);
                });
    }//end of method

    //start method getInvoiceItemDetailWSCall to get item details
    private getInvoiceItemDetailWSCall(complaintReferenceNo: string, pageActivityId: number, complainDetailsAutoId: number) {
        this.complaintDIService.getInvoiceItemDetail(complaintReferenceNo, pageActivityId, complainDetailsAutoId).
            subscribe(res => {
                if (res.msgType === "Info") {
                    let invItemDeatilsJson: any = JSON.parse(res.mapDetails);
                    this.itemDetails = invItemDeatilsJson;
                    this.busySpinner = false;
                    console.log("item details =========.........>>>>>>>>>", this.itemDetails);
                    this.createItemFormgroupForSelectedItem();//creating dynamic formcontrol
                } else {
                    this.errorMsgObj.errMsgShowFlag = true;
                    this.errorMsgObj.errorMsg = res.msg;
                    this.busySpinner = false;//stop the spinner
                }
            },
                err => {
                    console.log(err);
                    this.errorMsgObj.errMsgShowFlag = true;
                    this.errorMsgObj.errorMsg = err.msg;
                    this.busySpinner = false;
                    this.sessionErrorService.routeToLogin(err._body);
                });
    }//end method of getInvoiceItemDetailWSCall

    //method to create dynamic formcontrol
    private createItemFormgroupForSelectedItem() {
        //creating an object for formgroup
        let itmFrmgroup: any = {};
        // iterating arr to creating dynamic formcontrol
        this.itemDetails.forEach(itemel => {
            console.log(" formGroup created");
            //pushing hardcoded compensationQty 
            if (!itemel.compensationQty) {
                itemel.compensationQty = 0;
            }
            if (!itemel.itemRate) {
                itemel.itemRate = 0;
            }
            if (!itemel.settlementCost) {
                itemel.settlementCost = 0;
            }
            //end of pushing hardcoded compensationQty
            // creating key
            let key = itemel.slNo;
            let compensationQtyKey = key + "_" + "compensationQty";
            let itemRateKey = key + "_" + "itemRate";

            //creating dynamic formcontrol
            itemel.compensationQtyKey = compensationQtyKey;
            itemel.itemRateKey = itemRateKey;

            itmFrmgroup[compensationQtyKey] = new FormControl(itemel.compensationQty, Validators.required);
            itmFrmgroup[itemRateKey] = new FormControl(itemel.itemRate, Validators.required);

            //creating formgroup
            this.itemListFormGroup = new FormGroup(itmFrmgroup);
        });
        console.log("ItemArr====", this.itemDetails);
    }//end of the method 

      //to generate total compensation amount
  private generateTotalCompensationAmount() {
    this.totalCompensationAmount = 0;    
    for (let itemel of this.itemDetails) {
      this.totalCompensationAmount = this.totalCompensationAmount + parseFloat(itemel.settlementCost);
    }//end of for
    this.totalCompensationAmount = parseFloat(this.totalCompensationAmount.toFixed(2));
    this.commerCialSettlementFromGroup.controls['totalCompensationAmount'].setValue(this.totalCompensationAmount);

  }//end of the method

    //start method of complaintQtyErrorCorrection
  private compensationQtyItemRateErrorCorrection() {
    for (let itemEl of this.itemDetails) {
      if (itemEl.compensationQtyErrFlag || itemEl.itemRateErrFlag) {
        this.invoiceItemErrFlag = true;
        break;
      } else if ((itemEl.compensationQtyErrFlag === false || itemEl.compensationQtyErrFlag === undefined) && (itemEl.itemRateErrFlag === false || itemEl.itemRateErrFlag === undefined) ) {
        this.invoiceItemErrFlag = false;
      }
    }//end of for
  }//end of the method complaintQtyErrorCorrection   

      // to change unit dropdown value 17.09.18
  public onCompensationAndItemRateChanges(checkItmParam: any) {
    console.log(" checkItmParam === ", checkItmParam);
    // let qty: number = 0;
    let compensationQty: number = 0;
    let itemRate: number = 0;
    this.itemDetails.forEach(checkItm => {
      if (checkItm.slNo == checkItmParam.slNo) {
        compensationQty = 0;
        itemRate = 0;
        for (let itmList in this.itemListFormGroup.value) {
          let arr: string[] = itmList.split('_');
          console.log(" arr ==== ", arr);
          if (arr.length == 2) {
            if (arr[0] == checkItmParam.slNo) {
              console.log(" slno mateched ");
              if (arr[1] == "compensationQty") {
                compensationQty = this.itemListFormGroup.controls[itmList].value;
                if (compensationQty == 0 || compensationQty < 0 || compensationQty == null) {
                  checkItm.compensationQtyErrFlag = true;
                  if (compensationQty == 0 || compensationQty == null) {
                    checkItm.compensationQtyErrDesc = 'Compensation Quantity can′t be zero or empty';
                  } else if (compensationQty < 0) {
                    checkItm.compensationQtyErrDesc = 'Compensation Quantity can′t be less than or equal to zero';
                  }//end of else if
                } else {
                    if(compensationQty > checkItm.complaintQtyInMtrs) {
                        checkItm.compensationQtyErrFlag = true;
                        checkItm.compensationQtyErrDesc = 'Compensation Quantity can′t be greater than Complaint Qty';
                    }else{                        
                        checkItm.compensationQtyErrFlag = false;
                        checkItm.compensationQtyErrDesc = '';
                    }
                }//end of else
                console.log(" got value compensationQty == ", compensationQty);
              } else if (arr[1] == "itemRate") {
                itemRate = this.itemListFormGroup.controls[itmList].value;
                if (itemRate == 0 || itemRate < 0 || itemRate == null) {
                  checkItm.itemRateErrFlag = true;
                  if (itemRate == 0 || itemRate == null) {
                    checkItm.itemRateErrDesc = 'Item Rate can′t be zero or empty';
                  } else if (itemRate < 0) {
                    checkItm.itemRateErrDesc = 'Item Rate can′t be less than or equal to zero';
                  }//end of else if
                } else {
                  checkItm.itemRateErrFlag = false;
                  checkItm.itemRateErrDesc = '';
                }//end of else
                console.log(" got value itemRate == ", itemRate);
              } 
            }//end if of slno and controlname 1st element
          }//end if of length to splited array
        }//end of  for loop of itemListFormGroup

        if(compensationQty > 0 && itemRate > 0) {
            checkItm.settlementCost = compensationQty * itemRate;
        }else{
            checkItm.settlementCost = 0;
        }
      }//end if of slno check between checkedItemArr element and checked item param element
    });//end of for each loop of checkedItemArr 

        this.compensationQtyItemRateErrorCorrection();
        this.generateTotalCompensationAmount();

    console.log(" itemDetails == ", this.itemDetails);
  }//end of the method 17.09.18

    public onCancel() {
        this.router.navigate([ROUTE_PATHS.RouteViewComplainDIStatus]);
    }

}//end of class