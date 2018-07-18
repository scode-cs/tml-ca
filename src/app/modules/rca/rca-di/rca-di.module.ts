import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { BusySpinnerModule } from "app/modules/widget/busy-spinner/busy-spinner.module";
import { DatePipe } from '@angular/common';
import { SharedModule } from "app/modules/shared/shared.module";
import { RCADIAddEditComponent } from "../rca-di/components/rca-di-add-edit/rca-di-add-edit.component";

@NgModule({
  imports:      [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BusySpinnerModule,
    SharedModule
  ],
  declarations: [
    RCADIAddEditComponent
  ],
  
  exports: [
    RCADIAddEditComponent
  ],
  providers : [    
    DatePipe,   
  ]
})
export class RCADIModule { }