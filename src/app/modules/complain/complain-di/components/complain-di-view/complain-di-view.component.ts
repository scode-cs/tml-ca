import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  private compHeaderTableColumnNames: any = {};//to get header table column names
  public complaintDIViewDetails: any = []//to show the complaint det in html page
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
  //for local search
  public searchFormGroup: FormGroup; 
  // Page Config
  public pageConfig: any = {}; 
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
  //formgroup
  public changeStattusGroup: FormGroup;
  public complanTypeFormgroup: FormGroup;
  public natureOfComplainGroup: FormGroup;
  pager: any = {};
  datacount:number;
  // paged items
  pagedItems: any[];
  //server search formgroup
  public serverSearchModalFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private viewComplaintDIDataService: ViewComplaintDIDataService,
    private router: Router,
    private complaintdIservice: ComplaintDIService,
    private tilesInteractionService: TilesInteractionService,
    private sessionErrorService: SessionErrorService,
    private activatedroute: ActivatedRoute,//route parameter,
    private cd: ChangeDetectorRef
  ) {
    console.log("View DI Complain Class");
    // this.gridSearch = new FormControl('');
    this.searchFormGroup = this.formBuilder.group({
      'gridSearch': ''
    });
    //serverSearchModalFormGroup
    let serverSearchFormGroup: any = {}
    serverSearchFormGroup['anyTypeSearch'] = new FormControl();
    serverSearchFormGroup['complaintNumber'] = new FormControl();
    serverSearchFormGroup['customerName'] = new FormControl();
    serverSearchFormGroup['complaintType'] = new FormControl();
    serverSearchFormGroup['natureOfComplaint'] = new FormControl();
    serverSearchFormGroup['complaintStatus'] = new FormControl();
    this.serverSearchModalFormGroup = new FormGroup(serverSearchFormGroup);
  }//end of constructor

  ngOnInit(): void {
    console.log("OnInit View Complain Class");
    this.busySpinner = true;
    this.pageConfig = new ComplainDIViewModel().pageConfig;
    this.compHeaderTableColumnNames = new ComplainDIViewModel().compHeaderTableFieldNames;
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

    this.setPagination();
  }//end of onInit


  //method to get route param
  private getParamFromRoute() {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.dashboardParameter = params.activitytype ? params.activitytype : '';//get param from dashboard
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
    // this.busySpinner = true;
    this.complaintdIservice.getHeader(this.headerparams).subscribe((res: any) => {
      console.log('get data all', JSON.parse(res.mapDetails));
      this.complaintDIViewDetails = JSON.parse(res.mapDetails);
      this.busySpinner = false;
    }, (err: any) => {
      this.busySpinner = false;
    });
  }

  private loadFacetedNav() {
    this.loadComplainStatusFacet('initial');
    this.loadComplainTypeFacet('initial');
    this.loadNatureOfComplainFacet('initial');
  }

  private loadComplainStatusFacet(callType?: string) {
    let complainStatusParam: ComplaintDIHeaderParamModel = new ComplaintDIHeaderParamModel();
    complainStatusParam.filter = this.headerparams.filter;
    complainStatusParam.fields = 'distinct LAST_ACTIVITY_ID, ACTIVITY_DESC';
    complainStatusParam.sortData = 'LAST_ACTIVITY_ID';

    this.complaintdIservice.getHeader(complainStatusParam).subscribe((res: any) => {
      this.facetedNavData.complainStatus = JSON.parse(res.mapDetails);
      if (callType && callType == 'initial') {
        this.changeStattusGroup = this.buildComplainStatusFacetFormGroup();
        this.changeStattusGroup.valueChanges.subscribe(() => this.changeFacetElement('complainStatus'));
      }
    }, (err: any) => {
      // this.busySpinner = false;
    });
  }

  private loadComplainTypeFacet(callType?: string) {
    let complainStatusParam: ComplaintDIHeaderParamModel = new ComplaintDIHeaderParamModel();
    complainStatusParam.filter = this.headerparams.filter;
    complainStatusParam.fields = 'distinct CMPLNT_TYPE_ID , CMPLNT_TYPE_DESC';
    complainStatusParam.sortData = 'CMPLNT_TYPE_ID';

    this.complaintdIservice.getHeader(complainStatusParam).subscribe((res: any) => {
      this.facetedNavData.complainType = JSON.parse(res.mapDetails);
      if (callType && callType == 'initial') {
        this.complanTypeFormgroup = this.buildComplainTypeFacetFormGroup();
        this.complanTypeFormgroup.valueChanges.subscribe(() => this.changeFacetElement('complainType'));
      }
    }, (err: any) => {
      // this.busySpinner = false;
    });
  }

  private loadNatureOfComplainFacet(callType?: string) {
    let complainStatusParam: ComplaintDIHeaderParamModel = new ComplaintDIHeaderParamModel();
    complainStatusParam.filter = this.headerparams.filter;
    complainStatusParam.fields = 'distinct NAT_CMPLNT_ID, NAT_CMPLNT_DESC';
    complainStatusParam.sortData = 'NAT_CMPLNT_ID';

    this.complaintdIservice.getHeader(complainStatusParam).subscribe((res: any) => {
      this.facetedNavData.natureOfComplain = JSON.parse(res.mapDetails);
      if (callType && callType == 'initial') {
        this.natureOfComplainGroup = this.buildNatureOfComplainFacetFormGroup();
        this.natureOfComplainGroup.valueChanges.subscribe(() => this.changeFacetElement('natureOfComplain'));
      }
    }, (err: any) => {
      // this.busySpinner = false;
    });
  }
  /**
   * changestatus form group
   */
  private buildComplainStatusFacetFormGroup() {
    let Changestattusgroup: any = {};
    this.facetedNavData.complainStatus.forEach((element, index) => {
      Changestattusgroup[element.lastActivityId] = new FormControl(false);
    });
    // console.log(Changestattusgroup)
    return new FormGroup(Changestattusgroup);
  }
  /**
   * @description complintype group
   */
  private buildComplainTypeFacetFormGroup() {
    let CoplanTypegroup: any = {};
    this.facetedNavData.complainType.forEach((element, index) => {
      CoplanTypegroup[element.complaintTypeId] = new FormControl(false);
    });
    //console.log(this.CoplanTypegroup)
    return new FormGroup(CoplanTypegroup);
  }
  private buildNatureOfComplainFacetFormGroup() {
    let NatureOfComplainGroup: any = {};
    this.facetedNavData.natureOfComplain.forEach((element, index) => {
      NatureOfComplainGroup[element.natureOfComplaintId] = new FormControl(false);
    });
    //console.log(NatureOfComplainGroup)
    return new FormGroup(NatureOfComplainGroup);
  }
  /**
   * @description change status dettect 
   */
  changeFacetElement(callingFacet: string) {
    this.changeStattusGroup;
    this.busySpinner = true;
    console.log(this.changeStattusGroup);

    let filter: string = '';
    let cmpStatusFilter: string = '';
    for (let statusCtrl in this.changeStattusGroup.value) {
      if (this.changeStattusGroup.value[statusCtrl]) {
        cmpStatusFilter += cmpStatusFilter ? 
          " OR LAST_ACTIVITY_ID='" + statusCtrl + "'" : 
          "LAST_ACTIVITY_ID='" + statusCtrl + "'";
      }
    }

    if (cmpStatusFilter) {
      cmpStatusFilter = '('+cmpStatusFilter+")"
      filter ? filter += " AND " + cmpStatusFilter : filter = cmpStatusFilter;
    }

    let cmpTypeFilter: string = '';
    for (let typeCtrl in this.complanTypeFormgroup.value) {
      if (this.complanTypeFormgroup.value[typeCtrl]) {
        cmpTypeFilter += cmpTypeFilter ? 
          " OR CMPLNT_TYPE_ID='" + typeCtrl + "'" : 
          "CMPLNT_TYPE_ID='" + typeCtrl + "'";
      }
    }

    if (cmpTypeFilter) {
      cmpTypeFilter = '('+cmpTypeFilter+")"
      filter ? filter += " AND " + cmpTypeFilter : filter = cmpTypeFilter;
    }

    let natOfCmpfacetFilter: string = '';
    for (let natCtrl in this.natureOfComplainGroup.value) {
      if (this.natureOfComplainGroup.value[natCtrl]) {
        natOfCmpfacetFilter += natOfCmpfacetFilter ? 
          " OR NAT_CMPLNT_ID='" + natCtrl + "'" : 
          "NAT_CMPLNT_ID='" + natCtrl + "'";
      }
    }

    if (natOfCmpfacetFilter) {
      natOfCmpfacetFilter = '('+natOfCmpfacetFilter+")"
      filter ? filter += " AND " + natOfCmpfacetFilter : filter = natOfCmpfacetFilter;
    }

    this.selectFacet(callingFacet, filter);
  }

  public selectFacet(facetName: string, selectedFacet: string) {
    //console.log(this.changeStattusGroup.value);
    console.log(facetName + " :: " + selectedFacet);
    switch (facetName) {
      case 'complainStatus': {
        this.headerparams.filter = selectedFacet;
        this.loadComplainTypeFacet();
        this.loadNatureOfComplainFacet();
        break;
      }
      case 'complainType': {
        this.headerparams.filter = selectedFacet;
        this.loadComplainStatusFacet();
        this.loadNatureOfComplainFacet();
        break;
      }
      case 'natureOfComplain': {
        this.headerparams.filter = selectedFacet;
        this.loadComplainStatusFacet();
        this.loadComplainTypeFacet();
        break;
      }
    }

    this.setPagination();
  }

  public getComplaintDetailsOnSelect(complaintDetail: any, viewParam?: string) {

    this.processFlowStatusDet = new ProcessFlowStatusDetailsModel().statusDetails;

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
        routePath = ROUTE_PATHS.RouteViewDetailsCloseComplainDI + '/' + complainNo + '/' + 85;
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



  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
  /**
   * 
   * @param page 
   * @param term 
   */
  setPage(page: number) {
    // get current page of items this is for local paginate
  
    console.log(this.datacount);
    this.pager = this.getPager(this.datacount, page, 20);
    // this.getlistofschoole(this.pager.currentPage - 1, 10);
    this.headerparams.pageNo = (this.pager.currentPage - 1).toString();
    this.headerparams.perPage = '20';
    this.getcomplaindetails();
    this.cd.detectChanges();



    //use to do for local pagination
    // this.pagedItems = this.allschooldata.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }
  
  setPagination() {
    // let header: ComplaintDIHeaderParamModel;
    // header.filter = '';
    this.complaintdIservice.getHeadercount(this.headerparams, 'DI').subscribe((res) => {
      console.log(res);
      this.datacount=res.xCount;
      this.setPage(1);
    }, (err) => {
      console.log(err);
    })
  }

  //new add for server search modal
  public serverSearchModal: boolean = false;
  //method to open server search modal
  public onClickFullSearchBtn(){
    this.toggleServerSearchModal();
  }//end of method
  //method to open/close modal
  private toggleServerSearchModal() {
    this.serverSearchModal = this.serverSearchModal ? false : true;
  }//end of method
  //method to cancel modal
  cancelServerSearchModal(){
    this.toggleServerSearchModal();
  }//end of method
  //on search modal submit
  public onClickSearchModalSubmit() {
    this.compHeaderTableColumnNames;
    let searchQuery: string;
    let anyValue = this.serverSearchModalFormGroup.value.anyTypeSearch;
    let complaintNumberValue = this.serverSearchModalFormGroup.value.complaintNumber;
    let customerNameValue = this.serverSearchModalFormGroup.value.customerName;
    let complaintTypeValue = this.serverSearchModalFormGroup.value.complaintType;
    let natureOfComplaintValue = this.serverSearchModalFormGroup.value.natureOfComplaint;
    let complaintStatusValue = this.serverSearchModalFormGroup.value.complaintStatus;
    if(anyValue){
      searchQuery = 
      this.compHeaderTableColumnNames.complaintNumber+" LIKE '%"+anyValue+"%' OR "
      +this.compHeaderTableColumnNames.customerName+" LIKE '%"+anyValue+"%' OR "
      +this.compHeaderTableColumnNames.complaintType+" LIKE '%"+anyValue+"%' OR "
      +this.compHeaderTableColumnNames.natureOfComplaint+" LIKE '%"+anyValue+"%' OR "
      +this.compHeaderTableColumnNames.complaintStatus+" LIKE '%"+anyValue+"%'";
    }else{
      complaintNumberValue = 
      complaintNumberValue ? this.compHeaderTableColumnNames.complaintNumber+" LIKE '%"+complaintNumberValue+"%'" : '';
      customerNameValue = 
      customerNameValue ? this.compHeaderTableColumnNames.customerName+" LIKE '%"+customerNameValue+"%' ": '';
      complaintTypeValue = 
      complaintTypeValue ? this.compHeaderTableColumnNames.complaintType+" LIKE '%"+complaintTypeValue+"%'" : '';
      natureOfComplaintValue = 
      natureOfComplaintValue ? this.compHeaderTableColumnNames.natureOfComplaint+" LIKE '%"+natureOfComplaintValue+"%'" : '';
      complaintStatusValue = 
      complaintStatusValue ? this.compHeaderTableColumnNames.complaintStatus+" LIKE '%"+complaintStatusValue+"%'" : '';
      
      searchQuery = 
      complaintNumberValue + " AND " + customerNameValue +" AND "+
      complaintTypeValue + " AND " + natureOfComplaintValue +" AND "+
      complaintStatusValue;
      
    }

    console.log("search query::",searchQuery);
  }//end of method

}//end of class
