import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppUrlsConst, WebServiceConst } from '../../../app-config';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ActivityTrackingDIParamModel } from '../models/activity-tracking-di-param.model';

@Injectable()
export class ActivityTrackingDIService {

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService) {

  }

  private configService(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('accessToken', 'bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNkYXRhIjp7Im1zZ1R5cGUiOm51bGwsIm1zZyI6bnVsbCwiaXNzIjoiSVNQTCIsInN1YiI6IkN1c3RvbWVyIENvbXBsYWludCBNYW5hZ2VtZW50IFBvcnRhbCIsImF1ZCI6IjQ1LjExNC4xNDIuMTI1OjkxIiwiaWF0IjoiMjcwOTIwMTgxNjQ0NTkiLCJuYW1lIjoiZGVtb2RpIn19.FqutkzUydnWfd06llu6R3N-J2MGc05lmatsvOgrBUwI');//+ this.localStorageService.user.accessToken);
    headers.append('userId', 'demodi');//this.localStorageService.user.userId);
    headers.append('menuId', 'DEFAULT1');
    
    return headers;
  }

  /**
   * 
   * @param activityTrackingDIParam 
   */
  public getComStatusDet(){//activityTrackingDIParam: ActivityTrackingDIParamModel){
    let headers: Headers = this.configService();
    let actionUrl = AppUrlsConst.VIEW_COMP_STATUS_WITH_COM_SET_URL + '?plantType=DI&pageNo=0&perPage=0'; //+ this.localStorageService.user.plantType;

    return this.http.get((actionUrl), { headers: headers })
    .map((res: Response) => { return res.json() })
    .catch((error: Response) => { return Observable.throw(error) });
  }


}