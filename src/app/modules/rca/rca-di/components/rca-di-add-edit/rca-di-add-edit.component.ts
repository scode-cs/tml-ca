import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { DatePipe } from '@angular/common';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { SessionErrorService } from "../../../../shared/services/session-error.service";

@Component({
    selector: 'ispl-rca-di-add-edit',
    templateUrl: 'rca-di-add-edit.component.html',
    styleUrls: ['rca-di-add-edit.component.css']
  
  })
  export class RCADIAddEditComponent implements OnInit{

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedroute: ActivatedRoute,
        private datePipe: DatePipe,//for date
        private localStorageService: LocalStorageService,
        private sessionErrorService: SessionErrorService,
    ){

    }//end of constructor

    ngOnInit(): void {
        console.log("onInit of RCADIAddEditComponent..");
    }//end of on init
  }//end of class