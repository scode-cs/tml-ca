import { Component, OnInit } from '@angular/core';
import { CompStatusStructureModel } from '../models/comp-status-structure.model';

@Component({
    selector: 'ispl-comp-status-structure',
    templateUrl: 'comp-status-structure.component.html',
    styleUrls: ['comp-status-structure.component.css']
  })

  export class CompStatusStructureComponent implements OnInit{
    public compStatusStructure: any[] = [];
    
    constructor(){ 
      this.compStatusStructure = new CompStatusStructureModel().compStatusStructureModel;
    }

    ngOnInit(): void {

    }
}