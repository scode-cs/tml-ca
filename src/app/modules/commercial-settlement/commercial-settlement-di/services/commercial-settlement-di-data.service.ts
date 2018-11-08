import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppUrlsConst, WebServiceConst } from '../../../app-config';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Injectable()
export class CommercialSettlementDIDataService {
    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ) {
    }

    private configService(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('accessToken', 'bearer ' + this.localStorageService.user.accessToken);
        headers.append('userId', this.localStorageService.user.userId);
        headers.append('menuId', 'DEFAULT1');

        return headers;
    }

    /**
* 
* @param complainHeader set data to update
*/
    public putHeader(complainHeader: any, plantType: string) {
        let headers: Headers = this.configService();
        let actionUrl = AppUrlsConst.COMMERCIAL_SETTLEMENT_HEADER_TABLE_ADD_URL
            + "?plantType=" + plantType;

        return this.http.put(actionUrl, complainHeader, { headers: headers })
            .map((res: Response) => { return res.json() })
            .catch((error: Response) => { return Observable.throw(error) });
    }//end of method

    /**
   * 
   * @param complainDetail set post data
   */
    public postDetail(complainDetail: any, plantType: string) {
        let headers: Headers = this.configService();
        let actionUrl = AppUrlsConst.COMMERCIAL_SETTLEMENT_DETAIL_TABLE_ADD_URL
            + "?plantType=" + plantType;

        return this.http.post(actionUrl, complainDetail, { headers: headers })
            .map((res: Response) => { return res.json() })
            .catch((error: Response) => { return Observable.throw(error) });
    }//end of method
}