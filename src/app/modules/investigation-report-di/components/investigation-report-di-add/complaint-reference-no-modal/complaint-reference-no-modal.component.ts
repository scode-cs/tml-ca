import { Component, Input, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
// import { AppUrlsConst, WebServiceConst } from "../../../../app-config';
import { ComplaintDIRegisterDataService } from "../../../../complain/complain-di/services/complaint-di-register-data.service";
import { ComplaintDIRegisterEmitService } from "../../../../complain/complain-di/services/complaint-di-register-emit.service";
import { ComplaintDIInvoiceDetailsService } from "../../../../complain/complain-di/services/complaint-di-invoice-details.service";
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionErrorService } from "../../../../shared/services/session-error.service";

@Component({
  selector: 'ngbd-complaint-reference-no-modal-component',
  templateUrl: 'complaint-reference-no-modal.component.html',
  styleUrls: ['complaint-reference-no-modal.component.css']
})
export class NgbdComplaintReferenceNoModalComponent implements OnInit {
  @Input() modalTitle;
  @Input() invoiceNo: string;
  @Input() custName: string;
  @Input() custCode: string;


  public msgType: string;

  public complaintStatus: string = "";
  //spinner
  // public busySpinner: any = {
  //   busy: true
  // }

  constructor(public activeModal: NgbActiveModal,
    private http: Http, private el: ElementRef,
    private router: Router,
    private localStorageService: LocalStorageService,
    private complaintDIRegisterDataService: ComplaintDIRegisterDataService,
    private complaintDIInvoiceDetailsService: ComplaintDIInvoiceDetailsService,
    private sessionErrorService: SessionErrorService,
    private complaintDIRegisterEmitService: ComplaintDIRegisterEmitService) {
  }//end of constructor

  ngOnInit(): void {
    if (this.invoiceNo != '') {

      //this.invoiceSearchDetailsModel.invNo = this.invoiceNo;
    } else if (this.invoiceNo == '') {

      this.msgType = "Error";
      //this.busySpinner.busy = false;
    }//end of if
  }//end of onInit


  // start method onRedirectComplaintReferenceNoSearch for redirecting to complaint ref no search page
  onRedirectComplaintReferenceNoSearch() {


    if (this.invoiceNo === "") {
      this.router.navigate([ROUTE_PATHS.RouteComplaintReferenceNoSearch]);
    } else if (this.invoiceNo != "") {

      this.router.navigate([ROUTE_PATHS.RouteComplaintReferenceNoSearch]);
    }
    this.activeModal.close('Close click');
  }//end of the method onRedirectComplaintReferenceNoSearch

}//end of class



