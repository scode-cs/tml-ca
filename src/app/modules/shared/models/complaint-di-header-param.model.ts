export class ComplaintDIHeaderParamModel {
    private _fields: string;
    private _filter: string;
    private _sortData: string;
    private _orderBy: string;

    public get fields(): string {
        return this._fields;
    }
    public set fields(fields: string) {
        this._fields = fields;
    }

    public get filter(): string {
        return this._filter;
    }
    public set filter(filter: string) {
        this._filter = filter;
    }

    public get sortData(): string {
        return this._sortData;
    }
    public set sortData(sortData: string) {
        this._sortData = sortData;
    }
    
    public get orderBy(): string {
        return this._orderBy;
    }
    public set orderBy(orderBy: string) {
        this._orderBy = orderBy;
    }
}