import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { PreliminaryInvestigationDiComponent } from "./components/preliminary-investigation-di-add/preliminary-investigavtion-di-add.component";
import { PreliminaryInvestigationDiViewDetailsComponent } from "./components/preliminary-investigation-di-view-details/preliminary-investigavtion-di-view-details.component";
import { PreliInvestigationDataService } from "./services/preliminary-investigation-di.service";
import { PreliminaryInvestigationReportDIDataService } from "./services/preliminary-investigation-di-view.service";
import { BusySpinnerModule } from "../widget/busy-spinner/busy-spinner.module";
import { PreliminaryInvestigationReportDIViewComponent } from "./components/preliminary-investigation-di-view/preliminary-investigavtion-di-view.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports:      [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BusySpinnerModule,//for busy Spinner
    SharedModule
  ],
  declarations: [
    PreliminaryInvestigationDiComponent,//preli add
    PreliminaryInvestigationReportDIViewComponent,//preli view
    PreliminaryInvestigationDiViewDetailsComponent//preli view details
  ],
  exports: [
    PreliminaryInvestigationDiComponent,//preli add
    PreliminaryInvestigationReportDIViewComponent,//preli view
    PreliminaryInvestigationDiViewDetailsComponent//preli view details
  ],
  providers: [
    PreliInvestigationDataService,//preli add
    PreliminaryInvestigationReportDIDataService,//preli view
  ]
  
})
export class PreliminaryInvestigationDiModule { }
