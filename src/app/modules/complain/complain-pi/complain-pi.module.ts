import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ComplaintPIRegisterComponent } from './components/complain-pi-register/complaint-pi-register.component';
import { ComplainPIViewComponent } from "./components/complain-pi-view/complain-pi-view.component";
import { CommonModule } from "@angular/common";
import { ComplaintPIRegisterDataService } from "./services/complaint-pi-register-data.service";
import { ViewComplaintPIDataService } from "./services/complaint-pi-view-data.service";
import { BusySpinnerModule } from "app/modules/widget/busy-spinner/busy-spinner.module";
import { DatePipe } from '@angular/common';
import { SharedModule } from "app/modules/shared/shared.module";
import { NgbdComplaintPIRegisterModalComponent } from 'app/modules/complain/complain-pi/components/complain-pi-register/complaint-pi-register-modal/complaint-pi-register-modal.component';
import { ComplaintPIRegisterEmitService } from "./services/complaint-pi-register-emit.service";
import { ComplaintPIInvoiceSearchComponent } from './components/complain-pi-register/complain-pi-invoice-search/complaint-pi-invoice-search.component';
//for pi customer search
import { ComplaintPICustomerSearchComponent } from './components/complain-pi-register/complain-pi-customer-search/complaint-pi-customer-search.component';
import { InvoiceSearchDetailsModel } from "app/modules/complain/complain-pi/models/invoice-search-details.model";


@NgModule({
  imports:      [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BusySpinnerModule,
    SharedModule
  ],
  declarations: [
    ComplaintPIRegisterComponent,
    ComplainPIViewComponent,
    NgbdComplaintPIRegisterModalComponent,
    ComplaintPIInvoiceSearchComponent,
    ComplaintPICustomerSearchComponent
  ],  
  entryComponents: [NgbdComplaintPIRegisterModalComponent],
  exports: [
    ComplaintPIRegisterComponent,
    ComplainPIViewComponent,
    ComplaintPIInvoiceSearchComponent,
    ComplaintPICustomerSearchComponent,
  ],
  providers : [
    ComplaintPIRegisterDataService,
    ComplaintPIRegisterEmitService,
    ViewComplaintPIDataService,
    InvoiceSearchDetailsModel,
    ComplaintPIRegisterEmitService,
    DatePipe
  ]
})
export class ComplaintPIRegisterModule { }