import { Component, Input, Compiler, OnInit } from '@angular/core';
import { APP_DASHBOARD_ANIMATIONS } from "../../shared/components/animations/app-animations";
import { ViewComplaintDIDataService } from "../../complain/complain-di/services/complaint-di-view-data.service";
import { ViewComplaintPIDataService } from "../../complain/complain-pi/services/complaint-pi-view-data.service";
import { LocalStorageService } from "../../shared/services/local-storage.service";
import { Router } from '@angular/router';
import { TilesFilterModel } from "../models/tiles-filter.model";
import { ViewUserDataService } from "../../user/services/view-user-data.service";
import { ViewRoleDataService } from "../../role/services/view-role-data.service";
import { ROUTE_PATHS } from '../../router/router-paths';
import { ComplaintDIService } from '../../shared/services/complaint-di.service';

@Component({
  selector: 'ppr-dashboard-batch',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  animations: APP_DASHBOARD_ANIMATIONS
})
export class DashboardComponent implements OnInit {

  public tempPlantType: string = '';//for rolename
  private openDIPIComplaintService: any;//for common service
  // public commonButtonLink: any;//for common button link

  result: Array<any>;
  tiles1: any = {
    tilesHeader: 'Registered Complaints',
    tilesBodyText: 'Total Registered Complaints',
    tilesBodyNumber: '-',
    color: '#00ad21',
    buttonText: 'View Details',
    buttonLink: 'filtered'

  };

  tiles2: any = {
    tilesHeader: 'Closed Complaints',
    tilesBodyText: 'Total Closed Complaints',
    tilesBodyNumber: '-',
    color: '#3078BE',
    buttonText: 'View Details',
    buttonLink: 'filtered'

  };
  tiles3: any = {
    tilesHeader: 'Open Complaints',
    tilesBodyText: 'Total Open Complaints',
    tilesBodyNumber: '-',
    color: '#00ad21',
    buttonText: 'View Details',
    buttonLink: 'filtered'

  };

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    // private viewComplaintDIDataService: ViewComplaintDIDataService,
    private complaintDIService: ComplaintDIService,
    private viewComplaintPIDataService: ViewComplaintPIDataService,
    private viewUserDataService: ViewUserDataService,
    private viewRoleDataService: ViewRoleDataService,
  ) {

    this.tempPlantType = this.localStorageService.user.plantType;

    console.log("Dashboard Batch Constructor...");
    console.log("tempPlantType : ", this.tempPlantType);
  }

  ngOnInit() {
    this.getDataTile1();//registered complaint
    this.getDataTile2();//closed complaint
    this.getDataTile3();//open complaint
  }

  //for view complaint -- DI registered complaint
  private getDataTile1() {
    let tilesFilter: any = {
      plantType: '',
      sortData: '',
      orderType: '',
      filter: '',
      fileActivityId: this.localStorageService.appSettings.defaultActivityId
    };
    //set filter to get di total complaint  
    let diTilesFilter: any = {
      filter: ''
    };
    // role name checking
    if (this.tempPlantType === 'BOTH') {
      this.tiles1.tilesHeader = "Total Complaints";
      this.tiles1.tilesBodyText = "";

      tilesFilter.plantType = 'DI';
      this.openDIPIComplaintService = this.complaintDIService.getHeadercount(diTilesFilter, 'DI');
      // this.viewComplaintDIDataService.getcomplaintDIViewDetails(tilesFilter);
    } else if (this.tempPlantType === 'DI') {
      this.tiles1.tilesHeader = "Total Complaints";
      this.tiles1.tilesBodyText = "";

      tilesFilter.plantType = 'DI';
      this.openDIPIComplaintService = this.complaintDIService.getHeadercount(diTilesFilter, 'DI');
      // this.viewComplaintDIDataService.getcomplaintDIViewDetails(tilesFilter);

    } else if (this.tempPlantType === 'PI') {
      tilesFilter.plantType = 'PI';
      this.openDIPIComplaintService =
        this.viewComplaintPIDataService.getComplaintViewDetails(tilesFilter);
    } else if (this.tempPlantType === 'ADMN') {
      this.tiles1.tilesHeader = "User Details";
      this.tiles1.tilesBodyText = "Total User Details";
      this.tiles3.buttonLink = "user";
      this.openDIPIComplaintService =
        this.viewUserDataService.getUserViewDetails();
    }
    this.tiles1.wsFilter = tilesFilter;

    this.openDIPIComplaintService
      .subscribe(res => {
        console.log("res of reg complaint for tiles1..", res);
        this.tiles1.tilesBodyNumber = res.xCount;

      },
        error => {
          if (error.status == 401) {
          }
        });
  }//end of method DI view complaint

  //for view complaint -- DI CLOSED complaint
  private getDataTile2() {
    let tilesFilter: any = {
      plantType: '',
      sortData: '',
      orderType: '',
      filter: '',
      fileActivityId: this.localStorageService.appSettings.defaultActivityId
    };
    tilesFilter.filter = this.localStorageService.appSettings.activityIdFieldName + " = "
      + this.localStorageService.appSettings.closeComplaintActivityId;
    tilesFilter.fileActivityId = this.localStorageService.appSettings.closeComplaintActivityId;

    //set filter for di
    let diTilesFilter: any = {
      filter: ''
    };
    diTilesFilter.filter = this.localStorageService.appSettings.lastActivityIdFieldName + '=' + 80;//close activity id
    // role name checking
    if (this.tempPlantType === 'BOTH') {
      this.tiles2.tilesHeader = "Close Complaints";
      this.tiles2.tilesBodyText = "";
      tilesFilter.plantType = 'DI';
      this.openDIPIComplaintService = this.complaintDIService.getHeadercount(diTilesFilter, 'DI');
      //this.viewComplaintDIDataService.getcomplaintDIViewDetails(tilesFilter);
    } else if (this.tempPlantType === 'DI') {
      this.tiles2.tilesHeader = "Close Complaints";
      this.tiles2.tilesBodyText = "";
      tilesFilter.plantType = 'DI';
      this.openDIPIComplaintService = this.complaintDIService.getHeadercount(diTilesFilter, 'DI');
      //this.viewComplaintDIDataService.getcomplaintDIViewDetails(tilesFilter);
    } else if (this.tempPlantType === 'PI') {
      tilesFilter.plantType = 'PI';
      this.openDIPIComplaintService = this.viewComplaintPIDataService.getComplaintViewDetails(tilesFilter);
    }

    this.tiles2.wsFilter = tilesFilter;
    if (this.tempPlantType === 'ADMN') {

    } else {
      console.log("dashboard parameter for close complaint : ", tilesFilter);
      this.openDIPIComplaintService
        .subscribe(res => {
          console.log("res of close complaint for tiles2..", res);
          this.tiles2.tilesBodyNumber = res.xCount;
        },
          error => {
            if (error.status == 401) {
            }
          });
    }
  }//end of method DI view complaint

  //for view complaint -- DI open complaint
  private getDataTile3() {
    let tilesFilter: any = {
      plantType: '',
      sortData: '',
      orderType: '',
      filter: '',
      fileActivityId: this.localStorageService.appSettings.defaultActivityId
    };
    tilesFilter.filter = this.localStorageService.appSettings.activityIdFieldName + " >= "
      + this.localStorageService.appSettings.complaintRegistrationActivityId
      + " AND " + this.localStorageService.appSettings.activityIdFieldName + " < "
      + this.localStorageService.appSettings.closeComplaintActivityId;

    tilesFilter.fileActivityId = this.localStorageService.appSettings.pendingComplaintActivityId;

    //set filter for di
    let diTilesFilter: any = {
      filter: ''
    };
    diTilesFilter.filter = this.localStorageService.appSettings.lastActivityIdFieldName + '=' + 10;
    // role name checking
    if (this.tempPlantType === 'BOTH') {
      //set the label of tiles
      this.tiles3.tilesHeader = "Newly Reg. Complaints";
      this.tiles3.tilesBodyText = "";
      tilesFilter.plantType = 'DI';
      this.openDIPIComplaintService = this.complaintDIService.getHeadercount(diTilesFilter, 'DI');
      //this.viewComplaintDIDataService.getcomplaintDIViewDetails(tilesFilter);
    } else if (this.tempPlantType === 'DI') {
      //set the label of tiles
      this.tiles3.tilesHeader = "Newly Reg. Complaints";
      this.tiles3.tilesBodyText = "";
      tilesFilter.plantType = 'DI';
      this.openDIPIComplaintService = this.complaintDIService.getHeadercount(diTilesFilter, 'DI');
    } else if (this.tempPlantType === 'PI') {
      tilesFilter.plantType = 'PI';
      this.openDIPIComplaintService = this.viewComplaintPIDataService.getComplaintViewDetails(tilesFilter);
    } else if (this.tempPlantType === 'ADMN') {
      this.tiles3.tilesHeader = "Role Details";
      this.tiles3.tilesBodyText = "Total Role Details";
      this.tiles3.buttonLink = "role";
      this.openDIPIComplaintService =
        this.viewRoleDataService.getRoleViewDetails();
    }
    this.tiles3.wsFilter = tilesFilter;

    console.log("dashboard parameter for pending complaint: ", tilesFilter);
    this.openDIPIComplaintService
      .subscribe(res => {
        console.log("res of open complaint by tiles3..", res);
        this.tiles3.tilesBodyNumber = res.xCount;
      },
        error => {
          if (error.status == 401) {
          }
        });

  }//end of method DI view complaint

  //method to quick links icon click route
  public onQuickLinkIconClick(iconinfo: string) {
    if (iconinfo === 'add') {
      this.router.navigate([ROUTE_PATHS.RouteComplainDIRegister]);
    } else if (iconinfo === 'view') {
      this.router.navigate([ROUTE_PATHS.RouteComplainDIView]);
    }
  }//end of method


}//end of class
