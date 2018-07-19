import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppUrlsConst, WebServiceConst } from '../../../app-config';
import { LocalStorageService } from "../../../shared/services/local-storage.service";

@Injectable()
export class PADIService {

    private actionUrl: string;
    private headers: Headers;

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService) {

    }
    private configService(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json'),
            headers.append('accept', 'application/json'),
            headers.append('accessToken', 'bearer ' + this.localStorageService.user.accessToken),
            headers.append('userId', this.localStorageService.user.userId),
            headers.append('menuId', 'DEFAULT1')
        return headers;
    }


    
    
    //method to get complain reference details view
    getComplaintReferenceDetailsView(complaintReferenceNo: string, fileActivityId: number) {
        let fileActivityIdStr: string = fileActivityId.toString();
        // complaintReferenceNo = "DIKG1718H290001";
        this.actionUrl = AppUrlsConst.DI_COMPLAINT_REFERENCE_DETAILS_VIEW_WITHOUT_HEADER_URL + "/" + complaintReferenceNo + "/" + fileActivityIdStr;
        this.headers = this.configService();
        
        return this.http.get(this.actionUrl, { headers: this.headers })
        .map((res: Response) => { return res.json() })
            .catch((error: Response) => { return Observable.throw(error) });
        }//end of get getComplaintReferenceDetailsView
        
    
        //method to capasubmit with file upload
        rcaDIAddEditSubmitWithFileUpload(rcaFormData: any) {        
            this.actionUrl = AppUrlsConst.RCA_ADD_EDIT_URL;        
            return this.http.patch(this.actionUrl, rcaFormData)
            .map(this.successCallback)
            .catch(this.errorCallBack);
        }//end of method capasubmit with file upload

        private successCallback(res: Response) {
            return res.json();
        }
    
        private errorCallBack(error: Response) {
            console.error(error);
            return Observable.throw(error);
        }
    }//end of class

