import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BusySpinnerModule } from 'app/modules/widget/busy-spinner/busy-spinner.module';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'app/modules/shared/shared.module';
import { CADIAddEditComponent } from '../ca-di/components/ca-di-add-edit/ca-di-add-edit.component';
import { CADIService } from '../ca-di/services/ca-di-add-edit.service';
import { CADIViewDetailsComponent } from '../ca-di/components/ca-di-view-details/ca-di-view-details.component';
@NgModule({
  imports:      [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BusySpinnerModule,
    SharedModule
  ],
  declarations: [
    CADIAddEditComponent,//add/edit
    CADIViewDetailsComponent//view
  ],
  
  exports: [
    CADIAddEditComponent,//add/edit
    CADIViewDetailsComponent//view
  ],
  providers : [    
    DatePipe,  
    CADIService//service  
  ]
})
export class CADIModule { }