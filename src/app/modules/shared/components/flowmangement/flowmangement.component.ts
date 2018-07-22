import { Component, OnInit } from '@angular/core';
import { DIPolygonModel } from '../process-flow/complain-di-polygon.model';

@Component({
  selector: 'app-flowmangement',
  templateUrl: './flowmangement.component.html',
  styleUrls: ['./flowmangement.component.css']
})
export class FlowmangementComponent implements OnInit {
  public processFlowData: string[] = [];
  constructor() { }

  ngOnInit() {
    this.processFlowData = new DIPolygonModel().siteVisitRequired;
    console.log(this.processFlowData);
  }

}
