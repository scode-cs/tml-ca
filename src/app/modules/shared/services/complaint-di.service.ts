import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//import { AppUrlsConst, WebServiceConst };
//import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { AppUrlsConst, WebServiceConst } from '../../app-config';
import { LocalStorageService } from './local-storage.service';
import { ComplaintDIHeaderParamModel } from '../models/complaint-di-header-param.model';

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
    let actionUrl = AppUrlsConst.COMPLAIN_HEADER_TABLE_ADD_URL;

    return this.http.post(actionUrl, complainHeader, { headers: headers })
        .map((res: Response) => { return res.json() })
        .catch((error: Response) => { return Observable.throw(error) });
  }
  /**
   * 
   * @param complainHeader 
   */
  public getHeader(complainHeaderParam: ComplaintDIHeaderParamModel){
    let headers: Headers = this.configService();
    let actionUrl = AppUrlsConst.COMPLAIN_VIEW_HEADER_URL;


    let param: string = '';
    param += complainHeaderParam && complainHeaderParam.fields ? "fields="+complainHeaderParam.fields+"&" : "fields=&";
    param += complainHeaderParam && complainHeaderParam.filter ? "filter="+complainHeaderParam.filter+"&" : "filter=&";
    param += complainHeaderParam && complainHeaderParam.sortData ? "sortData="+complainHeaderParam.sortData+"&" : "sortData=&";
    param += complainHeaderParam && complainHeaderParam.orderBy ? "orderBy="+complainHeaderParam.orderBy+"" : "orderBy=";
    
    

    console.log(param);

    return this.http.get((actionUrl+'?'+param), { headers: headers })
    .map((res: Response) => { return res.json() })
    .catch((error: Response) => { return Observable.throw(error) });

  }
/**
 * 
 * @param complainHeader set data to update
 */
  public putHeader(complainHeader:any, plantType: string, action: string) {
    let headers: Headers = this.configService();
    let actionUrl = AppUrlsConst.COMPLAIN_HEADER_TABLE_ADD_URL
    +"?plantType="+plantType+"&action="+action;

    return this.http.put(actionUrl, complainHeader, { headers: headers })
        .map((res: Response) => { return res.json() })
        .catch((error: Response) => { return Observable.throw(error) });
  }
/**
 * 
 * @param complainDetail set post data
 */
  public postDetail(complainDetail: any, plantType: string, action: string) {
    let headers: Headers = this.configService();
    let actionUrl = AppUrlsConst.COMPLAIN_DETAIL_TABLE_ADD_URL
    +"?plantType="+plantType+"&action="+action;

    return this.http.post(actionUrl, complainDetail, { headers: headers })
        .map((res: Response) => { return res.json() })
        .catch((error: Response) => { return Observable.throw(error) });
  }

  /**
   * 
   * @param activityIdFieldName 
   */
  public getInvoiceItemDetail(compRefNo: string, activityIdFieldName: number){
    let headers: Headers = this.configService();
    let actionUrl = AppUrlsConst.COMPLAIN_INVOICE_ITEM_DETAIL_VIEW_URL;
    let param = "filter="+this.localStorageService.appSettings.complaintReferenceNoFieldName+"='"+compRefNo+"'&"+this.localStorageService.appSettings.activityIdFieldName+"="+activityIdFieldName+"&sortData=&orderBy=";

    return this.http.get((actionUrl+'?'+param), { headers: headers })
    .map((res: Response) => { return res.json() })
    .catch((error: Response) => { return Observable.throw(error) });

  }

  

}