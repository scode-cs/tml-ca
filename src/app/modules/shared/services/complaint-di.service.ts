import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//import { AppUrlsConst, WebServiceConst };
//import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { AppUrlsConst, WebServiceConst } from '../../app-config';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ComplaintDIService {

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService) {

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
 * @param complainHeader set data to post header
 */
  public postHeader(complainHeader: any) {
    let headers: Headers = this.configService();
    let actionUrl = AppUrlsConst.CMP_REG_RCPT_MODE_SELECT_VAL;

    return this.http.post(actionUrl, complainHeader, { headers: headers })
        .map((res: Response) => { return res.json() })
        .catch((error: Response) => { return Observable.throw(error) });
  }
/**
 * 
 * @param complainHeader set data to update
 */
  public putHeader(complainHeader:any) {
    let headers: Headers = this.configService();
    let actionUrl = AppUrlsConst.CMP_REG_RCPT_MODE_SELECT_VAL;

    return this.http.put(actionUrl, complainHeader, { headers: headers })
        .map((res: Response) => { return res.json() })
        .catch((error: Response) => { return Observable.throw(error) });
  }
/**
 * 
 * @param complainDetail set post data
 */
  public postDetail(complainDetail: any) {
    let headers: Headers = this.configService();
    let actionUrl = AppUrlsConst.CMP_REG_RCPT_MODE_SELECT_VAL;

    return this.http.post(actionUrl, complainDetail, { headers: headers })
        .map((res: Response) => { return res.json() })
        .catch((error: Response) => { return Observable.throw(error) });
  }


}