export class InvestigationReportDIConfigModel {
    private _prevInvReportHeader: any[] = [
        { headerKey: 'complaintReferenceNo', headerDesc: 'Complaint Ref. No', headerClass: 'header-style-first', dataClass: 'td-style-first' },
        { headerKey: 'complaintReferenceDt', headerDesc: 'Complaint Ref. Date', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'siteVisitDt', headerDesc: 'Site Visit Date', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'customerName', headerDesc: 'Customer Name', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'projectName', headerDesc: 'Project Name', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'projectLocation', headerDesc: 'Project Location', headerClass: 'header-style-last', dataClass: 'td-style-last' }
    ]

    get prevInvReportHeader(): any[] {
        return this._prevInvReportHeader;
    }
    set prevInvReportHeader(prevInvReportHeader: any[]) {
        this._prevInvReportHeader = prevInvReportHeader;
    }

}