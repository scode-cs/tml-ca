import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { ROUTE_PATHS } from '../../../router/router-paths';
import { ComplaintPIRegisterDataService } from '../../../complain/complain-pi/services/complaint-pi-register-data.service';
import { SessionErrorService } from '../../../shared/services/session-error.service';
import { LocalStorageService } from "../../../shared/services/local-storage.service";

@Component({
    selector:'ispl-comm-set',
    templateUrl:'./commercial-settlement-pi.component.html',
    styleUrls:['./commercial-settlement-pi.component.css']
})

export class CommercialSettlementPIComponent implements OnInit{
    
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
        private localStorageService: LocalStorageService,
        private complaintPIRegisterDataService: ComplaintPIRegisterDataService,
        private sessionErrorService: SessionErrorService
    ){
        this.initForm();//init form
    }
    ngOnInit(): void{
        console.log("Oninit of CommercialSettlementComponent class");
        this.getRouteParam();
        let date = new Date();
        let currentDate: string = this.datePipe.transform(date,'yyyy-MM-dd');
        this.commerCialSettlementFromGroup.controls["date"].setValue(currentDate);
        
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
        this.getInvoiceItemDetailWSCall(this.routeParam.complaintReferenceNo,this.localStorageService.appSettings.complaintRegistrationActivityId);
    }//end of method route param

  //start method getInvoiceItemDetailWSCall to get item details
  private getInvoiceItemDetailWSCall(complaintReferenceNo: string, fileActivityId: number) {
      this.busySpinner = true;//to load the spinner
    this.complaintPIRegisterDataService.getComplaintReferenceDetails(complaintReferenceNo, fileActivityId)
      .subscribe(res => {
        if (res.msgType === "Info") {
            let itemNos: any = res.details[0].itemNos;
            this.itemDetails = itemNos.items;
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
        this.router.navigate([ROUTE_PATHS.RouteHome]);
    }

}//end of class