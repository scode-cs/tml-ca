import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ComplaintRegisterModule } from "../complain/complain-di/complain-di.module";
import { DashboardModule } from "../dashboard/dashboard.module";
import { TilesModule } from "../widget/Tiles/tiles.module";
import { ToastService } from "./services/toast-service";
import { LogoutModule } from "../logout/logout.module";
import { AuthenticationGuardService } from "../router/services/route-guard.service";
import { UserModule } from "../user/user.module";
import { ManageProfileModule } from "app/modules/manage-profile/manage-profile.module";
//importing PreliminaryInvestigationDiModule 19.07.17
import { PreliminaryInvestigationDiModule } from "app/modules/preliminary-investigation-di/preliminary-investigavtion-di.module";
//importing ComplaintPIRegisterModule 09.08.17
import { ComplaintPIRegisterModule } from "../complain/complain-pi/complain-pi.module";
//allocate realllocate complaint
import { AllocateReallocateModule } from "../allocate-reallocate-complaint/allocate-reallocate.module";
import { ComplaintResolutionDIModule } from "../complaint-resolution-di/complaint-resolution-di.module";
import { CAPAActionModule } from "../capa-action/capa-action.module";
import { CAPAActionPIModule } from "../capa-action-pi/capa-action-pi.module"
import { ComplaintResolutionPIModule } from "app/modules/complaint-resolution-pi/complaint-resolution-pi.module"
import { CloseComplaintPIModule } from "../close-complaint/close-complaint-pi/close-complaint-pi.module";
import { CloseComplaintDIModule } from "../close-complaint/close-complaint-di/close-complaint-di.module";
import { DashboardBothModule } from "../dashboard-both/dashboard-both.module";  
import { RoleModule } from "../role/role.module";//role module 
import { HomeDataService } from "./services/home.services"; 
import { ReportDIModule } from "../report/report-di/report-di.module";
import { InvestigationReportDiModule } from "app/modules/investigation-report-di/investigavtion-report-di.module";
import { RCADIModule } from "app/modules/rca/rca-di/rca-di.module";

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    ComplaintRegisterModule,
    DashboardModule,
    DashboardBothModule,//dashboard both
    TilesModule,
    LogoutModule,
    UserModule,
    ManageProfileModule,//manage profile 
    PreliminaryInvestigationDiModule, // new add for PreliminaryInvestigationDiModule 19.07.17
    InvestigationReportDiModule,
    ComplaintPIRegisterModule, // new add for ComplaintPIRegisterModule 09.08.17
    AllocateReallocateModule,//new add for allocate reallocate complaint
    ComplaintResolutionDIModule,// ComplaintResolutionDIModule
    CAPAActionModule,//di
    ComplaintResolutionPIModule, // new add for ComplaintResolutionPIModule
    CAPAActionPIModule, // new add for CAPAActionPIModule
    CloseComplaintDIModule,//for close complaint di
    CloseComplaintPIModule, //for close complaint pi
    RoleModule,// roleModule
    ReportDIModule,//report di module
    RCADIModule//rca di module
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  
  providers: [
    ToastService,
    HomeDataService,
    AuthenticationGuardService
  ]
})
export class HomeModule { }
