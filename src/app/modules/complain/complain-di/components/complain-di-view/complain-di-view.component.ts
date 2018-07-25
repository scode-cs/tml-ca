import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ViewComplaintDIDataService } from '../../services/complaint-di-view-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { ComplainDIViewModel } from '../../models/complain-di-view.model';
import { TilesInteractionService } from '../../../../dashboard/services/tiles-interaction.service';
import { SessionErrorService } from '../../../../shared/services/session-error.service';
import { ProcessFlowStatusDetailsModel } from '../../../../shared/components/process-flow/process-flow-status-details.model';

@Component({
  selector: 'ispl-complain-di-view',
  templateUrl: 'complain-di-view.component.html',
  styleUrls: ['complain-di-view.component.css']
})
export class ComplainDIViewComponent implements OnInit {

  public complaintDIViewDetails: any = {}//to show the complaint det in html page

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

  //for busy spinner
  public busySpinner: any = {
    gridBusy: true,
    facetedNavBusy: true,
    busy: true
  };
  public title: string = '';
  //complaint register var to check complaint is registered or not in html
  public complaintLoggedActivityId: number = this.localStorageService.appSettings.complaintRegistrationActivityId;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private viewComplaintDIDataService: ViewComplaintDIDataService,
    private router: Router,
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
    this.pageConfig = new ComplainDIViewModel().pageConfig; 
    //new add for view complaint according to parameter
    // let routeSubscription: Subscription;
    // routeSubscription = this.activatedroute.params.subscribe(params => { 
    //   this.dashboardParameter = params.activitytype ? params.activitytype : '';
    // });
    this.getParamFromRoute();//to get route param
    console.log("view complaint according to parameter [dashboard]: ",this.dashboardParameter);
    this.parameterCheck(this.dashboardParameter);
  }//end of onInit
  
  
  //method to get route param
  private getParamFromRoute(){
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
  private parameterCheck(routeParameter: string){
    if(this.dashboardParameter == ''){
      this.complaintViewWsCall(this.sortSelection);
      this.getfacetedValues(this.sortSelection);
      console.log("without dashboard calling part");
      console.log("without dashboard sortselection json : ",this.sortSelection);
    }else{
      console.log("ws tiles from dashboard::::::: ",this.tilesInteractionService.wsFilter);
      this.sortSelection.filter = this.tilesInteractionService.wsFilter.filter;//from dashboard
      this.sortSelection.fileActivityId = this.tilesInteractionService.wsFilter.fileActivityId;
      this.sortSelection.facetedArray = [];
      //fordashboard reset filter
      this.dashboardResetFilter.filter = this.tilesInteractionService.wsFilter.filter;//from dashboard
      this.dashboardResetFilter.fileActivityId = this.tilesInteractionService.wsFilter.fileActivityId;
      this.dashboardResetFilter.facetedArray = [];
      //end of dashboard reset filter
      this.complaintViewWsCall(this.sortSelection);//from dashboard
      this.getfacetedValues(this.sortSelection);
      console.log("with dashboard calling part");

    }
  }//end of checking if parameter have value or not

  //method for showing the complaint details by service call
  complaintViewWsCall(viewDetParaJson: any) {
    this.busySpinner.gridBusy = true;
     //method to check facet array blank or not
     let wsCallComplaintView: any;
     if( this.facetedArray.length > 0){
       wsCallComplaintView =
         this.viewComplaintDIDataService.getcomplaintDIViewDetails(this.sortSelection);
      }else{
        if(this.dashboardParameter){//check whether its called from dashboard
          if( this.facetedArray.length > 0){
          wsCallComplaintView = 
            this.viewComplaintDIDataService.getcomplaintDIViewDetails(this.sortSelection);
          }else{
            if(this.sortSelection.sortData || this.sortSelection.orderType){
              this.dashboardResetFilter.sortData = this.sortSelection.sortData;
              this.dashboardResetFilter.orderType = this.sortSelection.orderType;
              // wsCallComplaintView =  this.viewComplaintDIDataService.getcomplaintDIViewDetails(this.dashboardResetFilter);
            }else{
              this.dashboardResetFilter.sortData = '';
              this.dashboardResetFilter.orderType = '';
            }
            wsCallComplaintView = 
             this.viewComplaintDIDataService.getcomplaintDIViewDetails(this.dashboardResetFilter);            
          }//end of else array length is greater than 0
        }else{//if dashboard parameter is blank
          if(this.sortSelection.sortData || this.sortSelection.orderType){
            this.resetFilter.sortData = this.sortSelection.sortData;
            this.resetFilter.orderType = this.sortSelection.orderType;
            // wsCallComplaintView =  this.viewComplaintDIDataService.getcomplaintDIViewDetails(this.resetFilter);
          }else{
            this.resetFilter.sortData = '';
            this.resetFilter.orderType = '';
          }
          wsCallComplaintView = 
           this.viewComplaintDIDataService.getcomplaintDIViewDetails(this.resetFilter);
        }
      }//end of faceted array check
    wsCallComplaintView.
      subscribe(res => {
        console.log("complaintDIViewDetails : ", res),
          this.complaintDIViewDetails = res;
          this.busySpinner.gridBusy = false;
          this.updateBusySpinner();
      },
      err => {
        console.log(err);
        this.busySpinner.gridBusy = false;
        this.updateBusySpinner();
        this.sessionErrorService.routeToLogin(err._body);
      });
  }//end of service call method by service call

  //method to fetch facted data at the time of page loading by service call
   getfacetedValues(facetedJsonBody: any) {
     this.sortSelection.facetedArray = this.facetedArray;
     //method to check facet array blank or not
     let wsCallFacet: any;

     if( this.facetedArray.length > 0){
        wsCallFacet = this.viewComplaintDIDataService.getfacetedData(this.sortSelection);
     }else{
      if(this.dashboardParameter){//check whether its called from dashboard
        if( this.facetedArray.length > 0){
          wsCallFacet = this.viewComplaintDIDataService.getfacetedData(this.sortSelection);
        }else{
          if(this.sortSelection.sortData || this.sortSelection.orderType){
            this.dashboardResetFilter.sortData = this.sortSelection.sortData;
            this.dashboardResetFilter.orderType = this.sortSelection.orderType;
            // wsCallComplaintView =  this.viewComplaintDIDataService.getcomplaintDIViewDetails(this.dashboardResetFilter);
          }else{
            this.dashboardResetFilter.sortData = '';
            this.dashboardResetFilter.orderType = '';
          }
          wsCallFacet = this.viewComplaintDIDataService.getfacetedData(this.dashboardResetFilter);
        }//end of else array length is greater than 0
      }else{//if dashboard parameter is blank
        if(this.sortSelection.sortData || this.sortSelection.orderType){
          this.resetFilter.sortData = this.sortSelection.sortData;
          this.resetFilter.orderType = this.sortSelection.orderType;
          // wsCallComplaintView =  this.viewComplaintDIDataService.getcomplaintDIViewDetails(this.resetFilter);
        }else{
          this.resetFilter.sortData = '';
          this.resetFilter.orderType = '';
        }
        wsCallFacet = this.viewComplaintDIDataService.getfacetedData(this.resetFilter);
      }
     }//end of faceted array check
    wsCallFacet.
      subscribe(res => {
        console.log("faceted data for complaint view di page : ", res);
          this.facetedDataDetails = res.facetedNav;
          this.sortSelection.prevFilter = res.prevFilter;
          console.log("res.facetedNav for complaint view di page : ", this.facetedDataDetails);
          this.busySpinner.facetedNavBusy = false;
          this.updateBusySpinner();
      },
      err => {
        console.log(err);
        this.busySpinner.facetedNavBusy = false;
        this.updateBusySpinner();
        this.sessionErrorService.routeToLogin(err._body);
      });
  }//end of method to fetch facted data at the time of page loading by service call


  

  //creating a method for getting the value of heading and sorting all data accordin to ordertype
  onClick(val) {
    console.log("clicked value : " + val);
    if (this.sortSelection.sortData == val) {
      this.sortSelection.orderType = "DESC";
    } else {
      this.sortSelection.orderType = "ASC";
    }
    this.sortSelection.sortData = val;
    console.log("sortSelection : ", this.sortSelection);
    this.complaintViewWsCall(this.sortSelection);
    this.selectedData = [];//removing the array 
  }//end of onclick method

  //creating method to get complaint details by single check
  selectComplaint(complaintDetail, viewParam?: string) {
    this.getComplaintDetailsOnSelect(complaintDetail, viewParam);

  }
  getComplaintDetailsOnSelect(complaintDetail: any, viewParam?: string) {
    console.log("checked : ", complaintDetail);
    this.processFlowStatusDet = new ProcessFlowStatusDetailsModel().statusDetails;
    console.log("this.processFlowStatusDet======",this.processFlowStatusDet);
    console.log("param to check the click from view::",viewParam);

    let complainStatusId: string = complaintDetail['statusId'];

    switch(complainStatusId) {
      case '10': {

      };
      case '40': {

      };
      case '50': {

      };
      case '60': {

      };
      case '70': {

      };
      case '80': {

      }
    }

    //TODO: Need to add route logic

  }//end of method of getcomplaintDetailByCheckbox


  //creating a method to check selectAll checkbox
  selectAllCheck() {
    this.checkAll = !this.checkAll;
    this.selectedData = (this.checkAll) ? this.complaintDIViewDetails.details : [];
    console.log("this.selectedData on selectAllCheck method : ", this.selectedData);
    if (this.checkAll == true) {
      this.otherCheck = true;
    } else {
      this.otherCheck = false;
    }
  }//end of selectAllCheck method


  //method for add user
  addComplaint() {
    this.selectedData = [];//removing the array 
    // Not authenticated
    this.router.navigate([ROUTE_PATHS.RouteComplainDIRegister]);
  }//end of add user method

  //method for edit user
  editComplaint() {

    for (let user of this.selectedData) {
      this.modifyComplaint = user.complaintReferenceNo;
    }//end of for
    console.log("complaintRefId for modify : ", this.modifyComplaint);

    // Not authenticated
    this.router.navigate([ROUTE_PATHS.RouteModifyComplaint, this.modifyComplaint]);
  }//end of add user method

  //method for edit user
  viewComplaintDetails() {

    for (let user of this.selectedData) {
      this.modifyComplaint = user.complaintReferenceNo;
    }//end of for
    console.log("complaintRefId for view : ", this.modifyComplaint);
    // //start condition of wheather the param coming from dashboard or not
    // if(this.dashboardParameter){
    //   this.viewEditParam = "view";
    // }
    // //end of condition of wheather the param coming from dashboard or not
 

    // Not authenticated
    // this.router.navigate([ROUTE_PATHS.RouteComplainDIViewDetails,this.viewEditParam, this.modifyComplaint]);
  }//end of add user method


  //method to get filter value
  public onClickFilter(header, checkedValue , checkedBoolean) {
    this.selectedData = [];//removing the array 
    console.log("checkedHeader: ", header);
    console.log("checkedValue: ", checkedValue);
    console.log("checkedBoolean: ",checkedBoolean);


    //checking the length of selectedData by clicking on checkbox
    if (this.facetedArray.length == 0) {
      //push complaintDetail obj to selectedData array
      this.facetedArray.push({ facetedGrp: header, facetedData: checkedValue });
      console.log("complaint di view facetedArray : ", this.facetedArray);
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let selectedData of this.facetedArray) {
        if (selectedData.facetedData == checkedValue) {
          this.facetedArray.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("complaint di view facetedArray data after deleting: ", this.facetedArray);
      if (!removeFlag) {
        this.facetedArray.push({ facetedGrp: header, facetedData: checkedValue });
      }//end of if
      console.log("complaint di view facetedArray after pushing: ", this.facetedArray);
    }//end of else

    // let facetQuery: string = '';//for faceted query
    console.log("facetedArray: ", this.facetedArray);
    if (this.facetedArray && this.facetedArray.length > 0) {
      let facetTree: any = {};
      for (let facetNode of this.facetedArray) {
        let facetQuery: string = '';
        if (facetTree[facetNode.facetedGrp]) {
          facetQuery += facetTree[facetNode.facetedGrp] + ' OR ';
          facetQuery += facetNode.facetedGrp + '=' +'\''+ facetNode.facetedData +'\'';
        }  else {
          facetQuery = facetNode.facetedGrp + '=' +'\''+ facetNode.facetedData +'\'';
        }
        facetTree[facetNode.facetedGrp] = facetQuery;
      }

      let facetQryString: string = ''; 
      if (facetTree) {
        for (let facetNodeIndex in facetTree) {
          facetQryString ? facetQryString += ' AND ' : null;
          facetQryString += facetTree[facetNodeIndex];
        }
      }

      console.log('facetTree: ', facetTree);
      console.log('facetQuery: ', facetQryString);
      this.filterOption = facetQryString;
    //end of if arr length check
    }else{
      this.filterOption = '';
    }

    console.log("facetQuery for filter : ",this.filterOption);

  
  //checking dashboard parameter and build the query according to dashboardParameter parameter
  if(this.dashboardParameter){
    if(this.tilesInteractionService.wsFilter.filter == ''){
      this.sortSelection.filter = this.filterOption;
    }else{
      this.sortSelection.filter = this.tilesInteractionService.wsFilter.filter + " AND " +  this.filterOption;
    }
  }else{
   this.sortSelection.filter = this.filterOption;
  }

  //check the checkboolean is true or false then set the header to the obj
  if (checkedBoolean == true ){
    this.sortSelection.callingFromFacet = '';
  }else if (checkedBoolean == false){
   this.sortSelection.callingFromFacet = header;
  }
  
   console.log("this.sortselection after filteration....",this.sortSelection);
   this.busySpinner.gridBusy = true;//busy spinner
   this.busySpinner.facetedNavBusy = true;//busy spinner
   this.updateBusySpinner();
   //calling the method to fetch the grid data
   if ( this.facetedArray.length > 0){
    this.complaintViewWsCall(this.sortSelection);//view grid data
    this.getfacetedValues(this.sortSelection);//for faceted nav
   }else{
    this.complaintViewWsCall(this.resetFilter);//view grid data
    this.getfacetedValues(this.resetFilter);//for faceted nav
   }

  //  this.previousFilter = this.filterOption;
  } //end of method to get filter value


//to load the spinner
private updateBusySpinner() {
  if (this.busySpinner.gridBusy || this.busySpinner.facetedNavBusy) { 
    this.busySpinner.busy = true;
  } else if(this.busySpinner.gridBusy== false && this.busySpinner.facetedNavBusy == false){
    this.busySpinner.busy = false;
  }//end of else if
}//end of busy spinner method



}//end of class
