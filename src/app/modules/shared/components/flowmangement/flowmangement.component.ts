import { Component, OnInit, Input } from '@angular/core';
import { DIPolygonModel } from '../process-flow/complain-di-polygon.model';
import { ProcessFlowStatusDetailsModel } from '../process-flow/process-flow-status-details.model';
export interface IflowStructure {
  flowName: string, flowClass?: string, isRoutable?: boolean, route?: string
}
@Component({
  selector: 'app-flowmangement',
  templateUrl: './flowmangement.component.html',
  styleUrls: ['./flowmangement.component.css']
})
export class FlowmangementComponent implements OnInit {
  @Input() complianStatus;
  @Input() pageType;

  private constants: any = {
    addPage: 'add',
    viewPage: 'view'
  };

  public processFlowData: any[] = [];

  public flowStructureList: IflowStructure[] = [];

  constructor() {

    console.log(this.pageType);
  }

  ngOnInit() {
    this.processFlowData = new ProcessFlowStatusDetailsModel().statusDetails;
    console.log(this.processFlowData);

    this.pageType;
    this.complianStatus;

    this.constructFlowStructure();
  }

  private constructFlowStructure() {
    if (this.pageType == this.constants.addPage) {
      this.flowStructureList = this.constructAddPageFlow();
    }

    if (this.pageType == this.constants.viewPage) {
      this.flowStructureList = this.constructViewPageFlow();
    }
  }

  //{statusId: 10, statusName: 'Registration', viewRoute: '#'+ROUTE_PATHS.RouteComplainDIViewDetails+'View', editRoute: '#'+ROUTE_PATHS.RouteModifyComplaint},
  private constructAddPageFlow() {
    let stopFlag: boolean = false;
    let pageFlowData: any[] = [];

    for (let process of this.processFlowData) {
      let flowStructure: IflowStructure = { flowName: process.statusName };
      // flowStructure.flowName = process.statusName;

      if (process.statusId != this.complianStatus && !stopFlag) {
        flowStructure.flowClass = 'step-active';
        flowStructure.isRoutable = true;
        flowStructure.route = process.viewRoute;
      }
      else if (process.statusId != this.complianStatus && stopFlag) {
        flowStructure.flowClass = 'step-inactive';
        flowStructure.isRoutable = false;
      }
      else if (process.statusId == this.complianStatus) {
        flowStructure.flowClass = 'step-complete';
        flowStructure.isRoutable = true;
        flowStructure.route = process.viewRoute;

        stopFlag = true;
      }
      pageFlowData.push(flowStructure);
    }

    return pageFlowData;
  }

  private constructViewPageFlow(): IflowStructure[] {
    let stopFlag: boolean = false;
    let pageFlowData: any[] = [];

    for (let process of this.processFlowData) {
      let flowStructure: IflowStructure = { flowName: process.statusName };
      // flowStructure.flowName = process.statusName;

      if (process.statusId != this.complianStatus && !stopFlag) {
        flowStructure.flowClass = 'step-active';
        flowStructure.isRoutable = true;
        flowStructure.route = process.viewRoute;
      }
      else if (process.statusId != this.complianStatus && stopFlag) {
        flowStructure.flowClass = 'step-inactive';
        flowStructure.isRoutable = false;
      }
      else if (process.statusId == this.complianStatus) {
        flowStructure.flowClass = 'step-active';
        flowStructure.isRoutable = true;
        flowStructure.route = process.viewRoute;

        stopFlag = true;
      }
      pageFlowData.push(flowStructure);
    }

    return pageFlowData;
  }

}
