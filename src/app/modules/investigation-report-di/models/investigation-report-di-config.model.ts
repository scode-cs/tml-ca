export class InvestigationReportDIConfigModel {
    private _prevInvReportHeader: any[] = [
        { headerKey: 'complaintReferenceNo', headerDesc: 'Complaint Ref. No', headerClass: 'header-style-first', dataClass: 'td-style-first' },
        { headerKey: 'investigationReportDate', headerDesc: 'Investigation Report Date', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'customerName', headerDesc: 'Customer Name', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'siteVisitMade', headerDesc: 'Site Visit Made', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'sampleCollected', headerDesc: 'Sample Collected', headerClass: 'header-style-last', dataClass: 'td-style-last' }
    ]

    private _invItemGridHeader: any[] = [
        { headerKey: 'complaintReferenceNo', headerDesc: 'Complaint Ref. No', headerClass: 'header-style-first visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'complaintDetailsAutoId', headerDesc: 'Complaint Ref. Auto Id', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'invoiceNo', headerDesc: 'Official Document No', headerClass: 'header-style visible-style', dataClass: 'td-style-first visible-style' },
        { headerKey: 'invoiceDt', headerDesc: 'Official Document Date', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'itemCode', headerDesc: 'Item Code', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'itemDesc', headerDesc: 'Item Description', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'invoiceQtyInMtrs', headerDesc: 'Invoice Qty(in Mtrs)', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'complainQtyInMtrs', headerDesc: 'Complain Qty(in Mtrs)', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'customerName', headerDesc: 'Customer Name', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'customerCode', headerDesc: 'Customer Code', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'projectName', headerDesc: 'Project Name', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'projectLocation', headerDesc: 'Project Location', headerClass: 'header-style-last visible-style', dataClass: 'td-style-last visible-style' }
    ]

    get prevInvReportHeader(): any[] {
        return this._prevInvReportHeader;
    }
    set prevInvReportHeader(prevInvReportHeader: any[]) {
        this._prevInvReportHeader = prevInvReportHeader;
    }

    get invItemGridHeader(): any[] {
        return this._invItemGridHeader;
    }
    set invItemGridHeader(invItemGridHeader: any[]) {
        this._invItemGridHeader = invItemGridHeader;
    }

}