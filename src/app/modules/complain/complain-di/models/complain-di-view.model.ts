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

    public get pageConfig() {
        return this._pageConfig;
    }
}