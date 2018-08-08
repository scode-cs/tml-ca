export class ComplaintDIConfigModel {
    private _prevComplainHeader: any[] = [
        { headerKey: 'modeId', headerDesc: 'Mode of Complaint', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'complaintReferenceDt', headerDesc: 'Complaint Ref. Date', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'complaintTypeDesc', headerDesc: 'Complaint Type', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'natureOfComplaintDesc', headerDesc: 'Nature of Complaint', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'loggedByName', headerDesc: 'Complaint Logged By', headerClass: 'header-style', dataClass: 'td-style' },
        { headerKey: 'siteVisit', headerDesc: 'Site Visit Required ', headerClass: 'header-style-last', dataClass: 'td-style-last' }
    ]

    get prevComplainHeader(): any[] {
        return this._prevComplainHeader;
    }
    set prevComplainHeader(prevComplainHeader: any[]) {
        this._prevComplainHeader = prevComplainHeader;
    }

    private _invItemGridHeader: any[] = [
        { headerKey: 'complaintReferenceNo', headerDesc: 'Complaint Ref. No', headerClass: 'header-style-first visible-style', dataClass: 'td-style-first visible-style' },
        { headerKey: 'complaintDetailAutoId', headerDesc: 'Complaint Ref. Auto Id', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'invoiceNo', headerDesc: 'Official Document No', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'invoiceDate', headerDesc: 'Official Document Date', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'itemNo', headerDesc: 'Item Code', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'itemName', headerDesc: 'Item Description', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'invoiceQtyInMtrs', headerDesc: 'Invoice Qty(in Mtrs)', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'complaintQtyInMtrs', headerDesc: 'Complain Qty(in Mtrs)', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style', inputType:' <input type="text"></input>' },
        { headerKey: 'customerName', headerDesc: 'Customer Name', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'customerCode', headerDesc: 'Customer Code', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'projectName', headerDesc: 'Project Name', headerClass: 'header-style visible-style', dataClass: 'td-style visible-style' },
        { headerKey: 'projectLocation', headerDesc: 'Project Location', headerClass: 'header-style-last visible-style', dataClass: 'td-style-last visible-style' }
    ]

    get invItemGridHeader(): any[] {
        return this._invItemGridHeader;
    }
    set invItemGridHeader(invItemGridHeader: any[]) {
        this._invItemGridHeader = invItemGridHeader;
    }
}