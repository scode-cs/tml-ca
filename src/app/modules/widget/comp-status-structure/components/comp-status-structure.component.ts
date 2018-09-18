import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CompStatusStructureModel } from '../models/comp-status-structure.model';
export interface IcompStatusStructure {
  flowName: string, flowMsg: string, flowDate: string, headerClass?: string, footerClass?: string
}
@Component({
  selector: 'ispl-comp-status-structure',
  templateUrl: 'comp-status-structure.component.html',
  styleUrls: ['comp-status-structure.component.css']
})

export class CompStatusStructureComponent implements OnInit, OnChanges {
  @Input() compStatus;
  public compStatusStructure: any[] = [];
  public compStatusStructureList: IcompStatusStructure[] = [];
  constructor() {
  }

  ngOnInit(): void {

  }
  ngOnChanges() {
    this.compStatusStructure = new CompStatusStructureModel().compStatusStructureModel;
    console.log(this.compStatusStructure);

    this.compStatus;
    this.compStatusStructureList = this.constructCompStatusStructureFlow();
  }

  private constructCompStatusStructureFlow() {
    // let stopFlag: boolean = false;
    let pageFlowData: any[] = [];

    for (let process of this.compStatusStructure) {
      let compStatusStruc: IcompStatusStructure = {
        flowName: process.shortName,
        flowMsg: process.messege,
        flowDate: process.date
      };
      if (process.status <= this.compStatus) {
        compStatusStruc.headerClass = 'active-header-style';
        compStatusStruc.footerClass = 'active-footer-style';
      }
      else if (process.statusId != this.compStatus) {
        compStatusStruc.headerClass = 'inactive-header-style';
        compStatusStruc.footerClass = 'inactive-footer-style';

      }
      pageFlowData.push(compStatusStruc);
    }

    return pageFlowData;
  }

}