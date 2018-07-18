const ROUTE_LOGIN: string = "login";
const ROUTE_LOGIN_FULL: string = "/" + ROUTE_LOGIN;

const ROUTE_LOGOUT: string = "logout";
const ROUTE_LOGOUT_FULL: string = "/" + ROUTE_LOGOUT;

const ROUTE_HOME: string = "home";
const ROUTE_HOME_FULL: string = "/" + ROUTE_HOME;

const ROUTE_DASHBOARD: string = "dashboard";
const ROUTE_DASHBOARD_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_DASHBOARD;

//dashboard for both user
const ROUTE_DASHBOARD_BOTH: string = "dashboardboth";
const ROUTE_DASHBOARD_BOTH_FULL: string = "/" + ROUTE_DASHBOARD_BOTH;

const ROUTE_ADD_USER: string = "adduser";
const ROUTE_MODIFY_USER_ID: string = ROUTE_ADD_USER + '/' + ':userId';
const ROUTE_MODIFY_USER_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_ADD_USER;//modify
const ROUTE_ADD_USER_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_ADD_USER;//add

const ROUTE_VIEW_USER: string = "viewuser";
const ROUTE_VIEW_USER_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_VIEW_USER;

const ROUTE_MANAGE_PROFILE : string = "manageprofile";
const ROUTE_MANAGE_PROFILE_FULL : string = ROUTE_HOME_FULL + "/" + ROUTE_MANAGE_PROFILE;

//add complaint di
const ROUTE_COMP_DI_REG: string = "compregisterdi";
const ROUTE_COMP_DI_REG_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_COMP_DI_REG;

//view complaint DI
const ROUTE_COMP_DI_VIEW: string = "complainviewdi";//for complaint di view
//const ROUTE_COMP_DI_VIEW_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_COMP_DI_VIEW;

//new add for view or modify COMP_DI - 19.02.18 from menu
const ROUTE_VIEW_MODIFY_COMP_DI: string =  ROUTE_COMP_DI_VIEW + "/" + ':viewEditParam';
const ROUTE_VIEW_MODIFY_COMP_DI_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_COMP_DI_VIEW;

//new add for single view COMP_DI 15.02.18 for view button
const ROUTE_VIEW_DETAILS_COMPLAINT_DI: string =  ROUTE_COMP_DI_VIEW + "/" + ':viewEditParam' + '/' + ':complaintReferenceNo';
const ROUTE_VIEW_DETAILS_COMPLAINT_DI_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_COMP_DI_VIEW;

//for modify complaint di for edit button
const ROUTE_MODIFY_COMPLAINT_REFERENCE_NO: string = ROUTE_COMP_DI_REG + '/' + ':complaintReferenceNo';
const ROUTE_MODIFY_COMPLAINT_DI_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_COMP_DI_REG;//modify complaint

//view complaint di according to parameter
const ROUTE_COMP_DI_VIEW_FROM_DASHBOARD: string = "complainViewDIDashboard";
const ROUTE_COMP_DI_VIEW_WITH_PARAMETER: string = ROUTE_COMP_DI_VIEW_FROM_DASHBOARD + '/' + ':activitytype';//for complaint di view from dashboard
const ROUTE_COMP_DI_VIEW_WITH_PARAMETER_FULL: string = ROUTE_HOME_FULL + "/" +  ROUTE_COMP_DI_VIEW_FROM_DASHBOARD;


//for complain pi register 09.08.17
const ROUTE_COMP_PI_REG: string = "compregisterpi";
const ROUTE_COMP_PI_REG_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_COMP_PI_REG;

//for complaint pi view
const ROUTE_COMP_PI_VIEW: string = "complainviewpi";
const ROUTE_COMP_PI_VIEW_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_COMP_PI_VIEW;

//view complaint pi according to parameter
const ROUTE_COMP_PI_VIEW_WITH_PARAMETER: string = ROUTE_COMP_PI_VIEW + '/' + ':activitytype';//for complaint di view
const ROUTE_COMP_PI_VIEW_WITH_PARAMETER_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_COMP_PI_VIEW;

//for modify complain pi
const ROUTE_MODIFY_COMPLAINT_PI_REFERENCE_NO: string = ROUTE_COMP_PI_REG + '/' + ':complaintReferenceNo';
const ROUTE_MODIFY_COMPLAINT_PI_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_COMP_PI_REG;//modify pi complaint

//new add for PRELIMINRY_INVESTIGATION_DI 19.07.17
// const ROUTE_PRELIMINRY_INVESTIGATION_DI_ADD: string = "sitevisitadddi";
// const ROUTE_PRELIMINRY_INVESTIGATION_DI_ADD_FULL : string = ROUTE_HOME_FULL + "/" + ROUTE_PRELIMINRY_INVESTIGATION_DI_ADD;
const ROUTE_INVESTIGATION_REPORT_DI_ADD: string = "investigationreport";
const ROUTE_INVESTIGATION_REPORT_DI_ADD_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_INVESTIGATION_REPORT_DI_ADD;

//new add for view PRELIMINRY_INVESTIGATION_DI 22.08.17
//const ROUTE_PRELIMINRY_INVESTIGATION_DI_VIEW: string = "sitevisitviewdi";

// const ROUTE_PRELIMINRY_INVESTIGATION_DI_VIEW_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_PRELIMINRY_INVESTIGATION_DI_VIEW;
//new add for view or modify PRELI_DI - 19.02.18
//const ROUTE_VIEW_MODIFY_PRELIMINRY_INVESTIGATION_DI: string =  ROUTE_PRELIMINRY_INVESTIGATION_DI_VIEW + "/" + ':viewEditParam';
//const ROUTE_VIEW_MODIFY_PRELIMINRY_INVESTIGATION_DI_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_PRELIMINRY_INVESTIGATION_DI_VIEW;
const ROUTE_INVESTIGATION_REPORT_DI_VIEW: string = "investigationreportviewdi";
const ROUTE_VIEW_MODIFY_INVESTIGATION_REPORT_DI: string =  ROUTE_INVESTIGATION_REPORT_DI_VIEW + "/" + ':viewEditParam';
const ROUTE_VIEW_MODIFY_INVESTIGATION_REPORT_DI_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_INVESTIGATION_REPORT_DI_VIEW;

//new add for modify PRELIMINRY_INVESTIGATION_DI 22.08.17
// const ROUTE_MODIFY_PRELIMINRY_INVESTIGATION_DI: string =  ROUTE_PRELIMINRY_INVESTIGATION_DI_ADD + '/' + ':complaintReferenceNo';
//const ROUTE_MODIFY_PRELIMINRY_INVESTIGATION_DI_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_PRELIMINRY_INVESTIGATION_DI_ADD;
const ROUTE_MODIFY_INVESTIGATION_REPORT_DI: string =  ROUTE_INVESTIGATION_REPORT_DI_ADD + '/' + ':complaintReferenceNo';
const ROUTE_MODIFY_INVESTIGATION_REPORT_DI_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_INVESTIGATION_REPORT_DI_ADD;

//new add for single view PRELIMINRY_INVESTIGATION_DI 15.02.18
// const ROUTE_VIEW_DETAILS_PRELIMINRY_INVESTIGATION_DI: string =  ROUTE_PRELIMINRY_INVESTIGATION_DI_VIEW + "/" + ':viewEditParam' + '/' + ':complaintReferenceNo';
// const ROUTE_VIEW_DETAILS_PRELIMINRY_INVESTIGATION_DI_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_PRELIMINRY_INVESTIGATION_DI_VIEW;
const ROUTE_VIEW_DETAILS_INVESTIGATION_REPORT_DI: string =  ROUTE_INVESTIGATION_REPORT_DI_VIEW + "/" + ':viewEditParam' + '/' + ':complaintReferenceNo';
const ROUTE_VIEW_DETAILS_INVESTIGATION_REPORT_DI_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_INVESTIGATION_REPORT_DI_VIEW;

//complaint reference no search for di
const ROUTE_COMPLAINT_REFERENCE_NO_SEARCH: string ="complaintReferenceNoSearch";
const ROUTE_COMPLAINT_REFERENCE_NO_SEARCH_FULL: string = ROUTE_HOME_FULL + "/"+ ROUTE_COMPLAINT_REFERENCE_NO_SEARCH;



//new add for allocate complaint add
const ROUTE_ADD_ALLOCATE_COMPLAINT: string = "allocateComplaintadd";
const ROUTE_ADD_ALLOCATE_COMPLAINT_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_ADD_ALLOCATE_COMPLAINT;

//new add for allocate complaint route
const ROUTE_ALLOCATE_COMPLAINT_CONST: string = "allocateComplaint";
//const ROUTE_ALLOCATE_COMPLAINT_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_ALLOCATE_COMPLAINT;

const ROUTE_ALLOCATE_COMPLAINT: string = ROUTE_ALLOCATE_COMPLAINT_CONST + "/" + ':viewEditParam';//route path for menu
const ROUTE_ALLOCATE_COMPLAINT_FULL: string = ROUTE_HOME_FULL + "/"+ ROUTE_ALLOCATE_COMPLAINT_CONST;

//new add for modify allocate complaint single view cum add/edit -- 22.02.18
const ROUTE_MODIFY_ALLOCATE_COMPLAINT: string =  ROUTE_ALLOCATE_COMPLAINT_CONST + '/' + ':complaintReferenceNo'+ '/' + ':viewEditParam';
const ROUTE_MODIFY_ALLOCATE_COMPLAINT_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_ALLOCATE_COMPLAINT_CONST;

//complaint resolution di
const ROUTE_COMPLAINT_RESOLUTION_DI: string = "complaintresolutiondi";
const ROUTE_COMPLAINT_RESOLUTION_DI_FULL: string = ROUTE_HOME_FULL + "/"+ ROUTE_COMPLAINT_RESOLUTION_DI;
//Complaint Resolution pi single view cum add/edit
const ROUTE_MODIFY_COMPLAINT_RESOLUTION_DI: string = ROUTE_COMPLAINT_RESOLUTION_DI + '/' + ':complaintReferenceNo';
const ROUTE_MODIFY_COMPLAINT_RESOLUTION_DI_FULL: string = ROUTE_HOME_FULL + '/' + ROUTE_COMPLAINT_RESOLUTION_DI;
// Capa Action DI Route
const ROUTE_CAPA_DI_CONST: string = "capaactiondi";
const ROUTE_CAPA_ACTION_DI: string = ROUTE_CAPA_DI_CONST + "/" + ':viewEditParam';//route path for menu
const ROUTE_CAPA_ACTION_DI_FULL: string = ROUTE_HOME_FULL + "/"+ ROUTE_CAPA_DI_CONST;
//capa actn pi single view cum add/edit
const ROUTE_MODIFY_CAPA_ACTION_DI: string = ROUTE_CAPA_DI_CONST + '/' + ':viewEditParam'+ '/' + ':complaintReferenceNo';
const ROUTE_MODIFY_CAPA_ACTION_DI_FULL: string = ROUTE_HOME_FULL + '/' + ROUTE_CAPA_DI_CONST;
//pi capa and reso
// Capa Action PI Route
const ROUTE_CAPA_ACTION_PI: string ="capaactionpiview";
const ROUTE_CAPA_ACTION_PI_FULL: string = ROUTE_HOME_FULL + "/"+ ROUTE_CAPA_ACTION_PI;
//capa actn pi single view cum add/edit
const ROUTE_MODIFY_CAPA_ACTION_PI: string = ROUTE_CAPA_ACTION_PI + '/' + ':complaintReferenceNo';
const ROUTE_MODIFY_CAPA_ACTION_PI_FULL: string = ROUTE_HOME_FULL + '/' + ROUTE_CAPA_ACTION_PI;
// Complaint Resolution PI Route
const ROUTE_COMPLAINT_RESOLUTION_PI: string ="rootcauseanalysispi";
const ROUTE_COMPLAINT_RESOLUTION_PI_FULL: string = ROUTE_HOME_FULL + "/"+ ROUTE_COMPLAINT_RESOLUTION_PI;
//Complaint Resolution pi single view cum add/edit
const ROUTE_MODIFY_COMPLAINT_RESOLUTION_PI: string = ROUTE_COMPLAINT_RESOLUTION_PI + '/' + ':complaintReferenceNo';
const ROUTE_MODIFY_COMPLAINT_RESOLUTION_PI_FULL: string = ROUTE_HOME_FULL + '/' + ROUTE_COMPLAINT_RESOLUTION_PI;
//close complaint di
const ROUTE_CLOSE_COMPLAINT_DI: string ="closeComplaintdi";
const ROUTE_CLOSE_COMPLAINT_DI_FULL: string = ROUTE_HOME_FULL + "/"+ ROUTE_CLOSE_COMPLAINT_DI;
//Complaint Resolution di single view cum add/edit
const ROUTE_MODIFY_CLOSE_COMPLAINT_DI: string = ROUTE_CLOSE_COMPLAINT_DI + '/' + ':complaintReferenceNo';
const ROUTE_MODIFY_CLOSE_COMPLAINT_DI_FULL: string = ROUTE_HOME_FULL + '/' + ROUTE_CLOSE_COMPLAINT_DI;
//close complaint pi
const ROUTE_CLOSE_COMPLAINT_PI: string ="closecomplaintpi";
const ROUTE_CLOSE_COMPLAINT_PI_FULL: string = ROUTE_HOME_FULL + "/"+ ROUTE_CLOSE_COMPLAINT_PI;
//Complaint Resolution di single view cum add/edit
const ROUTE_MODIFY_CLOSE_COMPLAINT_PI: string = ROUTE_CLOSE_COMPLAINT_PI + '/' + ':complaintReferenceNo';
const ROUTE_MODIFY_CLOSE_COMPLAINT_PI_FULL: string = ROUTE_HOME_FULL + '/' + ROUTE_CLOSE_COMPLAINT_PI;

//pi invoice search
const ROUTE_COMPLAINT_PI_INVOICE_SEARCH: string ="complaintPIInvoiceSearch";
const ROUTE_COMPLAINT_PI_INVOICE_SEARCH_FULL: string = ROUTE_HOME_FULL + "/"+ ROUTE_COMPLAINT_PI_INVOICE_SEARCH;

//pi customer search
const ROUTE_COMPLAINT_PI_CUSTOMER_SEARCH: string ="complaintPICustomerSearch";
const ROUTE_COMPLAINT_PI_CUSTOMER_SEARCH_FULL: string = ROUTE_HOME_FULL + "/"+ ROUTE_COMPLAINT_PI_CUSTOMER_SEARCH;
//di invoice search
const ROUTE_COMPLAINT_DI_INVOICE_SEARCH: string ="complaintDIInvoiceSearch";
const ROUTE_COMPLAINT_DI_INVOICE_SEARCH_FULL: string = ROUTE_HOME_FULL + "/"+ ROUTE_COMPLAINT_DI_INVOICE_SEARCH;

//di customer search
const ROUTE_COMPLAINT_DI_CUSTOMER_SEARCH: string ="complaintDICustomerSearch";
const ROUTE_COMPLAINT_DI_CUSTOMER_SEARCH_FULL: string = ROUTE_HOME_FULL + "/"+ ROUTE_COMPLAINT_DI_CUSTOMER_SEARCH;

const ROUTE_ADD_ROLE: string = "addrole";
const ROUTE_MODIFY_ROLE_ID: string = ROUTE_ADD_ROLE + '/' + ':roleId';
const ROUTE_MODIFY_ROLE_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_ADD_ROLE;//modify
const ROUTE_ADD_ROLE_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_ADD_ROLE;//add

const ROUTE_VIEW_ROLE: string = "viewrole";
const ROUTE_VIEW_ROLE_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_VIEW_ROLE;

//for mis report
const ROUTE_MIS_REPORTS: string = "misreport";
const ROUTE_MIS_REPORTS_VIEW: string = ROUTE_MIS_REPORTS + "/" + ':plantType';
const ROUTE_MIS_REPORTS_VIEW_FULL: string =  ROUTE_HOME_FULL + "/" + ROUTE_MIS_REPORTS;
const ROUTE_MIS_REPORTS_VIEW_DETAILS: string = ROUTE_MIS_REPORTS + "/" + ':plantType' + "/" + ':complaintReferenceNo';
const ROUTE_MIS_REPORT_VIEW_DETAILS_FULL: string = ROUTE_HOME_FULL + "/" + ROUTE_MIS_REPORTS;


// Full route path (/login, /home/dashboard etc.)
export const ROUTE_PATHS = {
    RouteLogin: ROUTE_LOGIN_FULL,
    RouteLogout: ROUTE_LOGOUT_FULL,
    RouteHome: ROUTE_HOME_FULL,
    RouteComplainPIRegister: ROUTE_COMP_PI_REG_FULL, //complain register pi 09.08.17
    RouteDashboard: ROUTE_DASHBOARD_FULL,
    RouteDashboardBoth: ROUTE_DASHBOARD_BOTH_FULL,//for dashboard full
    RouteComplainDIRegister: ROUTE_COMP_DI_REG_FULL,//complaint di reg from menu
    RouteComplainDIViewModify: ROUTE_VIEW_MODIFY_COMP_DI_FULL,//from menu comp view or modify
    RouteComplainDIViewDetails: ROUTE_VIEW_DETAILS_COMPLAINT_DI_FULL,//complaint di view details by clicking on view button
    RouteModifyComplaint: ROUTE_MODIFY_COMPLAINT_DI_FULL,//modify di complaint by clicking on edit button
    RouteComplaintDIViewWithParameter: ROUTE_COMP_DI_VIEW_WITH_PARAMETER_FULL,//complaint DI view with parameter for dashboard to view di
    RouteComplaintPIViewWithParameter: ROUTE_COMP_PI_VIEW_WITH_PARAMETER_FULL,//complaint PI view with parameter
    RouteAddUser: ROUTE_ADD_USER_FULL,//add
    RouteModifyUser: ROUTE_MODIFY_USER_FULL,//modify user
    RouteViewUser: ROUTE_VIEW_USER_FULL,
    RouteManageProfile: ROUTE_MANAGE_PROFILE_FULL,
    //new add for PRELIMINRY_INVESTIGATION_DI 19.07.17
    RouteInvestigationReportDiAdd: ROUTE_INVESTIGATION_REPORT_DI_ADD_FULL,//preli add
    //RoutePreliminaryInvestigationDiAdd: ROUTE_PRELIMINRY_INVESTIGATION_DI_ADD_FULL,//preli add

    //RoutePreliminaryInvestigationDIViewModify: ROUTE_VIEW_MODIFY_PRELIMINRY_INVESTIGATION_DI_FULL,//from menu preli view or edit
    RouteInvestigationReportDIViewModify: ROUTE_VIEW_MODIFY_INVESTIGATION_REPORT_DI_FULL,//from menu preli view or edit
    // RoutePreliminaryInvestigationDIView: ROUTE_PRELIMINRY_INVESTIGATION_DI_VIEW_FULL,//preli view
    //RouteModifyPreliminaryInvestigationDi: ROUTE_MODIFY_PRELIMINRY_INVESTIGATION_DI_FULL,//preli modify
    RouteModifyInvestigationReportDi: ROUTE_MODIFY_INVESTIGATION_REPORT_DI_FULL,//preli modify
    //RouterViewDetailsPreliminaryInvestigationDi: ROUTE_VIEW_DETAILS_PRELIMINRY_INVESTIGATION_DI_FULL,//preli view details for single view
    RouteViewDetailsInvestigationReportDi: ROUTE_VIEW_DETAILS_INVESTIGATION_REPORT_DI_FULL,//preli view details for single view
    RouteComplaintReferenceNoSearch: ROUTE_COMPLAINT_DI_CUSTOMER_SEARCH_FULL,//complaint reference no search
    RouteComplainPIView: ROUTE_COMP_PI_VIEW_FULL,//for complaint pi view
    RouteModifyPIComplaint: ROUTE_MODIFY_COMPLAINT_PI_FULL,//for complain pi modify
    RouteAllocateComplaint: ROUTE_ALLOCATE_COMPLAINT_FULL,//allocate complaint full
    RouteAddAllocateComplaint: ROUTE_ADD_ALLOCATE_COMPLAINT_FULL,//allocate complaint add full
    RouteModifyAllocateComplaint: ROUTE_MODIFY_ALLOCATE_COMPLAINT_FULL,//modify allocate complaint full
    RouteComplaintResolutionDI : ROUTE_COMPLAINT_RESOLUTION_DI_FULL,//Complaint Reso Di full
    RouteModifyComnplaintResolutionDI: ROUTE_MODIFY_COMPLAINT_RESOLUTION_DI_FULL,//route modify complaint resolution di
    RouteComplaintResolutionPI : ROUTE_COMPLAINT_RESOLUTION_PI_FULL, // ComplaintResolutionPI
    RouteModifyComplaintResolutionPI : ROUTE_MODIFY_COMPLAINT_RESOLUTION_PI_FULL,//route modify complaint reso pi
    RouteCAPAActionDI : ROUTE_CAPA_ACTION_DI_FULL,//CAPA Action full
    RouteModifyCAPAActionDI: ROUTE_MODIFY_CAPA_ACTION_DI_FULL,//route modify capa action di full
    RouteCAPAActionPI : ROUTE_CAPA_ACTION_PI_FULL,//CAPA Action full pi
    RouteModifyCAPAActionPI : ROUTE_MODIFY_CAPA_ACTION_PI_FULL,//route modify capa action
    RouteCloseComplaintDI: ROUTE_CLOSE_COMPLAINT_DI_FULL, //close complaint di
    RouteModifyCloseComplaintDI: ROUTE_MODIFY_CLOSE_COMPLAINT_DI_FULL,//modify close complaint di
    RouteCloseComplaintPI : ROUTE_CLOSE_COMPLAINT_PI_FULL, //close complaint pi
    RouteModifyCloseCoimplaintPI: ROUTE_MODIFY_CLOSE_COMPLAINT_PI_FULL,//route modify close complaint pi
    RouteComplaintPICustomerSearch: ROUTE_COMPLAINT_PI_CUSTOMER_SEARCH_FULL,//pi customer search
    RouteComplaintPIInvoiceSearch : ROUTE_COMPLAINT_PI_INVOICE_SEARCH_FULL, //pi invoice search
    RouteComplaintDICustomerSearch: ROUTE_COMPLAINT_DI_CUSTOMER_SEARCH_FULL,//di customer search
    RouteComplaintDIInvoiceSearch : ROUTE_COMPLAINT_DI_INVOICE_SEARCH_FULL, //di invoice search
    RouteAddRole: ROUTE_ADD_ROLE_FULL,//add role
    RouteModifyRole: ROUTE_MODIFY_ROLE_FULL,//modify role
    RouteViewRole: ROUTE_VIEW_ROLE_FULL,
    RouteMisReportView: ROUTE_MIS_REPORTS_VIEW_FULL,//for mis report grid view full
    RouteMisReportViewDetails: ROUTE_MIS_REPORT_VIEW_DETAILS_FULL,//for mis report details full
}

// Router names (like login, home, dashboard etc.)
export const ROUTER_PATHS = {
    LoginRouter: ROUTE_LOGIN,
    LogoutRouter: ROUTE_LOGOUT,
    HomeRouter: ROUTE_HOME,
    ComplainDIRegisterRouter: ROUTE_COMP_DI_REG,//complaint di reg from menu
    ComplainDIViewModifyRouter: ROUTE_VIEW_MODIFY_COMP_DI,//complain di view or modify from menu
    ComplainDIViewDetailsRouter: ROUTE_VIEW_DETAILS_COMPLAINT_DI,//view di by clicking on view button
    ModifyComplaintDIRouter: ROUTE_MODIFY_COMPLAINT_REFERENCE_NO,//modify complain di 
    DIViewComplaintWithParameterRouter: ROUTE_COMP_DI_VIEW_WITH_PARAMETER,//DI view comp with parameter from dashboard 
    ComplainPIRegisterRouter: ROUTE_COMP_PI_REG, //complain register pi 09.08.17
    DashboardRouter: ROUTE_DASHBOARD,
    DashboardBothRouter: ROUTE_DASHBOARD_BOTH,//dashboard both    
    AddUserRouter: ROUTE_ADD_USER,//add user
    ModifyUserRouter: ROUTE_MODIFY_USER_ID,//new add for modify
    ViewUserRouter: ROUTE_VIEW_USER,
    ManageProfileRouter: ROUTE_MANAGE_PROFILE,
    //new add for PRELIMINRY_INVESTIGATION_DI 19.07.17
    //PreliminaryInvestigationDiAddRouter: ROUTE_PRELIMINRY_INVESTIGATION_DI_ADD,//preli add
    InvestigationReportDiAddRouter: ROUTE_INVESTIGATION_REPORT_DI_ADD,//preli add
    // ViewPreliminaryInvestigationDiRouter: ROUTE_PRELIMINRY_INVESTIGATION_DI_VIEW,//preli view
    // ViewModifyPreliminaryInvestigationRouter: ROUTE_VIEW_MODIFY_PRELIMINRY_INVESTIGATION_DI,//preli view edit from menu
    ViewModifyInvestigationReportRouter: ROUTE_VIEW_MODIFY_INVESTIGATION_REPORT_DI,//preli view edit from menu
    //ModifyPreliminaryInvestigationDiRouter: ROUTE_MODIFY_PRELIMINRY_INVESTIGATION_DI,//preli modify 
    ModifyInvestigationReportDiRouter: ROUTE_MODIFY_INVESTIGATION_REPORT_DI,//preli modify 
    //ViewDetailsPreliminaryInvestigationDiRouter:ROUTE_VIEW_DETAILS_PRELIMINRY_INVESTIGATION_DI,//single view of preli   
    ViewDetailsInvestigationReportDiRouter:ROUTE_VIEW_DETAILS_INVESTIGATION_REPORT_DI,//single view of preli    
    ComplaintReferenceNoSearch: ROUTE_COMPLAINT_REFERENCE_NO_SEARCH,//for complaint reference no search
    PIViewComplaintWithParameterRouter: ROUTE_COMP_PI_VIEW_WITH_PARAMETER,//PI view comp with parameter
    ComplainPIViewRouter: ROUTE_COMP_PI_VIEW,//for complaint pi view
    modifyPIComplaintRouter: ROUTE_MODIFY_COMPLAINT_PI_REFERENCE_NO,//modify pi complain
    AllocateComplaint: ROUTE_ALLOCATE_COMPLAINT,//allocate complaint for site visit
    AddAllocateComplaint: ROUTE_ADD_ALLOCATE_COMPLAINT,//add allocate complaint for site visit
    ModifyAllocateComplaint: ROUTE_MODIFY_ALLOCATE_COMPLAINT,//modify allocate complaint for site visit
    ComplaintResolutionDI: ROUTE_COMPLAINT_RESOLUTION_DI,//Corrective Preventive Action full
    ModifyComplaintResolutionDI : ROUTE_MODIFY_COMPLAINT_RESOLUTION_DI, //modify ComplaintResolutiondI
    CAPAActionDI: ROUTE_CAPA_ACTION_DI,//CAPA Action DI
    ModifyCAPAActionDI: ROUTE_MODIFY_CAPA_ACTION_DI,//route modify capa actn di
    //pi
    CAPAActionPI: ROUTE_CAPA_ACTION_PI,//CAPA Action PI
    ModifyCAPAActionPI: ROUTE_MODIFY_CAPA_ACTION_PI,//route modify capa actn pi
    ComplaintResolutionPI : ROUTE_COMPLAINT_RESOLUTION_PI, // ComplaintResolutionPI
    ModifyComplaintResolutionPI : ROUTE_MODIFY_COMPLAINT_RESOLUTION_PI, // modify ComplaintResolutionPI
    CloseComplaintDI : ROUTE_CLOSE_COMPLAINT_DI, //close complaint di
    ModifyCloseComplaintDI : ROUTE_MODIFY_CLOSE_COMPLAINT_DI, //modify close complaint di
    CloseComplaintPI : ROUTE_CLOSE_COMPLAINT_PI,//close complaint pi
    ModifyCloseComplaintPI : ROUTE_MODIFY_CLOSE_COMPLAINT_PI, //close complaint pi
    ComplaintPIInvoiceSearch : ROUTE_COMPLAINT_PI_INVOICE_SEARCH, //pi invoice search
    ComplaintPICustomerSearch : ROUTE_COMPLAINT_PI_CUSTOMER_SEARCH, //pi customer search
    ComplaintDIInvoiceSearch : ROUTE_COMPLAINT_DI_INVOICE_SEARCH, //di invoice search
    ComplaintDICustomerSearch : ROUTE_COMPLAINT_DI_CUSTOMER_SEARCH, //di customer search
    AddRoleRouter: ROUTE_ADD_ROLE,//add role
    ModifyRoleRouter: ROUTE_MODIFY_ROLE_ID,//new add for modify
    ViewRoleRouter: ROUTE_VIEW_ROLE,
    MisReportViewRouter: ROUTE_MIS_REPORTS_VIEW,//for grid view of mis report
    MisReportViewDetailsRouter: ROUTE_MIS_REPORTS_VIEW_DETAILS,//for mis reports view details
}
