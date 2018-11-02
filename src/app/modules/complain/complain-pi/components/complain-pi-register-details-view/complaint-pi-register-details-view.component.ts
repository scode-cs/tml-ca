import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';//to get route param
import { DatePipe } from '@angular/common';
import { ROUTE_PATHS } from '../../../../router/router-paths';
import { ComplaintPIRegisterDataService } from "../../services/complaint-pi-register-data.service";
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { PIPolygonModel } from "../../../../shared/components/process-flow/complain-pi-polygon.model";
import { SessionErrorService } from "../../../../shared/services/session-error.service";

@Component({
    selector: 'ispl-complaint-pi-register-details-view-form',
    templateUrl: 'complaint-pi-register-details-view.component.html',
    styleUrls: ['complaint-pi-register-details-view.component.css']
})
export class ComplaintPIRegisterDetailsViewComponent implements OnInit {

    public title: string = "Complaint Register";
    public complaintRegisterFormGroup: FormGroup;
    public selectedItemDetails: any[] = [];
    //to store  selected items grid row
    public selectedItemsGrid: any[] = [];
    //to store the itemsHeader
    public itemsHeader: any = {};
    public custCode: string = "";
    public custName: string = "";
    public custSegment: string = "";
    public salesGroup: string = "";
    public salesOffice: string = "";

    //var to check index for process flow
    public processFlowPageIndex: number = 0;
    public processFlowData: string[] = [];
    //for busy spinner
    public busySpinner: boolean = false;
    public selectedComplaintReferenceDetails: any = {};//to get selected complaint values
    public errorObj: any = {
        errorMsgShowFlag: false,
        errorMsg: ''
    };

    constructor(
        private activatedroute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private complaintPIRegisterDataService: ComplaintPIRegisterDataService,
        private datePipe: DatePipe,
        private localStorageService: LocalStorageService,
        private sessionErrorService: SessionErrorService,
    ) {
    }

    ngOnInit(): void {
        let routeSubscription: Subscription;
        let complaintReferenceNo: string = '';
        routeSubscription = this.activatedroute.params.subscribe(params => {
            complaintReferenceNo = params.complaintReferenceNo ? params.complaintReferenceNo : '';
        });
        console.log("complaintReferenceNo for view Complaint pi: ", complaintReferenceNo);
        this.processFlowData = new PIPolygonModel().validRootCaus;//set the process flow step from model

        // this.toastService.toastElementRef.info('Complaint Register!', 'Info!');
        this.buildForm();
    }//end of onInit

    //a method named buildform for creating the complaintRegisterFormGroup and its formControl
    private buildForm(): void {
        this.complaintRegisterFormGroup = this.formBuilder.group({
            'complaintReferenceNo': [''],
            'modeId': [''
            ],
            'complaintReferenceDt': [''
            ],
            'modeReferenceNo': [''
            ],
            'invoiceNo': [''
            ],
            'contactPersonName': [''
            ],
            'contactPersonPhoneNo': [''
            ],
            'contactPersonEmailId': [''
            ],
            'loggedBy': [''
            ],
            'loggedOnDt': [''
            ],
            'complaintTypeId': [''
            ],
            'natureOfComplaintId': [''
            ],
            'severityIndexRating': [''
            ],
            'complaintReceivedById': [''
            ],
            'departmentNameOther': [''],
            'complaintReceivedByName': [''
            ],
            'complaintReceivedByPhoneNo': [''
            ],
            'complaintDetails': [''
            ],
            'itemNos': [''
            ],
            'repeatedComplaint': [''
            ],
            'previousComplaintReferenceNo': [''
            ],
            'requiredCommercialSettlementInComplaintRegistration': [''
            ]
        });
    }//end of method buildForm


    public getComplaintReferenceDetails(complaintReferenceNo: string, fileActivityId: number) {
        this.busySpinner = true;
        this.complaintPIRegisterDataService.getComplaintReferenceDetails(complaintReferenceNo, fileActivityId)
            .subscribe(res => {
                //getting the comp ref details from webservice
                this.selectedComplaintReferenceDetails = res.details[0];
                this.itemsHeader = res.itemsHeader;
                console.log("res for view comp: ", res);
                console.log("comprefdetobj for edit comp: ", this.selectedComplaintReferenceDetails);
                console.log("this.selectedComplaintReferenceDetails.activityId: ", this.selectedComplaintReferenceDetails.activityId);
                console.log("this.localStorageService.appSettings.complaintRegistrationActivityId :", this.localStorageService.appSettings.complaintRegistrationActivityId);
                if (this.selectedComplaintReferenceDetails.activityId == this.localStorageService.appSettings.complaintRegistrationActivityId) {
                    console.log(" ActivityId is matched");
                    let invItems: any[] = this.selectedComplaintReferenceDetails.itemNos.items;
                    if (invItems.length > 0) {
                        for (let selItm of invItems) {
                            this.custCode = selItm.customerCode;
                            this.custName = selItm.customerName;
                            this.custSegment = selItm.customerSegment;
                            this.salesGroup = selItm.salesGroup;
                            this.salesOffice = selItm.salesOffice;
                            break;
                        }//end of for           
                        for (let selItm of invItems) {
                            this.selectedItemsGrid.push(selItm);
                        }
                    }//end of if
                    // //calling  method tableGridDataConverterFromRes for creating table grid json array from res and passing the res as parameter
                    // this.tableGridDataConverterFromRes(invItems);
                    // this.complaintQtyInTonsError = false;
                    // this.invoiceSearchDetailsModel.compRefNo = complaintReferenceNo;

                    // this.complaintReceivedById = this.selectedComplaintReferenceDetails.complaintReceivedById;
                    // if (this.complaintReceivedById == "0") {
                    //     this.complaintReceivedById = "";
                    // }
                    // this.complaintRegisterFormGroup.controls["complaintReceivedById"].setValue(this.complaintReceivedById);
                    // this.complaintReceivedByName = this.selectedComplaintReferenceDetails.complaintReceivedByName;
                    // if (this.complaintReceivedByName == " ") {
                    //     this.complaintReceivedByName = "";
                    // }
                    // this.complaintRegisterFormGroup.controls["complaintReceivedByName"].setValue(this.complaintReceivedByName);
                    // this.complaintReceivedByPhoneNo = this.selectedComplaintReferenceDetails.complaintReceivedByPhoneNo;
                    // if (this.complaintReceivedByPhoneNo == " ") {
                    //     this.complaintReceivedByPhoneNo = "";
                    // }
                    // this.complaintRegisterFormGroup.controls["complaintReceivedByPhoneNo"].setValue(this.complaintReceivedByPhoneNo);
                    // this.modeId = this.selectedComplaintReferenceDetails.modeId;
                    // this.complaintRegisterFormGroup.controls["modeId"].setValue(this.modeId);

                    // this.complaintReferenceDate = this.datePipe.transform(this.selectedComplaintReferenceDetails.complaintReferenceDt, 'yyyy-MM-dd');
                    // this.complaintRegisterFormGroup.controls["complaintReferenceDt"].setValue(this.complaintReferenceDate);
                    // this.modeReferenceNoForModify = this.selectedComplaintReferenceDetails.modeReferenceNo;
                    // if (this.modeReferenceNoForModify == " ") {
                    //     this.modeReferenceNoForModify = "";
                    // }
                    // this.complaintRegisterFormGroup.controls["modeReferenceNo"].setValue(this.modeReferenceNoForModify);
                    // // this.invoiceDateForModify = this.datePipe.transform(this.selectedComplaintReferenceDetails.invoiceDt, 'dd-MM-yyyy');
                    // this.contactPersonNameForModify = this.selectedComplaintReferenceDetails.contactPersonName;
                    // if (this.contactPersonNameForModify == " ") {
                    //     this.contactPersonNameForModify = "";
                    // }
                    // this.complaintRegisterFormGroup.controls["contactPersonName"].setValue(this.contactPersonNameForModify);
                    // this.contactPersonPhoneNoForModify = this.selectedComplaintReferenceDetails.contactPersonPhoneNo;
                    // if (this.contactPersonPhoneNoForModify == " ") {
                    //     this.contactPersonPhoneNoForModify = "";
                    // }
                    // this.complaintRegisterFormGroup.controls["contactPersonPhoneNo"].setValue(this.contactPersonPhoneNoForModify);
                    // this.contactPersonEmailIdForModify = this.selectedComplaintReferenceDetails.contactPersonEmailId;
                    // if (this.contactPersonEmailIdForModify == " ") {
                    //     this.contactPersonEmailIdForModify = "";
                    // }
                    // this.complaintRegisterFormGroup.controls["contactPersonEmailId"].setValue(this.contactPersonEmailIdForModify);
                    // this.complaintTypeIdForModify = this.selectedComplaintReferenceDetails.complaintTypeId;
                    // this.complaintRegisterFormGroup.controls["complaintTypeId"].setValue(this.complaintTypeIdForModify);
                    // this.natureOfComplaintIdForModify = this.selectedComplaintReferenceDetails.natureOfComplaintId;
                    // this.onComplaintTypeSelect(this.complaintTypeIdForModify, this.natureOfComplaintIdForModify);
                    // this.severityIndexRatingForModify = this.selectedComplaintReferenceDetails.severityIndexRating;
                    // if (this.severityIndexRatingForModify == " ") {
                    //     this.severityIndexRatingForModify = "";
                    // }
                    // this.complaintRegisterFormGroup.controls["severityIndexRating"].setValue(this.severityIndexRatingForModify);
                    // this.complaintDetailsForModify = this.selectedComplaintReferenceDetails.complaintDetails;
                    // if (this.complaintDetailsForModify == " ") {
                    //     this.complaintDetailsForModify = "";
                    // }
                    // this.complaintRegisterFormGroup.controls["complaintDetails"].setValue(this.complaintDetailsForModify);
                    // this.loggedByForModify = this.selectedComplaintReferenceDetails.loggedBy;
                    // this.complaintRegisterFormGroup.controls["loggedBy"].setValue(this.loggedByForModify);
                    // this.loggedOnDtForModify = this.datePipe.transform(this.selectedComplaintReferenceDetails.loggedOnDt, 'yyyy-MM-dd');
                    // this.complaintRegisterFormGroup.controls["loggedOnDt"].setValue(this.loggedOnDtForModify);
                    // this.repeatedComplaintValue = this.selectedComplaintReferenceDetails.repeatedComplaint;
                    // this.complaintRegisterFormGroup.controls["repeatedComplaint"].setValue(this.repeatedComplaintValue);
                    // this.previousComplaintReferenceNoForModify = this.selectedComplaintReferenceDetails.previousComplaintReferenceNo;
                    // if (this.previousComplaintReferenceNoForModify == " ") {
                    //     this.previousComplaintReferenceNoForModify = "";
                    // }
                    // this.complaintRegisterFormGroup.controls["previousComplaintReferenceNo"].setValue(this.previousComplaintReferenceNoForModify);

                    // this.requiredCommercialSettlementInComplaintRegistrationForModify = this.selectedComplaintReferenceDetails.requiredCommercialSettlementInComplaintRegistration.charAt(0);
                    // console.log(" requiredCommercialSettlementInComplaintRegistrationForModify===>", this.requiredCommercialSettlementInComplaintRegistrationForModify)
                    // this.complaintRegisterFormGroup.controls["requiredCommercialSettlementInComplaintRegistration"].setValue(this.requiredCommercialSettlementInComplaintRegistrationForModify);

                } else {
                    console.log(" ActivityId isn't matched");
                    this.errorObj.errorMsgShowFlag = true;
                    this.errorObj.errorMsg = res.msg;
                }
            },
                err => {
                    console.log(err);
                    this.busySpinner = false;
                    this.sessionErrorService.routeToLogin(err._body);
                });
    }
    //for clicking cancel button this method will be invoked
    public onCancel(): void {
        this.router.navigate([ROUTE_PATHS.RouteComplainPIView]);
    }// end of onCancel method

}//end of class