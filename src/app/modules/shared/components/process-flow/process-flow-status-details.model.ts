import { ROUTE_PATHS } from '../../../router/router-paths';
export class ProcessFlowStatusDetailsModel {
   
    private _statusDetails: any[] = [
        {statusId: 10, statusName: 'Registration', viewRoute: '#'+ROUTE_PATHS.RouteComplainDIView, editRoute: '#'+ROUTE_PATHS.RouteModifyComplaint},
        {statusId: 40, statusName: 'Investigation Report', viewRoute: '#'+ROUTE_PATHS.RouteComplainDIView, editRoute: '#'+ROUTE_PATHS.RouteModifyComplaint},
        {statusId: 50, statusName: 'RCA',viewRoute: '#'+ROUTE_PATHS.RouteComplainDIView, editRoute: '#'+ROUTE_PATHS.RouteModifyComplaint},
        {statusId: 60, statusName: 'CA', viewRoute: '#'+ROUTE_PATHS.RouteComplainDIView, editRoute: '#'+ROUTE_PATHS.RouteModifyComplaint},
        {statusId: 70, statusName: 'PA', viewRoute: '#'+ROUTE_PATHS.RouteComplainDIView, editRoute: '#'+ROUTE_PATHS.RouteModifyComplaint},
        {statusId: 80, statusName: 'Closed', viewRoute: '#'+ROUTE_PATHS.RouteComplainDIView, editRoute: '#'+ROUTE_PATHS.RouteModifyComplaint}
    ]

    public get statusDetails(): any[]{
        return this._statusDetails;
    }

    public set statusDetails(statusDetails: any[]) {
        this._statusDetails = statusDetails;
      }
}