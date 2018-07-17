import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { PreliminaryInvestigationDiComponent } from "app/modules/preliminary-investigation-di/components/preliminary-investigation-di-add/preliminary-investigavtion-di-add.component";
import { PreliminaryInvestigationDiViewDetailsComponent } from "./components/preliminary-investigation-di-view-details/preliminary-investigavtion-di-view-details.component";
import { PreliInvestigationDataService } from "app/modules/preliminary-investigation-di/services/preliminary-investigation-di.service";
import { PreliminaryInvestigationReportDIDataService } from "app/modules/preliminary-investigation-di/services/preliminary-investigation-di-view.service";
import { BusySpinnerModule } from "app/modules/widget/busy-spinner/busy-spinner.module";
import { PreliminaryInvestigationReportDIViewComponent } from "app/modules/preliminary-investigation-di/components/preliminary-investigation-di-view/preliminary-investigavtion-di-view.component";
import { SharedModule } from "app/modules/shared/shared.module";

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
