import { Component, Input, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Rx';
// import { LocalStorageService } from "../../../../shared/services/local-storage.service";
// import { AppUrlsConst, WebServiceConst } from "../../../../app-config';
import { ComplaintDIRegisterDataService } from "app/modules/complain/complain-di/services/complaint-di-register-data.service";
import { ComplaintDIRegisterEmitService } from "app/modules/complain/complain-di/services/complaint-di-register-emit.service";
import { ComplaintDIInvoiceDetailsService } from "app/modules/complain/complain-di/services/complaint-di-invoice-details.service";
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionErrorService } from "../../../../shared/services/session-error.service";

@Component({
  selector: 'ngbd-complaint-reference-no-component',
  templateUrl: 'complaint-reference-no-modal.component.html',
  styleUrls: ['complaint-reference-no-modal.component.css']
})
export class NgbdComplaintReferenceNoModalComponent implements OnInit {
  @Input() modalTitle;
  @Input() complaintReferenceNo: string;
  @Input() custName: string;
  @Input() custCode: string;
  private headers: Headers;
  private items: any = {};
  //Array for selected Item
  public checkedItemArr: any[] = [];
  public selectedItemDetails: any[] = [];
  public itemDets: any = {};
  public itemsHeader: any = {}; // to store the item header
  public customerCodeError: boolean = false;//for codetomercode error
  public msgType: string;
  public complaintDIInvoiceDetails: any = {};//to show the complaint det in html page

  //spinner
  private busySpinner: any = {
    busy: true
  }

  constructor(public activeModal: NgbActiveModal,
    private http: Http, private el: ElementRef,
    private router: Router,
    // private localStorageService: LocalStorageService,
    private complaintDIRegisterDataService: ComplaintDIRegisterDataService,
    private complaintDIInvoiceDetailsService: ComplaintDIInvoiceDetailsService,
    private sessionErrorService: SessionErrorService,
    private complaintDIRegisterEmitService: ComplaintDIRegisterEmitService) {
  }//end of constructor

  ngOnInit(): void {
    console.log("this.complaintReferenceNo ===========",this.complaintReferenceNo);
    if (this.complaintReferenceNo != '') {

    } else if (this.complaintReferenceNo == '') {
      
    }//end of if
  }//end of onInit

  // start method onRedirectInvoiceSearch for redirecting to invoice search page
  onRedirectComplaintReferenceNoSearch() {
    
    
      this.router.navigate([ROUTE_PATHS.RouteComplaintReferenceNoSearch]);
    
    this.activeModal.close('Close click');
  }//end of the method onRedirectInvoiceSearch

}//end of class



