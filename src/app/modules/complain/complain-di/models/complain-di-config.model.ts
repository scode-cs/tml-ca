export class ComplaintDIConfigModel {
    private _prevInvReportHeader: any[] = [
        { headerKey: '', headerDesc: 'Mode of Complaint', headerClass: 'header-style-first', dataClass: 'td-style-first' },
        { headerKey: '', headerDesc: 'Complaint Ref. Date', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: '', headerDesc: 'Complaint Type', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: '', headerDesc: 'Nature of Complaint', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: '', headerDesc: 'Complaint Logged By', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: '', headerDesc: 'Site Visit Required ', headerClass: 'header-style-last', dataClass: 'td-style-last' }
    ]

    get prevInvReportHeader(): any[] {
        return this._prevInvReportHeader;
    }
    set prevInvReportHeader(prevInvReportHeader: any[]) {
        this._prevInvReportHeader = prevInvReportHeader;
    }
}