import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ViewComplaintDIDataService } from '../../services/complaint-di-view-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { ROUTE_PATHS, ROUTER_PATHS } from '../../../../router/router-paths';
import { ComplainDIViewModel } from '../../models/complain-di-view.model';
import { TilesInteractionService } from '../../../../dashboard/services/tiles-interaction.service';
import { SessionErrorService } from '../../../../shared/services/session-error.service';
import { ProcessFlowStatusDetailsModel } from '../../../../shared/components/process-flow/process-flow-status-details.model';
import { ComplaintDIService } from '../../../../shared/services/complaint-di.service';
import { ComplaintDIHeaderParamModel } from '../../../../shared/models/complaint-di-header-param.model';

@Component({
  selector: 'ispl-complain-di-view',
  templateUrl: 'complain-di-view.component.html',
  styleUrls: ['complain-di-view.component.css']
})
export class ComplainDIViewComponent implements OnInit {

  public complaintDIViewDetails: any = []//to show the complaint det in html page

  public modifyComplaint: string;//for modify complaint id

  public facetedDataDetails: any[] = [];//to show faceted data in html

  public processFlowStatusDet: string[] = [];

  //for sorting and orderType activity id parameters
  public sortSelection: any = {
    plantType: 'DI',
    sortData: '',
    orderType: '',
    facetedArray: [],
    fileActivityId: this.localStorageService.appSettings.complaintRegistrationActivityId
  };

  //reset filter for faceted nav for quick fix..
  public resetFilter: any = {
    plantType: 'DI',
    sortData: '',
    orderType: '',
    facetedArray: [],
    fileActivityId: this.localStorageService.appSettings.complaintRegistrationActivityId
  };
  //reset filter for faceted nav for quick fix..
  public dashboardResetFilter: any = {
    plantType: 'DI',
    sortData: '',
    orderType: '',
    facetedArray: [],
    fileActivityId: this.localStorageService.appSettings.complaintRegistrationActivityId
  };
  //takin arr for selectedData
  public selectedData: any[] = [];
  public searchFormGroup: FormGroup;
  //checkbox
  public checkAll: boolean = false;
  public otherCheck: boolean = false;
  // Page Config
  public pageConfig: any = {};
  //present faceted data to get faceted details
  public presentFacetedData = 'DEFAULT';
  //taking var for filter
  public filterOption: string = 'DEFAULT';
  //taking var for previous filter
  public previousFilter: string = '';
  //taking any array for faceted
  public facetedArray: any[] = [];
  public dashboardParameter: string = '';

  public gridHeader: any = {
    complaintReferenceNo: 'Complaint Number',
    customerName: 'Customer Name',
    complaintTypeDesc: 'Complaint Type',
    natureOfComplaintDesc: 'Nature of Complaint',
    lastStatus: 'Complaint Status'
  }

  //for busy spinner
  public busySpinner: boolean = true;
  public title: string = '';
  //complaint register var to check complaint is registered or not in html
  public complaintLoggedActivityId: number = this.localStorageService.appSettings.complaintRegistrationActivityId;
  public headerparams: ComplaintDIHeaderParamModel;

  public facetedNavData: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private viewComplaintDIDataService: ViewComplaintDIDataService,
    private router: Router,
    private complaintdIservice: ComplaintDIService,
    private tilesInteractionService: TilesInteractionService,
    private sessionErrorService: SessionErrorService,
    private activatedroute: ActivatedRoute//route parameter
  ) {
    console.log("View DI Complain Class");
    // this.gridSearch = new FormControl('');
    this.searchFormGroup = this.formBuilder.group({
      'gridSearch': ''
    });
  }//end of constructor

  ngOnInit(): void {
    console.log("OnInit View Complain Class");
    this.busySpinner = true;
    this.pageConfig = new ComplainDIViewModel().pageConfig;
    //new add for view complaint according to parameter
    // let routeSubscription: Subscription;
    // routeSubscription = this.activatedroute.params.subscribe(params => { 
    //   this.dashboardParameter = params.activitytype ? params.activitytype : '';
    // });
    this.headerparams = new ComplaintDIHeaderParamModel();
    this.getParamFromRoute();//to get route param
    console.log("view complaint according to parameter [dashboard]: ", this.dashboardParameter);
    this.parameterCheck(this.dashboardParameter);
    this.loadFacetedNav();
  }//end of onInit


  //method to get route param
  private getParamFromRoute() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.dashboardParameter = params.activitytype ? params.activitytype : '';//get param from dashboard
      this.selectedData = [];//removing the array 

      // if(this.dashboardParameter){
      //   this.viewEditParam = "View";
      // }//end of if

      this.title = "View Complaints";

    });
  }
  //end of method to get route param

  //checking if parameter have value or not
  private parameterCheck(routeParameter: string) {
    if (this.dashboardParameter == '') {

      this.getcomplaindetails();
    } else {


    }
  }//end of checking if parameter have value or not

  /**
   * @description get compliant data
   */
  private getcomplaindetails() {
    this.busySpinner = true;
    this.complaintdIservice.getHeader(this.headerparams).subscribe((res: any) => {
      console.log('get data all', JSON.parse(res.mapDetails));
      this.complaintDIViewDetails = JSON.parse(res.mapDetails);
      this.busySpinner = false;
    }, (err: any) => {
      this.busySpinner = false;
    });
  }

  private loadFacetedNav() {
    this.loadComplainStatusFacet();
    this.loadComplainTypeFacet();
    this.loadNatureOfComplainFacet();
  }

  private loadComplainStatusFacet() {
    let complainStatusParam: ComplaintDIHeaderParamModel = new ComplaintDIHeaderParamModel();
    complainStatusParam.filter = this.headerparams.filter;
    complainStatusParam.fields = 'distinct LAST_ACTIVITY_ID, ACTIVITY_DESC';
    complainStatusParam.orderBy = 'LAST_ACTIVITY_ID';

    this.complaintdIservice.getHeader(complainStatusParam).subscribe((res: any) => {
      this.facetedNavData.complainStatus = JSON.parse(res.mapDetails);
    }, (err: any) => {
      // this.busySpinner = false;
    });
  }

  private loadComplainTypeFacet() {
    let complainStatusParam: ComplaintDIHeaderParamModel = new ComplaintDIHeaderParamModel();
    complainStatusParam.filter = this.headerparams.filter;
    complainStatusParam.fields = 'distinct CMPLNT_TYPE_ID , CMPLNT_TYPE_DESC';
    complainStatusParam.orderBy = 'CMPLNT_TYPE_ID';

    this.complaintdIservice.getHeader(complainStatusParam).subscribe((res: any) => {
      this.facetedNavData.complainType = JSON.parse(res.mapDetails);
    }, (err: any) => {
      // this.busySpinner = false;
    });
  }

  private loadNatureOfComplainFacet() {
    let complainStatusParam: ComplaintDIHeaderParamModel = new ComplaintDIHeaderParamModel();
    complainStatusParam.filter = this.headerparams.filter;
    complainStatusParam.fields = 'distinct NAT_CMPLNT_ID, NAT_CMPLNT_DESC';
    complainStatusParam.orderBy = 'NAT_CMPLNT_ID';

    this.complaintdIservice.getHeader(complainStatusParam).subscribe((res: any) => {
      this.facetedNavData.natureOfComplain = JSON.parse(res.mapDetails);
    }, (err: any) => {
      // this.busySpinner = false;
    });
  }

  public selectFacet(facetName: string, selectedFacet: string) {
    console.log(facetName + " :: " + selectedFacet);
    switch(facetName) {
      case 'complainStatus': {
        this.headerparams.filter ? 
          this.headerparams.filter += " OR " + "LAST_ACTIVITY_ID='"+selectedFacet+"'" :
          this.headerparams.filter = "LAST_ACTIVITY_ID='"+selectedFacet+"'";

          this.loadComplainTypeFacet();
          this.loadNatureOfComplainFacet();
        break;
      }
      case 'complainType': {
        this.headerparams.filter ? 
          this.headerparams.filter += " OR " + "CMPLNT_TYPE_ID='"+selectedFacet+"'" :
          this.headerparams.filter = "CMPLNT_TYPE_ID='"+selectedFacet+"'";

          this.loadComplainStatusFacet();
          this.loadNatureOfComplainFacet();
        break;
      }
      case 'natureOfComplain': {
        this.headerparams.filter ? 
          this.headerparams.filter += " OR " + "NAT_CMPLNT_ID='"+selectedFacet+"'" :
          this.headerparams.filter = "NAT_CMPLNT_ID='"+selectedFacet+"'";

          this.loadComplainStatusFacet();
          this.loadComplainTypeFacet();
        break;
      }
    }

    this.getcomplaindetails();
  }

  public getComplaintDetailsOnSelect(complaintDetail: any, viewParam?: string) {
    console.log("checked : ", complaintDetail);
    this.processFlowStatusDet = new ProcessFlowStatusDetailsModel().statusDetails;
    console.log("this.processFlowStatusDet======", this.processFlowStatusDet);
    console.log("param to check the click from view::", viewParam);

    let complainNo: string = complaintDetail.complaintReferenceNo;
    let complainStatusId: string = complaintDetail.lastActivityId;

    // RegisterAdd -> ROUTE_PATHS.RouteComplainDIRegister + '/' + complainNo;
    // RegisterView -> ROUTE_PATHS.RouteComplainDIView + '/' + complainNo + '/' + complainStatusId;

    // InvestigationRepAdd -> RouteInvestigationReportDiAdd
    // InvestigationRepView -> RouteViewDetailsInvestigationReportDi

    // RCA Add -> RouteAddRCADI
    // RCA View -> RouteViewDetailsRCADI

    // CA Add -> RouteAddCADI
    // CA View -> RouteViewDetailsCADI

    // PA Add -> RouteAddPADI
    // PA View -> RouteViewDetailsPADI

    // Closed Add -> RouteAddCloseComplainDI
    // Closed VIew -> RouteViewDetailsCloseComplainDI

    let routePath: string = '';
    switch (complainStatusId) {
      case '10': {
        //viewcomplaindi/DI000009/10
        routePath = ROUTE_PATHS.RouteInvestigationReportDiAdd + '/' + complainNo + '/' + 40;
        break;
      };
      case '40': {
        routePath = ROUTE_PATHS.RouteAddRCADI + '/' + complainNo + '/' + 50;
        break;
      };
      case '50': {
        routePath = ROUTE_PATHS.RouteAddCADI + '/' + complainNo + '/' + 60;
        break;
      };
      case '60': {
        routePath = ROUTE_PATHS.RouteAddPADI + '/' + complainNo + '/' + 70;
        break;
      };
      case '70': {
        routePath = ROUTE_PATHS.RouteAddCloseComplainDI + '/' + complainNo + '/' + 80;
        break;
      };
      case '80': {
        routePath = ROUTE_PATHS.RouteViewDetailsCloseComplainDI + '/' + complainNo + '/' + complainStatusId;
        break;
      }
    }

    this.router.navigate([routePath]);

    //TODO: Need to add route logic

  }//end of method of getcomplaintDetailByCheckbox


  /**
   * 
   * @param val 
   */
  sortdata(sortItem) {
    console.log("clicked value : " + sortItem);
    if (this.sortSelection.sortData == sortItem) {
      this.sortSelection.orderType = "DESC";
    } else {
      this.sortSelection.orderType = "ASC";
    }
    this.sortSelection.sortData = sortItem;


    this.headerparams.sortData = this.sortSelection.sortData ? this.sortSelection.sortData : '';
    this.headerparams.orderBy = this.sortSelection.orderType && this.sortSelection.orderType == 'DESC'
      ? this.sortSelection.orderType : '';
    // console.log("sortSelection : ", this.sortSelection);
    this.busySpinner = true;
    this.getcomplaindetails();

  }//end of onclick method


}//end of class
