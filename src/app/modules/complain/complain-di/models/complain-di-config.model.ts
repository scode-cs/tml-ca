export class ComplaintDIConfigModel {
    private _prevInvReportHeader: any[] = [
        { headerKey: 'modeId', headerDesc: 'Mode of Complaint', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'complaintReferenceDt', headerDesc: 'Complaint Ref. Date', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'complaintTypeDesc', headerDesc: 'Complaint Type', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'natureOfComplaintDesc', headerDesc: 'Nature of Complaint', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'loggedByName', headerDesc: 'Complaint Logged By', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'siteVisit', headerDesc: 'Site Visit Required ', headerClass: 'header-style-last', dataClass: 'td-style-last' }
    ]

    get prevInvReportHeader(): any[] {
        return this._prevInvReportHeader;
    }
    set prevInvReportHeader(prevInvReportHeader: any[]) {
        this._prevInvReportHeader = prevInvReportHeader;
    }
}