import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { AddRoleComponent } from "app/modules/role/components/role-add/role-add.component";
import { ViewRoleComponent } from "app/modules/role/components/role-view/role-view.component";
import { AddRoleDataService } from "./services/add-role-data.service";
import { ViewRoleDataService } from "./services/view-role-data.service";
import { BusySpinnerModule } from "app/modules/widget/busy-spinner/busy-spinner.module";
import { SharedModule } from "app/modules/shared/shared.module";


@NgModule({
  imports:      [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    RouterModule, //for router
    BusySpinnerModule,//for busy Spinner
    SharedModule
  ],
  declarations: [
    AddRoleComponent,
    ViewRoleComponent
  ],
 
  exports: [
    AddRoleComponent,
    ViewRoleComponent
   
  ],
  providers : [
    AddRoleDataService,//for add user
    ViewRoleDataService//for view user
  ]
})
export class RoleModule { }
