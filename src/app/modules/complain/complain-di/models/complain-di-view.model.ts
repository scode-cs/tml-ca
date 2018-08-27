export class ComplainDIViewModel {

    private _pageConfig: any = {
        gridColumns: [
            'complaintRefNo',
            'complaintRefDate',
            'customerName',
            'complaintTypeDescription',
            'natureOfComplaintDescription',
            'status'
        ],
        searchColumns: [
            'complaintRefNo',
            'complaintRefDate',
            'customerName',
            'complaintTypeDescription',
            'natureOfComplaintDescription',
            'status'
        ]
    }

    private _compHeaderTableFieldNames: any = {
        complaintNumber: 'CMPLNT_REF_NO',
        customerName: 'CUSTOMER_NAME',
        complaintType: 'CMPLNT_TYPE_DESC',
        natureOfComplaint: 'NAT_CMPLNT_DESC',
        complaintStatus: 'ACTIVITY_DESC'
    }

    public get compHeaderTableFieldNames() {
        return this._compHeaderTableFieldNames;
    }

    public get pageConfig() {
        return this._pageConfig;
    }
}