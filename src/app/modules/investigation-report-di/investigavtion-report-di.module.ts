import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { InvestigationReportDiComponent } from "app/modules/investigation-report-di/components/investigation-report-di-add/investigation-report-di-add.component";
import { ComplaintReferenceNoSearchComponent } from "app/modules/investigation-report-di/components/investigation-report-di-add/complaint-reference-no-search/complaint-reference-no-search.component";
import { InvestigationReportDiViewDetailsComponent } from "./components/investigation-report-di-view-details/investigation-report-di-view-details.component";
import { InvestigationReportDIDataService } from "app/modules/investigation-report-di/services/investigation-report-di.service";
import { InvestigationReportDIViewDataService } from "app/modules/investigation-report-di/services/investigation-report-di-view.service";
import { BusySpinnerModule } from "app/modules/widget/busy-spinner/busy-spinner.module";
import { InvestigationReportDIViewComponent } from "app/modules/investigation-report-di/components/investigation-report-di-view/investigation-report-di-view.component";
import { SharedModule } from "app/modules/shared/shared.module";
import { NgbdComplaintReferenceNoModalComponent } from "app/modules/investigation-report-di/components/investigation-report-di-add/complaint-reference-no-modal/complaint-reference-no-modal.component";
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
    NgbdComplaintReferenceNoModalComponent,//complaint refrence no modal
    ComplaintReferenceNoSearchComponent//complaint reference no search
  ],
  entryComponents: [NgbdComplaintReferenceNoModalComponent],  
  exports: [
    InvestigationReportDiComponent,//preli add
    InvestigationReportDIViewComponent,//preli view
    InvestigationReportDiViewDetailsComponent,//preli view details
    ComplaintReferenceNoSearchComponent//complaint reference no search
  ],
  providers: [
    InvestigationReportDIDataService,//preli add
    InvestigationReportDIViewDataService,//preli view
  ]
  
})
export class InvestigationReportDiModule { }
