export class InvestigationReportDIConfigModel {
    private _prevInvReportHeader: any[] = [
        { headerKey: '', headerDesc: 'Complaint Ref. No', headerClass: 'header-style-first', dataClass: 'td-style-first' },
        { headerKey: '', headerDesc: 'Complaint Ref. Date', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: '', headerDesc: 'Site Visit Date', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: '', headerDesc: 'Customer Name', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: '', headerDesc: 'Project Name', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: '', headerDesc: 'Project Location', headerClass: 'header-style-last', dataClass: 'td-style-last' }
    ]

    get prevInvReportHeader(): any[] {
        return this._prevInvReportHeader;
    }
    set prevInvReportHeader(prevInvReportHeader: any[]) {
        this._prevInvReportHeader = prevInvReportHeader;
    }

}