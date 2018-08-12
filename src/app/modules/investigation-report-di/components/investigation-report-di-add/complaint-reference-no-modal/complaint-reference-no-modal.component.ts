import { Component, Input, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
// import { AppUrlsConst, WebServiceConst } from "../../../../app-config';
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
    private sessionErrorService: SessionErrorService) {
  }//end of constructor

  ngOnInit(): void {
  }//end of onInit


  // start method onRedirectComplaintReferenceNoSearch for redirecting to complaint ref no search page
  onRedirectComplaintReferenceNoSearch() {
    this.router.navigate([ROUTE_PATHS.RouteComplaintReferenceNoSearch,'','']);
    this.activeModal.close('Close click');
  }//end of the method onRedirectComplaintReferenceNoSearch

}//end of class



