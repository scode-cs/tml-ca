import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { DatePipe } from '@angular/common';
import { BusySpinnerModule } from "app/modules/widget/busy-spinner/busy-spinner.module";
import { SharedModule } from "app/modules/shared/shared.module";
import { CloseComplaintDIService } from "app/modules/close-complaint/close-complaint-di/services/close-complaint-di.service";
import { CloseComplaintDIComponent } from "../../close-complaint/close-complaint-di/components/close-complaint-di.component";
import { CloseComplaintDIAddComponent } from '../close-complaint-di/components/close-complaint-di-add/close-complaint-di-add.component';

@NgModule({
  imports:      [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BusySpinnerModule,
    SharedModule
  ],
  declarations: [
    CloseComplaintDIComponent,
    CloseComplaintDIAddComponent
  ],  
  exports: [
    CloseComplaintDIComponent,
    CloseComplaintDIAddComponent
  ]
  ,
  providers : [
    CloseComplaintDIService,
  ]
})
export class CloseComplaintDIModule { }
