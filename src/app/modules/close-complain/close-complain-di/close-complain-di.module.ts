import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BusySpinnerModule } from 'app/modules/widget/busy-spinner/busy-spinner.module';
import { SharedModule } from 'app/modules/shared/shared.module';
import { CloseComplainDIService } from 'app/modules/close-complain/close-complain-di/services/close-complain-di.service';
import { CloseComplainDIAddEditComponent } from '../close-complain-di/components/close-complain-di-add-edit/close-complain-di-add-edit.component';
import { CloseComplainDIViewDetailsComponent } from '../close-complain-di/components/close-complain-di-view-details/close-complain-di-view-details.component';

@NgModule({
  imports:      [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BusySpinnerModule,
    SharedModule
  ],
  declarations: [
    CloseComplainDIAddEditComponent,//close complain add/edit
    CloseComplainDIViewDetailsComponent//close complain view details
   
  ],  
  exports: [
    CloseComplainDIAddEditComponent,//close complain add/edit
    CloseComplainDIViewDetailsComponent//close complain view details
  ]
  ,
  providers : [
    CloseComplainDIService
  ]
})
export class CloseComplainDIModule { }
