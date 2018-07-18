 import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { ToastService } from "../../../../../home/services/toast-service";
// import { Router, ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs/Subscription';//to get route param
// import { ROUTE_PATHS } from '../../../../../router/router-paths';
// import { LocalStorageService } from "../../../../../shared/services/local-storage.service";
// import { ComplaintDIRegisterDataService } from "app/modules/complain/complain-di/services/complaint-di-register-data.service";
// import { ComplaintDIRegisterEmitService } from "app/modules/complain/complain-di/services/complaint-di-register-emit.service";
// import { ComplaintDIInvoiceDetailsService } from "app/modules/complain/complain-di/services/complaint-di-invoice-details.service";
// import { SessionErrorService } from "../../../../../shared/services/session-error.service";

@Component({
  selector: 'ispl-complaint-reference-no-search-form',
  templateUrl: 'complaint-reference-no-search.component.html',
  styleUrls: ['complaint-reference-no-search.component.css']
})
export class ComplaintReferenceNoSearchComponent implements OnInit {
  public custName: string = "";
  public title: string = "";
  public custCode: string = "";
  public salesGroup: string = "";
  public salesOffice: string = "";
  public compRefNo: string = "";

  public allInvDetails: any[] = [];//array for showing all invoice dets


  public complaintPIInvoiceDetails: any = {};//to show the complaint det in html page

  public invDetailsItemsHeader: any = {};

  public selectedInvDet: any[] = [];// array for showing selected invoice dets

  public searchFormGroup: FormGroup;

  //for busy spinner
  public busySpinner: any = {
    itemHeaderSpinner: true,//for grid itemHeaders
    gridBusy: true,//for grid
    busy: true
  };

  constructor(
  ) {
  }//end of constructor

  ngOnInit(): void {


   


  }//end of onInit
}//end of class


