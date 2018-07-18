import { Routes } from "@angular/router";
import { ROUTER_PATHS } from "./router-paths";
import { HomeComponent } from '../home/components/home.component';
import { ComplaintDIRegisterComponent } from "../complain/complain-di/components/complain-di-register/complaint-di-register.component";
import { DashboardComponent } from "../dashboard/components/dashboard.component";
import { ComplainDIViewComponent } from "../complain/complain-di/components/complain-di-view/complain-di-view.component";
import { AuthenticationGuardService } from "./services/route-guard.service";
import { AddUserComponent } from "../user/components/user-add/user-add.component";
import { ViewUserComponent } from "../user/components/user-view/user-view.component";
import { ManageProfileComponent } from "../manage-profile/components/manage-profile.component"
//importing PreliminaryInvestigationDiComponent 19.07.17
//import { PreliminaryInvestigationDiComponent } from "../preliminary-investigation-di/components/preliminary-investigation-di-add/preliminary-investigavtion-di-add.component";
import { InvestigationReportDiComponent } from "../investigation-report-di/components/investigation-report-di-add/investigation-report-di-add.component";
//import { PreliminaryInvestigationReportDIViewComponent } from "../preliminary-investigation-di/components/preliminary-investigation-di-view/preliminary-investigavtion-di-view.component";
import { InvestigationReportDIViewComponent } from "../investigation-report-di/components/investigation-report-di-view/investigation-report-di-view.component";
import { ComplaintPIRegisterComponent } from "../complain/complain-pi/components/complain-pi-register/complaint-pi-register.component";
import { ComplainPIViewComponent } from "../complain/complain-pi/components/complain-pi-view/complain-pi-view.component";
import { AllocateComplaintComponent } from "../allocate-reallocate-complaint/components/allocate-complaints/allocate-complaint.component";
import { AllocateComplaintAddComponent } from "../allocate-reallocate-complaint/components/allocate-complaint-add/allocate-complaint-add.component";
import { ComplaintResolutionDIComponent } from "../complaint-resolution-di/components/complaint-resolution-di.component";
import { ComplaintResoluionDIAddComponent } from "../complaint-resolution-di/components/complaint-resolution-di-add/complaint-resolution-di-add.component";
//importing capa action component
import { CAPAActionComponent } from "../capa-action/components/capa-action.component";
import { CAPAActionDIAddComponent } from "../capa-action/components/capa-action-di-add/capa-action-di-add.component";
//pi capa and reso
import { CAPAActionPIComponent } from "../capa-action-pi/components/capa-action-pi.component";
import { CAPAActionPIAddComponent } from "../capa-action-pi/components/capa-action-pi-add/capa-action-pi-add.component";
import { ComplaintResolutionPIComponent } from "app/modules/complaint-resolution-pi/components/complaint-resolution-pi.component";
import { ComplaintResoluionPIAddComponent } from "app/modules/complaint-resolution-pi/components/complaint-resolution-pi-add/complaint-resolution-pi-add.component";
// for close complaint pi
import { CloseComplaintPIComponent } from "../close-complaint/close-complaint-pi/components/close-complaint-pi.component";
import { CloseComplaintPIAddComponent } from "../close-complaint/close-complaint-pi/components/close-complaint-pi-add/close-complaint-pi-add.component";
// for close complaint di
import { CloseComplaintDIComponent } from "../close-complaint/close-complaint-di/components/close-complaint-di.component";
import { CloseComplaintDIAddComponent } from "../close-complaint/close-complaint-di/components/close-complaint-di-add/close-complaint-di-add.component";
//for pi customer search
import { ComplaintPICustomerSearchComponent } from '../complain/complain-pi/components/complain-pi-register/complain-pi-customer-search/complaint-pi-customer-search.component';
//for pi invoice search
import { ComplaintPIInvoiceSearchComponent } from '../complain/complain-pi/components/complain-pi-register/complain-pi-invoice-search/complaint-pi-invoice-search.component';
//for di customer search
import { ComplaintDICustomerSearchComponent } from '../complain/complain-di/components/complain-di-register/complain-di-customer-search/complaint-di-customer-search.component';
//for di invoice search
import { ComplaintDIInvoiceSearchComponent } from '../complain/complain-di/components/complain-di-register/complain-di-invoice-search/complaint-di-invoice-search.component';
import { AddRoleComponent } from "../role/components/role-add/role-add.component";
import { ViewRoleComponent } from "../role/components/role-view/role-view.component";
//import { PreliminaryInvestigationDiViewDetailsComponent } from "../preliminary-investigation-di/components/preliminary-investigation-di-view-details/preliminary-investigavtion-di-view-details.component";
import { InvestigationReportDiViewDetailsComponent } from "../investigation-report-di/components/investigation-report-di-view-details/investigation-report-di-view-details.component";

//to view the complaints in details
import { ComplaintDIViewDetailsComponent } from '../complain/complain-di/components/complain-di-view-details/complaint-di-view-details.component';
import { ReportsDIViewComponent } from "../report/report-di/components/report-di-view/report-di-view.component";
import { ReportDIViewDetailsComponent } from "../report/report-di/components/report-di-view-details/report-di-view-details.component";
import { ComplaintReferenceNoSearchComponent } from "../investigation-report-di/components/investigation-report-di-add/complaint-reference-no-search/complaint-reference-no-search.component";
export const HOME_ROUTES: Routes = [
  {
    path: ROUTER_PATHS.HomeRouter,
    component: HomeComponent,
    canActivate: [ AuthenticationGuardService ],
    children: [
      {
        path: '',
        redirectTo: ROUTER_PATHS.DashboardRouter,
        pathMatch: 'full',
      },
      {
        path: ROUTER_PATHS.DashboardRouter,
        component: DashboardComponent,
      },
      {
        path: ROUTER_PATHS.MisReportViewRouter,//mis report grid view
        component: ReportsDIViewComponent
      },
      {
        path: ROUTER_PATHS.MisReportViewDetailsRouter,//mis report view details
        component: ReportDIViewDetailsComponent
      },
      {
        path: ROUTER_PATHS.ComplainDIRegisterRouter,//complaint di reg
        component: ComplaintDIRegisterComponent
      },
      {
        path: ROUTER_PATHS.ModifyComplaintDIRouter,//modify complaint di by clicking on edit button
        component: ComplaintDIRegisterComponent
      },
      {
        path: ROUTER_PATHS.ComplainDIViewModifyRouter,//view di page from menu for view or modify
        component: ComplainDIViewComponent
      },
      {
        path: ROUTER_PATHS.ComplainDIViewDetailsRouter,//for view complaint details for single view
        component: ComplaintDIViewDetailsComponent
      },
      {
        path: ROUTER_PATHS.DIViewComplaintWithParameterRouter,
        component: ComplainDIViewComponent
      },
      {
        //di invoice search
        path: ROUTER_PATHS.ComplaintDIInvoiceSearch,
        component:ComplaintDIInvoiceSearchComponent
      },
      {
        //di customer search
        path: ROUTER_PATHS.ComplaintDICustomerSearch,
        component: ComplaintDICustomerSearchComponent        
      },   
      {
        //new add for ComplaintPIRegister 09.08.17
        path: ROUTER_PATHS.ComplainPIRegisterRouter,//complaint pi reg
        component: ComplaintPIRegisterComponent
      },
      //new add for ComplaintPIView 10.08.17
      {
        path: ROUTER_PATHS.ComplainPIViewRouter,//complaint pi view
        component: ComplainPIViewComponent
      },
      {
        path: ROUTER_PATHS.PIViewComplaintWithParameterRouter,
        component: ComplainPIViewComponent
      },
      {
        path: ROUTER_PATHS.modifyPIComplaintRouter,//modify complaint pi
        component: ComplaintPIRegisterComponent
      },
      {
        //pi invoice search
        path: ROUTER_PATHS.ComplaintPIInvoiceSearch,
        component:ComplaintPIInvoiceSearchComponent
      },
      {
        //pi customer search
        path: ROUTER_PATHS.ComplaintPICustomerSearch,
        component: ComplaintPICustomerSearchComponent
      
      },
      
      {
        path: ROUTER_PATHS.AddUserRouter,//add user
        component: AddUserComponent
      },
      {
        path: ROUTER_PATHS.ModifyUserRouter,//modify user
        component: AddUserComponent
      },
      {
        path: ROUTER_PATHS.ViewUserRouter,
        component: ViewUserComponent
      },
      {
        path: ROUTER_PATHS.AddRoleRouter,//add role
        component: AddRoleComponent
      },
      {
        path: ROUTER_PATHS.ModifyRoleRouter,//modify role
        component: AddRoleComponent
      },
      {
        path: ROUTER_PATHS.ViewRoleRouter,
        component: ViewRoleComponent
      },
      {
        path: ROUTER_PATHS.ManageProfileRouter,
        component: ManageProfileComponent
      },
      //new add for PreliminaryInvestigationDiRouter and PreliminaryInvestigationDiComponent 19.07.17
      // {
      //   path: ROUTER_PATHS.PreliminaryInvestigationDiAddRouter,
      //   component: PreliminaryInvestigationDiComponent
      // },//
      {
        path: ROUTER_PATHS.InvestigationReportDiAddRouter,
        component: InvestigationReportDiComponent
      },//
      //new add for preli view or edit from menu
      // {
      //   path: ROUTER_PATHS.ViewModifyPreliminaryInvestigationRouter,
      //   component: PreliminaryInvestigationReportDIViewComponent
      // },
      {
        path: ROUTER_PATHS.ViewModifyInvestigationReportRouter,
        component: InvestigationReportDIViewComponent
      },
      // {//preli view details
      //   path: ROUTER_PATHS.ViewDetailsPreliminaryInvestigationDiRouter,
      //   component: PreliminaryInvestigationDiViewDetailsComponent
      // },  
      {//preli view details
        path: ROUTER_PATHS.ViewDetailsInvestigationReportDiRouter,
        component: InvestigationReportDiViewDetailsComponent
      },      
      // {//preli modify
      //   path: ROUTER_PATHS.ModifyPreliminaryInvestigationDiRouter,//modify user
      //   component: PreliminaryInvestigationDiComponent
      // },
      {//preli modify
        path: ROUTER_PATHS.ModifyInvestigationReportDiRouter,//modify user
        component: InvestigationReportDiComponent
      },
      {
        path: ROUTER_PATHS.ComplaintReferenceNoSearch,//complaint reference no search
        component: ComplaintReferenceNoSearchComponent
      },
      {//add allocate complaint route
        path: ROUTER_PATHS.AddAllocateComplaint,//allocate complaint route
        component: AllocateComplaintAddComponent
      },
      {//view allocate complaint route
        path: ROUTER_PATHS.AllocateComplaint,//allocate complaint route
        component: AllocateComplaintComponent
      },
      {//modify allocate complaint route
        path: ROUTER_PATHS.ModifyAllocateComplaint,//allocate complaint route
        component: AllocateComplaintAddComponent
      },     
      {
        path: ROUTER_PATHS.ComplaintResolutionDI,
        component: ComplaintResolutionDIComponent
      },
      {
        path: ROUTER_PATHS.ModifyComplaintResolutionDI,
        component: ComplaintResoluionDIAddComponent
      },
      {//capa action component di
        path: ROUTER_PATHS.CAPAActionDI,
        component:CAPAActionComponent
      },
      {//capa actn di modify
        path: ROUTER_PATHS.ModifyCAPAActionDI,
        component: CAPAActionDIAddComponent
      },
      { // capa action component pi
        path: ROUTER_PATHS.CAPAActionPI,
        component:CAPAActionPIComponent        
      },
      {//capa actn pi modify
        path: ROUTER_PATHS.ModifyCAPAActionPI,
        component: CAPAActionPIAddComponent
      },
      {//for ComplaintResolutionPIComponent
        path: ROUTER_PATHS.ComplaintResolutionPI,
        component:ComplaintResolutionPIComponent
      },
      {//complaint reso pi modify
        path: ROUTER_PATHS.ModifyComplaintResolutionPI,
        component: ComplaintResoluionPIAddComponent
      },
      {//for close complaint pi
        path: ROUTER_PATHS.CloseComplaintPI,
        component:CloseComplaintPIComponent
      },
       {//close actn pi modify
        path: ROUTER_PATHS.ModifyCloseComplaintPI,
        component: CloseComplaintPIAddComponent
      },
      {//for close complaint di
        path: ROUTER_PATHS.CloseComplaintDI,
        component:CloseComplaintDIComponent
      },
      {
        path: ROUTER_PATHS.ModifyCloseComplaintDI,
        component: CloseComplaintDIAddComponent
      }



    ]
  }
];
