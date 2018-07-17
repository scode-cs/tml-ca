import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';  
import { DatePipe } from '@angular/common';
import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BusySpinnerModule } from "app/modules/widget/busy-spinner/busy-spinner.module";
import { SharedModule } from "app/modules/shared/shared.module";
import { ComplaintResolutionDIService } from "app/modules/complaint-resolution-di/services/complaint-resolution-di.service";
import { ComplaintResolutionDIComponent } from "../complaint-resolution-di/components/complaint-resolution-di.component";
import { ComplaintResoluionDIAddComponent } from "../complaint-resolution-di/components/complaint-resolution-di-add/complaint-resolution-di-add.component";

@NgModule({
  imports:      [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    HttpModule,
    BusySpinnerModule,
    SharedModule
  ],
  declarations: [
    ComplaintResolutionDIComponent,
    ComplaintResoluionDIAddComponent
  ],  
  exports: [
    ComplaintResolutionDIComponent,
   ComplaintResoluionDIAddComponent
  ],
  providers : [
    DatePipe,
    ComplaintResolutionDIService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class ComplaintResolutionDIModule { }
