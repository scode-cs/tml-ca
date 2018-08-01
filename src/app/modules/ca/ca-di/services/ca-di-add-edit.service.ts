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
export class CADIService {

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


    
    
    
    
        //method to ca det submit in detail table
        rcaDIAddEditSubmitWithFileUpload(caData: any) {        
            this.actionUrl = AppUrlsConst.COMPLAIN_DETAIL_TABLE_ADD_URL;        
            return this.http.post(this.actionUrl, caData)
            .map(this.successCallback)
            .catch(this.errorCallBack);
        }//end of method 

        private successCallback(res: Response) {
            return res.json();
        }
    
        private errorCallBack(error: Response) {
            console.error(error);
            return Observable.throw(error);
        }
    }//end of class

