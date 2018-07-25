import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { InvestigationReportDiComponent } from "./components/investigation-report-di-add/investigation-report-di-add.component";
import { InvestigationReportDiViewDetailsComponent } from "./components/investigation-report-di-view-details/investigation-report-di-view-details.component";
import { InvestigationReportDIDataService } from "./services/investigation-report-di.service";
import { InvestigationReportDIViewDataService } from "./services/investigation-report-di-view.service";
import { BusySpinnerModule } from "../widget/busy-spinner/busy-spinner.module";
import { InvestigationReportDIViewComponent } from "./components/investigation-report-di-view/investigation-report-di-view.component";
import { SharedModule } from "../shared/shared.module";
import { NgbdComplaintReferenceNoModalComponent } from "./components/investigation-report-di-add/complaint-reference-no-modal/complaint-reference-no-modal.component";
import { ComplaintReferenceNoSearchComponent } from "./components/investigation-report-di-add/complaint-reference-no-search/complaint-reference-no-search.component";

@NgModule({
  imports:      [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BusySpinnerModule,//for busy Spinner
    SharedModule
  ],
  declarations: [
    InvestigationReportDiComponent,//preli add
    InvestigationReportDIViewComponent,//preli view
    InvestigationReportDiViewDetailsComponent,//preli view details
    NgbdComplaintReferenceNoModalComponent,//comp ref no modal
    ComplaintReferenceNoSearchComponent//comp no search
  ],
  exports: [
    InvestigationReportDiComponent,//preli add
    InvestigationReportDIViewComponent,//preli view
    InvestigationReportDiViewDetailsComponent//preli view details
  ],
  providers: [
    InvestigationReportDIDataService,//preli add
    InvestigationReportDIViewDataService,//preli view
  ],
  entryComponents: [
    NgbdComplaintReferenceNoModalComponent//comp ref no modal
  ]
  
})
export class InvestigationReportDiModule { }
