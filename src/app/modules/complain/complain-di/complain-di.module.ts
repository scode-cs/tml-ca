import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ComplaintDIRegisterComponent } from './components/complain-di-register/complaint-di-register.component';
import { ComplaintDIViewDetailsComponent } from './components/complain-di-view-details/complaint-di-view-details.component';
import { ComplainDIViewComponent } from "./components/complain-di-view/complain-di-view.component";
import { CommonModule } from "@angular/common";
import { ComplaintDIRegisterDataService } from "./services/complaint-di-register-data.service";
import { ViewComplaintDIDataService } from "./services/complaint-di-view-data.service";
import { BusySpinnerModule } from "app/modules/widget/busy-spinner/busy-spinner.module";
import { DatePipe } from '@angular/common';
import { SharedModule } from "app/modules/shared/shared.module";
import { NgbdComplaintDIRegisterModalComponent } from "app/modules/complain/complain-di/components/complain-di-register/complaint-di-register-modal/complaint-di-register-modal.component";
import { ComplaintDIRegisterEmitService } from "./services/complaint-di-register-emit.service"
import { ComplaintDIInvoiceDetailsService } from "./services/complaint-di-invoice-details.service"
//for di customer search
import { ComplaintDIInvoiceSearchComponent } from './components/complain-di-register/complain-di-invoice-search/complaint-di-invoice-search.component';
import { ComplaintDICustomerSearchComponent } from './components/complain-di-register/complain-di-customer-search/complaint-di-customer-search.component';

@NgModule({
  imports:      [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BusySpinnerModule,
    SharedModule
  ],
  declarations: [
    ComplaintDIRegisterComponent,
    ComplainDIViewComponent,
    ComplaintDIViewDetailsComponent,
    NgbdComplaintDIRegisterModalComponent,
    ComplaintDIInvoiceSearchComponent,
    ComplaintDICustomerSearchComponent
  ],
  entryComponents: [NgbdComplaintDIRegisterModalComponent],  
  exports: [
    ComplaintDIRegisterComponent,
    ComplainDIViewComponent,
    ComplaintDIViewDetailsComponent,
    ComplaintDIInvoiceSearchComponent,
    ComplaintDICustomerSearchComponent
  ],
  providers : [
    ComplaintDIRegisterDataService,
    ViewComplaintDIDataService,
    DatePipe,
    ComplaintDIRegisterEmitService,
    ComplaintDIInvoiceDetailsService
  ]
})
export class ComplaintRegisterModule { }
