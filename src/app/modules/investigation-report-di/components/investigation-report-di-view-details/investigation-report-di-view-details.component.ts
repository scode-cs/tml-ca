import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastService } from "../../../home/services/toast-service";
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ROUTE_PATHS } from '../../../router/router-paths';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';//new add for forkjoin
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { InvestigationReportDIDataService } from "app/modules/investigation-report-di/services/investigation-report-di.service";
import { NgbdModalComponent } from '../../../widget/modal/components/modal-component';
import { AppUrlsConst, WebServiceConst } from '../../../app-config';
import { DatePipe } from '@angular/common';
import { SessionErrorService } from "../../../shared/services/session-error.service";

@Component({
  selector: 'ispl-investigation-report-di-view-details-form',
  templateUrl: 'investigation-report-di-view-details.component.html',
  // templateUrl: 'test.html',
  styleUrls: ['investigation-report-di-view-details.component.css']
})
export class InvestigationReportDiViewDetailsComponent implements OnInit {
 
  public title: string;

  //creating a FormGroup for Preliminary Investigation
  public preliInvestFormGroup: FormGroup;

  public stencilCheckedDataArr: any[] = [];//to store the checked stencil data from li
  public surfaceOuterCheckedDataArr: any[] = [];//to store checked surface outer data from li
  public socketCheckedDataArr: any[] = [];//to store the checked socket data from li
  public spigotCheckedDataArr: any[] = [];//to store checked spigot data from li
  public coatingBitCheckedDataArr: any[] = [];//to store the checked coatingBit data from li
  public innerCMLCheckedDataArr: any[] = [];//to store checked spigot data from li 
  public lubricationCheckedDataArr: any[] = [];//to store checked lubrication data from li
  public fittingsJointingCheckedDataArr: any[] = [];//to store the checked fittingsJointing data from li
  public loadingRelatedCheckedDataArr: any[] = [];//to store checked loadingRelated data from li 
  public pipeLayingCheckedDataArr: any[] = [];//to store the checked pipeLaying data from li

  public stencilVal: any = {};//get stencil val
  public socketVal: any = {};//get socket val
  public spigotVal: any = {};//get spigot val
  public surfaceOuterVal: any = {};//get surfaceOuter val
  public coatingBitVal: any = {};//get coatingBit val
  public innerCMLVal: any = {};//get innerCML val
  public lubricationVal: any = {};//get lubrication val
  public fittingsJointingVal: any = {};//get fittingsJointingVal
  public loadingRelatedVal: any = {};//get loadingRelated val
  public pipeLayingVal: any = {};//get pipeLaying val
  public diaVal: any = {};//get dia val
  public classificationVal: any = {};//get classification val
  public areaSalesManagerDetails: any = [];//get areaSalesManagerDetailsVal
  public complaintRefNoVal: any = [];//get comp ref no val for dropdown

  public complaintReferenceNo: string;//to get complaint ref no from html and send it as a parameter
  public complaintReferenceDetails: any = {};//to get complaint ref details for add from service class

  public complaintReferenceDetailsForModify: any = {};//to get complaint ref details[for view] from service class

  //these variables are used for html view purpose
  public siteVisitDt: string = '';
  public preliDateView: string = '';//for preli date view
  public supplyCommencementDate: string = '';//supplyCommencementDate for view purpose
  public lastDateOfSupply: string = '';//lastDateOfSupply for view purpose
  public concernedPersonName: string = '';
  public concernedPersonContactNo: string = '';
  // public totalNoOfPipes: number = 0;
  public totalQtyInMtrs: number = 0;
  public totalQtyInTons: number = 0;
  //array to store item details
  public itemDetailsArr: any[] = [];

  //var for view
  public complaintRefNoForUpdate: string;
  //var for checkboxes
  public stencilCheck: boolean = false;
  //busySpinner 
  public busySpinner: any = {
    busy: true,
    allPreliBusy: true,
    editPreliBusy: false,//for editing preli
    submitBusy: false,//for submit spinner
  }
  public preliComplitionResult: any = {};//string = "NA";
  public resMsgType: string = "Info";//for showing error msg in html page
  public errorConst: string = "Error";//error constant
  public infoConstant: string = "Info";//info constant
  public resErrorMsg: string;
  //for file
  public fileActivityId: number = this.localStorageService.appSettings.preliminaryInvestigationActivityId;//to get uploaded file for DI edit
  


  constructor(
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    // private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private investigationReportDIDataService: InvestigationReportDIDataService,
    private modalService: NgbModal,//modal
    private sessionErrorService: SessionErrorService,
    private datePipe: DatePipe//for date
  ) {
  }

  ngOnInit(): void {
    let routeSubscription: Subscription;
    routeSubscription = this.activatedroute.params.subscribe(params => {
      this.complaintRefNoForUpdate = params.complaintReferenceNo ? params.complaintReferenceNo : '';
    });
    console.log("complaintReferenceNo for view in preliminary-investigation-di-add-component: ",
      this.complaintRefNoForUpdate);
      this.buildForm();   
    this.getListAndOptionValues();//method to get list val from service class
    this.title = this.complaintRefNoForUpdate ?
      'View Site Visit Report'
      : 'Site Visit Report';//set the title according to the complaintRefNoForModify
    //method to get preli view det for view
    this.preliReportViewByComplaintRefNo(this.complaintRefNoForUpdate);

  }//end of onInit

  //method to get list & option values from service class
  private getListAndOptionValues() {
    //taking an array for forkjoin service call method
    let preliInvestData: any[] = [];
    preliInvestData.push(this.investigationReportDIDataService.getSocketVal());
    preliInvestData.push(this.investigationReportDIDataService.getSpigotVal());
    preliInvestData.push(this.investigationReportDIDataService.getStencilVal());
    preliInvestData.push(this.investigationReportDIDataService.getSurfaceOuterVal());
    preliInvestData.push(this.investigationReportDIDataService.getCoatingBitVal());
    preliInvestData.push(this.investigationReportDIDataService.getFittingsJointingVal());
    preliInvestData.push(this.investigationReportDIDataService.getInnerCMLVal());
    preliInvestData.push(this.investigationReportDIDataService.getLoadingRelatedVal());
    preliInvestData.push(this.investigationReportDIDataService.getLubricationVal());
    preliInvestData.push(this.investigationReportDIDataService.getPipeLayingVal());
    preliInvestData.push(this.investigationReportDIDataService.getDiaVal());
    preliInvestData.push(this.investigationReportDIDataService.getClassificationVal());
    preliInvestData.push(this.investigationReportDIDataService.getAreaSalesManagerDetailsVal(this.localStorageService.appSettings.areaSalesOrZonalManagerDesignationId));
    if(this.complaintRefNoForUpdate){
      
    }else{
      preliInvestData.push(this.investigationReportDIDataService.getCompRefNoValForPreliInvestigationReport());
    }

    Observable.forkJoin(preliInvestData).
      subscribe(res => {
        console.log("res array: ", res);
        this.socketVal = res[0];
        this.spigotVal = res[1];
        this.stencilVal = res[2];
        this.surfaceOuterVal = res[3];
        this.coatingBitVal = res[4];
        this.fittingsJointingVal = res[5];
        this.innerCMLVal = res[6];
        this.loadingRelatedVal = res[7];
        this.lubricationVal = res[8];
        this.pipeLayingVal = res[9];
        this.diaVal = res[10];
        this.classificationVal = res[11];
        this.areaSalesManagerDetails = res[12];
        if(this.complaintRefNoForUpdate){

        }else{
          this.complaintRefNoVal = res[13];
          //checking ref no are available or not
          if(this.complaintRefNoVal.length == 1){
            this. resMsgType = this.errorConst;
            this.resErrorMsg = "No complaint reference no found for Site Visit report ! ";
          }//end of if
        }//end of else

        this.busySpinner.allPreliBusy = false;
        this.updateBusySpinner();
      },
      err => {
        console.log(err);
        this.busySpinner.allPreliBusy = false;
        this.updateBusySpinner();
        this.sessionErrorService.routeToLogin(err._body);
      });
  }//end of method getListValues & options val

  

  //to load the spinner
  private updateBusySpinner() {
    if (this.busySpinner.allPreliBusy || this.busySpinner.editPreliBusy || this.busySpinner.submitBusy) {
      this.busySpinner.busy = true;
    } else if(this.busySpinner.allPreliBusy == false  && this.busySpinner.editPreliBusy == false && this.busySpinner.submitBusy == false){
      this.busySpinner.busy = false;
    }//end of else if
  }//end of busy spinner method

  private buildForm(): void {
    this.preliInvestFormGroup = this.formBuilder.group({
      'complaintRefNo': [''
      ],
      'complaintRefNoForModify': [''
      ],
      'siteVisitDate': [''
      ],
      'preliDate': [''
      ],
      'concernedPersonName': [''
      ],
      'concernedPersonContactNo': [''
      ],
      'supplyCommencementDate': [''
      ],
       // 'totalNoOfPipes': [''
      // ],
      'totalQtyInTons': [''
      ],
      'totalQtyInMtrs': [''
      ],
      'lastDateOfSupply': [''
      ],
      'areaSalesManager': [''
      ],
      'testCertificate': [''
      ],
      'natureOfcomplaintProductRelated': [''
      ],
      'natureOfcomplaintServiceRelated': [''
      ],
      'complaintDescription': [''
      ],
      'observations': [''
      ],
      'dia': [''
      ],
      'classification': [''
      ],
      'batchNo': [''
      ],
      'marking': [''
      ],
      'inspectionMarking': [''
      ],//
      'lengthOfPipe': [''
      ],
      'noOfPieces': [''
      ],//
      'thicknessWall': [''
      ],
      'ovality': [''
      ],
      'straigtness': [''
      ],
      'pipeCuttingToolsUsed': [''
      ],
      'pipeCuttingMethodApplied': [''
      ],
      'rubberGasketMake': [''
      ],
      'rubberGasketBatchNo': [''
      ],
      'rubberGasketTestCertificate': [''
      ],
      'rubberGasketBulb': [''
      ],
      'rubberGasketHeal': [''
      ],
      'peSleeveDimensionWidth': [''
      ],
      'peSleeveDimensionThickness': [''
      ],
      'peSleeveDimensionStrength': [''
      ],
      'pipeJointing': [''
      ],//
      'pipeTestingHydrotestPressure': [''
      ],//
      'ferulConnectionMethod': [''
      ],//
      'unloadingRelatedToolsUsed': [''
      ],
      'unloadingRelatedMethodApplied': [''
      ],
      'actionTakenByASM': [''
      ],
      'presentStatus': [''
      ],
      'expectationOfCustomer': [''
      ],
      'outstandingWithCustomer': [''
      ],
      'resolutionRectificationAction': [''
      ],
      'socket': [''
      ],
      'spigot': [''
      ],
      'surfaceOuter': [''
      ],
      'coating': [''
      ],
      'innerCML': [''
      ],
      'lubricationUsed': [''
      ],
      'pipeLaying': [''
      ],
      'fittingsJointing': [''
      ],
      'loadingRelated': [''
      ],
      'stencil': [''
      ]
    });
  }//end of build form

  //method to get TotalQtyFromItems 
  private getTotalQtyFromItems(itemdetjson: any) { 
  console.log("itemdetjson in getTotalQtyFromItems:::::",itemdetjson);
  this.itemDetailsArr = itemdetjson;
  // this.complaintReferenceDetailsForModify.itemNos.items;
      console.log("this.itemDetailsArr:::::>>>>>>>",this.itemDetailsArr);
      for(let itms of this.itemDetailsArr){
        let firstCharOfItmcode: string = itms.itemCode.charAt(0).toUpperCase();
        console.log("item code first letter :::::::",firstCharOfItmcode);
        if(firstCharOfItmcode === "D"){
          console.log("itmcode === D");
          this.totalQtyInMtrs = this.totalQtyInMtrs + itms.invoiceQtyInMtrs;
          this.totalQtyInTons = this.totalQtyInTons + itms.invoiceQtyInTons;
        }
      }
  }// end of method to get TotalQtyFromItems 


  //method for list check
  public onclickSurfaceOuterCheck(key) {
    //alert("checked surface outer val :" + key);
    console.log("checked surface outer val: ", key);
    if (this.surfaceOuterCheckedDataArr.length == 0) {
      this.surfaceOuterCheckedDataArr.push(key);//pushing the key to the array
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.surfaceOuterCheckedDataArr) {
        if (data == key) {
          this.surfaceOuterCheckedDataArr.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing surfaceOuterCheckedDataArr items : ", this.surfaceOuterCheckedDataArr);
      if (!removeFlag) {
        this.surfaceOuterCheckedDataArr.push(key);
      }//end of if
      console.log("after pushing surfaceOuterCheckedDataArr items : ", this.surfaceOuterCheckedDataArr);
    }//end of else
  }//end of onclicksurfaceOuterChecke method

  //method for stencil check
  public onclickStencilCheck(val) {
    // alert("stencil checked val :" + val);
    console.log("stencil checked val: ", val);
    if (this.stencilCheckedDataArr.length == 0) {
      this.stencilCheckedDataArr.push(val);//pushing the key to the array
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.stencilCheckedDataArr) {
        if (data == val) {
          this.stencilCheckedDataArr.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing checked stencil items : ", this.stencilCheckedDataArr);
      if (!removeFlag) {
        this.stencilCheckedDataArr.push(val);
      }//end of if
      console.log("after pushing checked stencil items : ", this.stencilCheckedDataArr);
    }//end of else

  }//end of method onclickStencilCheck

  //method for socket check
  public onclickSocketCheck(val) {
    // alert("stencil checked val :" + val);
    console.log("socket checked val: ", val);
    if (this.socketCheckedDataArr.length == 0) {
      this.socketCheckedDataArr.push(val);//pushing the key to the array
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.socketCheckedDataArr) {
        if (data == val) {
          this.socketCheckedDataArr.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing checked socket items : ", this.socketCheckedDataArr);
      if (!removeFlag) {
        this.socketCheckedDataArr.push(val);
      }//end of if
      console.log("after pushing checked socket items : ", this.socketCheckedDataArr);
    }//end of else

  }//end of method onclickSocketCheck

  //method of spigot check
  public onclickSpigotCheck(val) {
    console.log("spigot checked val: ", val);
    if (this.spigotCheckedDataArr.length == 0) {
      this.spigotCheckedDataArr.push(val);//pushing the key to the array
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.spigotCheckedDataArr) {
        if (data == val) {
          this.spigotCheckedDataArr.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing checked spigot items : ", this.spigotCheckedDataArr);
      if (!removeFlag) {
        this.spigotCheckedDataArr.push(val);
      }//end of if
      console.log("after pushing checked spigot items : ", this.spigotCheckedDataArr);
    }//end of else
  }//end of method onclickSpigotCheck

  //method of Coating bit check
  public onclickCoatingBitCheck(val) {
    console.log("coating Bit checked val: ", val);
    if (this.coatingBitCheckedDataArr.length == 0) {
      this.coatingBitCheckedDataArr.push(val);//pushing the key to the array
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.coatingBitCheckedDataArr) {
        if (data == val) {
          this.coatingBitCheckedDataArr.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing checked coating bit items : ", this.coatingBitCheckedDataArr);
      if (!removeFlag) {
        this.coatingBitCheckedDataArr.push(val);
      }//end of if
      console.log("after pushing checked coating bit items : ", this.coatingBitCheckedDataArr);
    }//end of else

  }//end of method onclickCoatingBitCheck

  //method for InnerCMLK check
  public onclicInnerCMLCheck(val) {
    console.log("Inner CML checked val: ", val);
    if (this.innerCMLCheckedDataArr.length == 0) {
      this.innerCMLCheckedDataArr.push(val);//pushing the key to the array
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.innerCMLCheckedDataArr) {
        if (data == val) {
          this.innerCMLCheckedDataArr.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing checked Inner CML items : ", this.innerCMLCheckedDataArr);
      if (!removeFlag) {
        this.innerCMLCheckedDataArr.push(val);
      }//end of if
      console.log("after pushing checked inner CML items : ", this.innerCMLCheckedDataArr);
    }//end of else
  }//end of method onclicInnerCMLCheck

  //method for lubrication check
  public onclicLubricationCheck(val) {
    console.log("Lubrication checked val: ", val);
    if (this.lubricationCheckedDataArr.length == 0) {
      this.lubricationCheckedDataArr.push(val);//pushing the key to the array
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.lubricationCheckedDataArr) {
        if (data == val) {
          this.lubricationCheckedDataArr.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing checked lubrication items : ", this.lubricationCheckedDataArr);
      if (!removeFlag) {
        this.lubricationCheckedDataArr.push(val);
      }//end of if
      console.log("after pushing checked lubrication items : ", this.lubricationCheckedDataArr);
    }//end of else
  }//end of method onclicLubricationCheck

  //method for Fittings Jointing check
  public onclickFittingsJointingCheck(val) {
    console.log("fittings jointing checked val: ", val);
    if (this.fittingsJointingCheckedDataArr.length == 0) {
      this.fittingsJointingCheckedDataArr.push(val);//pushing the key to the array
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.fittingsJointingCheckedDataArr) {
        if (data == val) {
          this.fittingsJointingCheckedDataArr.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing checked fittings jointing items : ", this.fittingsJointingCheckedDataArr);
      if (!removeFlag) {
        this.fittingsJointingCheckedDataArr.push(val);
      }//end of if
      console.log("after pushing checked fittings jointing items : ", this.fittingsJointingCheckedDataArr);
    }//end of else
  }//end of method onclickFittingsJointingCheck

  //method for loading related check
  public onclickLoadingRelatedCheck(val) {
    console.log("loading related checked val: ", val);
    if (this.loadingRelatedCheckedDataArr.length == 0) {
      this.loadingRelatedCheckedDataArr.push(val);//pushing the key to the array
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.loadingRelatedCheckedDataArr) {
        if (data == val) {
          this.loadingRelatedCheckedDataArr.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing checked loading related items : ", this.loadingRelatedCheckedDataArr);
      if (!removeFlag) {
        this.loadingRelatedCheckedDataArr.push(val);
      }//end of if
      console.log("after pushing checked loading related items : ", this.loadingRelatedCheckedDataArr);
    }//end of else
  }//end of method onclickLoadingRelatedCheck

  //method for pipe laying check
  public onclickPipeLayingCheck(val) {
    console.log("pipe laying checked val: ", val);
    if (this.pipeLayingCheckedDataArr.length == 0) {
      this.pipeLayingCheckedDataArr.push(val);//pushing the key to the array
    } else {
      let indexCount: number = 0;
      let removeFlag: boolean = false;
      for (let data of this.pipeLayingCheckedDataArr) {
        if (data == val) {
          this.pipeLayingCheckedDataArr.splice(indexCount, 1);
          removeFlag = true;
          break;
        }//end of if
        indexCount++;
      }//end of for
      console.log("after pushing checked pipe laying items : ", this.pipeLayingCheckedDataArr);
      if (!removeFlag) {
        this.pipeLayingCheckedDataArr.push(val);
      }//end of if
      console.log("after pushing checked pipe laying items : ", this.pipeLayingCheckedDataArr);
    }//end of else
  }//end of method onclickPipeLayingCheck

  

  //cancel method
  public onCancel(): void {
    // Not authenticated
    this.router.navigate([ROUTE_PATHS.RouteHome]);
  }//end of cancel method

  //new add for update preli report di
  preliReportViewByComplaintRefNo(compRefNoForModify: string) {
    console.log("complaint ref no for preli update: ", compRefNoForModify);
    if (compRefNoForModify == null || compRefNoForModify == undefined || compRefNoForModify == "") {

    } else {
      this.getPreliViewReportDetailsForModifyByCompRefNo(compRefNoForModify);
    }
  }//end of method preliReportViewByComplaintRefNo

  //method to get preli view report details by complaint ref no
  getPreliViewReportDetailsForModifyByCompRefNo(compRefNo: string) {
    this.busySpinner.editPreliBusy = true;
    this.investigationReportDIDataService.getPreliViewDetForUpdate(compRefNo).
      subscribe(res => {
        console.log("complaintReferenceDetailsForModify: ", res);
        this.complaintReferenceDetailsForModify = res.details[0];
        console.log("complaintReferenceDetailsForModify for view: ", this.complaintReferenceDetailsForModify);
        // console.log("complaintReferenceDetailsForModify for view: ", this.complaintReferenceDetailsForModify);
        //to check the activity id is same or not
        // if (this.complaintReferenceDetailsForModify.activityId == this.localStorageService.appSettings.complaintRegistrationActivityId) {
        this.resMsgType = res.msgType;
        this.complaintReferenceNo = this.complaintReferenceDetailsForModify.complaintRefNo;
        // for add--button disable function
        this.preliInvestFormGroup.controls["complaintRefNo"].setValue(this.complaintReferenceNo);
        //for view
        this.preliInvestFormGroup.controls["complaintRefNoForModify"].setValue(this.complaintReferenceNo);
        this.siteVisitDt = this.complaintReferenceDetailsForModify.siteVisitDt;
        this.preliInvestFormGroup.controls["siteVisitDate"].setValue(this.siteVisitDt);
        console.log("siteVisitDt: ", this.siteVisitDt);
        console.log("this.complaintReferenceDetailsForModify.siteVisitDt: ", this.complaintReferenceDetailsForModify.siteVisitDt);

        this.concernedPersonName = this.complaintReferenceDetailsForModify.contactPersonName;
        this.preliInvestFormGroup.controls["concernedPersonName"].setValue(this.concernedPersonName);
        this.concernedPersonContactNo = this.complaintReferenceDetailsForModify.contactPersonPhoneNo;
        this.preliInvestFormGroup.controls["concernedPersonContactNo"].setValue(this.concernedPersonContactNo);
       //store the value 
       let itemdetjson: any = {};//var to store itemdet from res
       itemdetjson = this.complaintReferenceDetailsForModify.itemNos.items;
       //calling the method to get total qty
       this.getTotalQtyFromItems(itemdetjson);
       
       // this.totalNoOfPipes = this.complaintReferenceDetailsForModify.totalNoOfPipes;
       // this.preliInvestFormGroup.controls["totalNoOfPipes"].setValue(this.totalNoOfPipes);
       // this.totalQtyInTons = this.complaintReferenceDetailsForModify.totalQtyInTons;
       this.preliInvestFormGroup.controls["totalQtyInTons"].setValue(this.totalQtyInTons);
       // this.totalQtyInMtrs = this.complaintReferenceDetailsForModify.totalQtyInMtrs;
       this.preliInvestFormGroup.controls["totalQtyInMtrs"].setValue(this.totalQtyInMtrs);
        this.preliDateView = this.complaintReferenceDetailsForModify.preliDate;
        this.preliInvestFormGroup.controls["preliDate"].setValue(this.preliDateView);
        this.supplyCommencementDate = this.complaintReferenceDetailsForModify.supplyCommencementDate;
        this.preliInvestFormGroup.controls["supplyCommencementDate"].setValue(this.supplyCommencementDate);
        this.lastDateOfSupply = this.complaintReferenceDetailsForModify.lastDateOfSupply;
        this.preliInvestFormGroup.controls["lastDateOfSupply"].setValue(this.lastDateOfSupply);
        // this.areaSalesManagerUpdate = this.complaintReferenceDetailsForModify.areaSalesManager;
        this.preliInvestFormGroup.controls["areaSalesManager"].setValue(this.complaintReferenceDetailsForModify.areaSalesManager);
        // this.testCertificateUpdate = this.complaintReferenceDetailsForModify.testCertificate;
        this.preliInvestFormGroup.controls["testCertificate"].setValue(this.complaintReferenceDetailsForModify.testCertificate);
        // this.natureOfComplaintProductRelatedUpdate = this.complaintReferenceDetailsForModify.natureOfComplaintProductRelated;
        this.preliInvestFormGroup.controls["natureOfcomplaintProductRelated"].setValue(this.complaintReferenceDetailsForModify.natureOfComplaintProductRelated);
        // this.natureOfComplaintServiceRelatedUpdate = this.complaintReferenceDetailsForModify.natureOfComplaintServiceRelated;
        this.preliInvestFormGroup.controls["natureOfcomplaintServiceRelated"].setValue(this.complaintReferenceDetailsForModify.natureOfComplaintServiceRelated);
        // this.natureOfComplaintServiceRelatedUpdate = this.complaintReferenceDetailsForModify.natureOfComplaintServiceRelated;
        this.preliInvestFormGroup.controls["natureOfcomplaintServiceRelated"].setValue(this.complaintReferenceDetailsForModify.natureOfComplaintServiceRelated);
        this.preliInvestFormGroup.controls["complaintDescription"].setValue(this.complaintReferenceDetailsForModify.complaintDescription);
        this.preliInvestFormGroup.controls["observations"].setValue(this.complaintReferenceDetailsForModify.observations);
        this.preliInvestFormGroup.controls["dia"].setValue(this.complaintReferenceDetailsForModify.dia);
        this.preliInvestFormGroup.controls["classification"].setValue(this.complaintReferenceDetailsForModify.classification);
        this.preliInvestFormGroup.controls["batchNo"].setValue(this.complaintReferenceDetailsForModify.batchNo);
        this.preliInvestFormGroup.controls["marking"].setValue(this.complaintReferenceDetailsForModify.marking);
        this.preliInvestFormGroup.controls["inspectionMarking"].setValue(this.complaintReferenceDetailsForModify.inspectionMarking);
        this.preliInvestFormGroup.controls["lengthOfPipe"].setValue(this.complaintReferenceDetailsForModify.lengthOfPipe);
        this.preliInvestFormGroup.controls["noOfPieces"].setValue(this.complaintReferenceDetailsForModify.noOfPieces);
        this.preliInvestFormGroup.controls["thicknessWall"].setValue(this.complaintReferenceDetailsForModify.thicknessWall);
        this.preliInvestFormGroup.controls["ovality"].setValue(this.complaintReferenceDetailsForModify.ovality);
        this.preliInvestFormGroup.controls["straigtness"].setValue(this.complaintReferenceDetailsForModify.straigtness);
        this.preliInvestFormGroup.controls["pipeCuttingToolsUsed"].setValue(this.complaintReferenceDetailsForModify.pipeCuttingToolsUsed);
        this.preliInvestFormGroup.controls["pipeCuttingMethodApplied"].setValue(this.complaintReferenceDetailsForModify.pipeCuttingMethodApplied);
        this.preliInvestFormGroup.controls["rubberGasketMake"].setValue(this.complaintReferenceDetailsForModify.rubberGasketMake);
        this.preliInvestFormGroup.controls["rubberGasketBatchNo"].setValue(this.complaintReferenceDetailsForModify.rubberGasketBatchNo);
        this.preliInvestFormGroup.controls["rubberGasketTestCertificate"].setValue(this.complaintReferenceDetailsForModify.rubberGasketTestCertificate);
        this.preliInvestFormGroup.controls["rubberGasketBulb"].setValue(this.complaintReferenceDetailsForModify.rubberGasketBulb);
        this.preliInvestFormGroup.controls["rubberGasketHeal"].setValue(this.complaintReferenceDetailsForModify.rubberGasketHeal);
        //prob
        this.preliInvestFormGroup.controls["peSleeveDimensionWidth"].setValue(this.complaintReferenceDetailsForModify.peSleeveDimensionWidth);
        this.preliInvestFormGroup.controls["peSleeveDimensionThickness"].setValue(this.complaintReferenceDetailsForModify.peSleeveDimensionThickness);
        this.preliInvestFormGroup.controls["peSleeveDimensionStrength"].setValue(this.complaintReferenceDetailsForModify.peSleeveDimensionStrength);
        this.preliInvestFormGroup.controls["pipeJointing"].setValue(this.complaintReferenceDetailsForModify.pipeJointing);
        this.preliInvestFormGroup.controls["pipeTestingHydrotestPressure"].setValue(this.complaintReferenceDetailsForModify.pipeTestingHydrotestPressure);
        this.preliInvestFormGroup.controls["ferulConnectionMethod"].setValue(this.complaintReferenceDetailsForModify.ferulConnectionMethod);
        this.preliInvestFormGroup.controls["unloadingRelatedToolsUsed"].setValue(this.complaintReferenceDetailsForModify.unloadingRelatedToolsUsed);
        this.preliInvestFormGroup.controls["unloadingRelatedMethodApplied"].setValue(this.complaintReferenceDetailsForModify.unloadingRelatedMethodApplied);
        this.preliInvestFormGroup.controls["actionTakenByASM"].setValue(this.complaintReferenceDetailsForModify.actionTakenByASM);
        this.preliInvestFormGroup.controls["presentStatus"].setValue(this.complaintReferenceDetailsForModify.presentStatus);
        this.preliInvestFormGroup.controls["expectationOfCustomer"].setValue(this.complaintReferenceDetailsForModify.expectationOfCustomer);
        this.preliInvestFormGroup.controls["outstandingWithCustomer"].setValue(this.complaintReferenceDetailsForModify.outstandingWithCustomer);
        this.preliInvestFormGroup.controls["resolutionRectificationAction"].setValue(this.complaintReferenceDetailsForModify.resolutionRectificationAction);

        console.log("this.complaintReferenceDetailsForModify.stencil: ", this.complaintReferenceDetailsForModify.stencil);

        this.complaintReferenceDetailsForModify.stencil.forEach((stencilModifyItem, stencilModifyIndex) => {
          // console.log("stencilModifyIndex : ", stencilModifyIndex);
          if (stencilModifyItem.Checked) {
            this.stencilCheckedDataArr.push(stencilModifyItem.Key);
            console.log("this.stencilCheckedDataArr view,", this.stencilCheckedDataArr);

          }//end of if 
        });//end of for stencil check

        this.complaintReferenceDetailsForModify.socket.forEach((socketModifyItem, socketModifyIndex) => {
          // console.log("socketModifyIndex : ", socketModifyIndex);
          if (socketModifyItem.Checked) {
            this.socketCheckedDataArr.push(socketModifyItem.Key);
            console.log("this.socketCheckedDataArr view,", this.socketCheckedDataArr);

          }//end of if 
        });//end of for socket check

        //------------------------------

        this.complaintReferenceDetailsForModify.coating.forEach((coatingModifyItem, coatingModifyIndex) => {
          console.log("coatingModifyIndex : ", coatingModifyIndex);
          if (coatingModifyItem.Checked) {
            this.coatingBitCheckedDataArr.push(coatingModifyItem.Key);
            console.log("this.coatingBitCheckedDataArr view,", this.coatingBitCheckedDataArr);

          }//end of if 
        });//end of for coatingBit check
        this.complaintReferenceDetailsForModify.fittingsJointing.forEach((fittingsJointingModifyItem, fittingsJointingModifyIndex) => {
          console.log("fittingsJointingModifyIndex : ", fittingsJointingModifyIndex);
          if (fittingsJointingModifyItem.Checked) {
            this.fittingsJointingCheckedDataArr.push(fittingsJointingModifyItem.Key);
            console.log("this.fittingsJointingCheckedDataArr view,", this.fittingsJointingCheckedDataArr);

          }//end of if 
        });//end of for fittingsJointing check

        this.complaintReferenceDetailsForModify.innerCML.forEach((innerCMLModifyItem, innerCMLModifyIndex) => {
          console.log("innerCMLModifyIndex : ", innerCMLModifyIndex);
          if (innerCMLModifyItem.Checked) {
            this.innerCMLCheckedDataArr.push(innerCMLModifyItem.Key);
            console.log("this.innerCMLCheckedDataArr view,", this.innerCMLCheckedDataArr);

          }//end of if 
        });//end of for innerCML check

        this.complaintReferenceDetailsForModify.loadingRelated.forEach((loadingRelatedModifyItem, loadingRelatedModifyIndex) => {
          // console.log("socketModifyIndex : ", loadingRelatedModifyIndex);
          if (loadingRelatedModifyItem.Checked) {
            this.loadingRelatedCheckedDataArr.push(loadingRelatedModifyItem.Key);
            console.log("this.loadingRelatedCheckedDataArr view,", this.loadingRelatedCheckedDataArr);

          }//end of if 
        });//end of for loadingRelated check

        this.complaintReferenceDetailsForModify.lubricationUsed.forEach((lubricationUsedModifyItem, lubricationUsedModifyIndex) => {
          // console.log("socketModifyIndex : ", lubricationUsedModifyIndex);
          if (lubricationUsedModifyItem.Checked) {
            this.lubricationCheckedDataArr.push(lubricationUsedModifyItem.Key);
            console.log("this.lubricationCheckedDataArr view,", this.lubricationCheckedDataArr);

          }//end of if 
        });//end of for lubricationChecked check

        this.complaintReferenceDetailsForModify.pipeLaying.forEach((pipeLayingModifyItem, pipeLayingModifyIndex) => {
          // console.log("pipeLayingModifyIndex : ", pipeLayingModifyIndex);
          if (pipeLayingModifyItem.Checked) {
            this.pipeLayingCheckedDataArr.push(pipeLayingModifyItem.Key);
            console.log("this.pipeLayingCheckedDataArr view,", this.pipeLayingCheckedDataArr);

          }//end of if 
        });//end of for pipeLaying check

        this.complaintReferenceDetailsForModify.spigot.forEach((spigotModifyItem, spigotModifyIndex) => {
          // console.log("spigotModifyIndex : ", spigotModifyIndex);
          if (spigotModifyItem.Checked) {
            this.spigotCheckedDataArr.push(spigotModifyItem.Key);
            console.log("this.spigotCheckedDataArr view,", this.spigotCheckedDataArr);

          }//end of if 
        });//end of for spigot check

        this.complaintReferenceDetailsForModify.surfaceOuter.forEach((surfaceOuterModifyItem, surfaceOuterModifyIndex) => {
          // console.log("surfaceOuterModifyIndex : ", surfaceOuterModifyIndex);
          if (surfaceOuterModifyItem.Checked) {
            this.surfaceOuterCheckedDataArr.push(surfaceOuterModifyItem.Key);
            console.log("this.surfaceOuterCheckedDataArr view,", this.surfaceOuterCheckedDataArr);

          }//end of if 
        });//end of for surfaceOuter check


        this.busySpinner.editPreliBusy = false;//to load the spinner
        this.updateBusySpinner();


        // } else {
        //   this.resMsgType = "Error";
        //   console.log("else part of activity id is not equal to complaint reg activity id");
        // }

      },
      err => {
        console.log("getComplaintReferenceDetailsView Error: ", err);
        this.resMsgType = "Error";
        console.log("resMsgType ", this.resMsgType);
        this.busySpinner.editPreliBusy = false; // to load the spinner 
        this.updateBusySpinner();
        this.sessionErrorService.routeToLogin(err._body);
      });
  }//end of method getPreliViewReportDetailsByCompRefNo


}//end of class