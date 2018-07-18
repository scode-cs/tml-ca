export class DIPolygonModel {

    private _requiredSiteVisit: string[] = [ 
     'Registration',
     'Investigation Report',
     'RCA',
     'CA',
     'PA' ,
     'Close'
    ]

    private _notRequiredSiteVisit: string[] = [ 
        'Registration',
        'Complaint Resolution',
        'CAPA' ,
        'Close'
       ]

    public get siteVisitRequired(): string[]{
        return this._requiredSiteVisit;
    }

    public get siteVisitNotRequired(): string[] {
        return this._notRequiredSiteVisit;
    }
}