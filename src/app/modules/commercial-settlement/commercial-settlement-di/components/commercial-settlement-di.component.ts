import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { ROUTE_PATHS } from '../../../router/router-paths';
import { ComplaintDIService } from '../../../shared/services/complaint-di.service';
import { SessionErrorService } from '../../../shared/services/session-error.service';

@Component({
    selector:'ispl-comm-set',
    templateUrl:'./commercial-settlement-di.component.html',
    styleUrls:['./commercial-settlement-di.component.css']
})

export class CommercialSettlementDIComponent implements OnInit{
    
    private routeParam: any = {
        complaintReferenceNo: '',//
        complaintStatus: ''
    }
    public commerCialSettlementFromGroup: FormGroup;
    public errorMsgObj: any = {
        errMsgShowFlag: false,
        errorMsg: ''
    }
    public itemDetails: any[] = [];// to store item deatils from response
    public busySpinner: boolean = false;//to load n stop the spinner

    constructor(
        private datePipe: DatePipe,
        private router: Router,
        private activatedroute: ActivatedRoute,
        private complaintDIService: ComplaintDIService,
        private sessionErrorService: SessionErrorService
    ){
        console.log("constructor of CommercialSettlementComponent class");
        this.initForm();//init form
    }
    ngOnInit(): void{
        console.log("Oninit of CommercialSettlementComponent class");
        this.getRouteParam();
        let date = new Date();
        let currentDate: string = this.datePipe.transform(date,'yyyy-MM-dd');
        this.commerCialSettlementFromGroup.controls["date"].setValue(currentDate);
        this.getviewComplainReferenceDetailsWSCall();
    }

    /**
     * @description
     */
    private initForm(){
        this.commerCialSettlementFromGroup = new FormGroup({
            complaintReferenceNo: new FormControl(''),
            date: new FormControl(''),
            compensation: new FormControl(''),
            remarks: new FormControl('',Validators.required)
        });
    }//end of method

    private getRouteParam(){
        let routeSubscription: Subscription;
        routeSubscription = this.activatedroute.params.subscribe(params=>{
            this.routeParam.complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
            this.routeParam.complaintStatus = params.complaintStatus ? params.complaintStatus : '';
        });
        this.commerCialSettlementFromGroup.controls["complaintReferenceNo"].setValue(this.routeParam.complaintReferenceNo);
    }//end of method route param

      //method to get complain reference details by service 
  private getviewComplainReferenceDetailsWSCall() {
    this.busySpinner = true;//to load the spinner
    let compStatus: number = this.routeParam.complaintStatus > 10? 40: 10;
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
        }else{
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

    public onCancel(){
        this.router.navigate([ROUTE_PATHS.RouteViewComplainDIStatus]);
    }

}//end of class