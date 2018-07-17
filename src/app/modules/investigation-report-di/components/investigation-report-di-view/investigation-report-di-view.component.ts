import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { InvestigationReportDIViewDataService } from "app/modules/investigation-report-di/services/investigation-report-di-view.service";
import { ROUTE_PATHS } from '../../../router/router-paths';
import { SessionErrorService } from "../../../shared/services/session-error.service";

@Component({
  selector: 'ispl-investigation-report-di-view',
  templateUrl: 'investigation-report-di-view.component.html',
  styleUrls: ['investigation-report-di-view.component.css']
})
export class InvestigationReportDIViewComponent implements OnInit {

  public preliInvReportDIViewDetails: any = {}//to show the complaint det in html page

  public  modifyPreliInvReport: string;//for modify complaint id
  public viewEditParam: string;//for view edit param
  //for sorting and orderType activity id parameters
  public sortSelection: any = {
    plantType: 'DI',
    sortData: '',
    orderType: '',
    filter: '',
    // this.localStorageService.appSettings.activityIdFieldName +" = " 
            // + this.localStorageService.appSettings.preliminaryInvestigationActivityId,
    fileActivityId: this.localStorageService.appSettings.preliminaryInvestigationActivityId
  };

  //takin arr for selectedData
  public selectedData: any[] = [];
  public searchFormGroup: FormGroup;
  // public gridSearch: FormControl;

  //checkbox
  public checkAll : boolean = false;
  public otherCheck : boolean = false;

  //close complaint var to check complaint is reso or not in html
  public resoActivityId: number = this.localStorageService.appSettings.resolutionOfComplaintsAtCustomerPlaceActivityId;
  

  constructor(
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private investigationReportDIViewDataService: InvestigationReportDIViewDataService,
    private sessionErrorService: SessionErrorService,
    private router: Router
  ) {
    console.log("View PreliminaryInvestigationReportDIViewComponent Class");
      this.searchFormGroup = this.formBuilder.group({
      'gridSearch': ''
    });
   
  }//end of constructor

  ngOnInit(): void {
    console.log("OnInit PreliminaryInvestigationReportDIViewComponent Class");
    this.getPreliInvestigationReportDIViewDetValues(this.sortSelection);
    this.getParamFromRoute();//to get route param
  }//end of onInit
  //method to get route param
  private getParamFromRoute(){
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.viewEditParam = params.viewEditParam ? params.viewEditParam : '';//get the viewEditParam to check wheather its edit or not
      console.log("this. view edit param: ",this.viewEditParam);
      this.selectedData = [];//removing the array 
    });
  }
  //end of method to get route param

  //method for showing the preli view details
  getPreliInvestigationReportDIViewDetValues(prelijson: any) {
    console.log("sortSelection for preli: ",this.sortSelection);
    this.investigationReportDIViewDataService.getPreliminaryInvestigationReportDIViewDetails(this.sortSelection).
      subscribe(res => {
        console.log("preliInvReportDIViewDetails : ", res),
          this.preliInvReportDIViewDetails = res;
      },
      err => {
        console.log(err);
        this.sessionErrorService.routeToLogin(err._body);
      });
  }//end of service call method

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
    this.getPreliInvestigationReportDIViewDetValues(this.sortSelection);
    this.selectedData = [];//removing the array
  }//end of onclick method

  //creating method to get complaint details by single check
  preliInvReportDIDetailsByCheckbox(preliInvReportDIDetail, viewModifyParam?: string) {
    this.getPreliInvReportDIDetByCheckbox(preliInvReportDIDetail,viewModifyParam);

  }
  getPreliInvReportDIDetByCheckbox(preliInvReportDIDet: any, viewModifyParam?: string) {
    console.log("checked : ", preliInvReportDIDet);
    console.log(" viewModifyParam from preli view ",viewModifyParam);
    //checking the length of selectedData by clicking on checkbox
    if (this.selectedData.length == 0) {
      //push userDetails obj to selectedData array
      this.selectedData.push(preliInvReportDIDet);
      console.log("selected data : ", this.selectedData);
    } else {
      let indexCount: number = 0;
      let removeFlag:boolean = false;
      for (let selectedData of this.selectedData) {
        if (selectedData.complaintRefNo == preliInvReportDIDet.complaintRefNo) {
          this.selectedData.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("preliInvReportDI selected data after deleting: ", this.selectedData);
      if (!removeFlag) {
        this.selectedData.push(preliInvReportDIDet);
      }//end of if
      console.log("preliInvReportDI selected data after pushing: ", this.selectedData);
    }//end of else
    if(viewModifyParam == 'view'){
      this.viewComplaint();
    }
  }//end of method of getUserDetailsByCheckbox


  //creating a method to check selectAll checkbox
  selectAllCheck() {
    this.checkAll = !this.checkAll;
    this.selectedData = (this.checkAll) ? this.preliInvReportDIViewDetails.details : [];
    console.log("preliInvReportDI this.selectedData on selectAllCheck method : ", this.selectedData);
    if (this.checkAll == true) {
      this.otherCheck = true;
    } else {
      this.otherCheck = false;
    }
  }//end of selectAllCheck method


  // //method for add preli
  // addComplaint(){
  //    this.selectedData = [];//removing the array 
  //    // Not authenticated
  //   this.router.navigate([ROUTE_PATHS.RoutePreliminaryInvestigationDiAdd]);
  // }//end of add preli method

  //method for edit preli
  editComplaint(){    
    for(let preliReportDet of this.selectedData){
      this.modifyPreliInvReport = preliReportDet.complaintRefNo;
    }//end of for
    console.log("preli investigation report for modify : ",this.modifyPreliInvReport);        
     // Not authenticated
    this.router.navigate([ROUTE_PATHS.RouteModifyInvestigationReportDi,this.modifyPreliInvReport]);
  }//end of add preli method

  //start method for view preli
  viewComplaint(){
    for(let preliReportDet of this.selectedData){
      this.modifyPreliInvReport = preliReportDet.complaintRefNo;
    }//end of for
    console.log("preli investigation report for view details : ",this.viewEditParam,this.modifyPreliInvReport);
        
     // Not authenticated
    this.router.navigate([ROUTE_PATHS.RouterViewDetailsInvestigationReportDi,this.viewEditParam,this.modifyPreliInvReport]);

  }//end of method for view preli


  
}//end of class
