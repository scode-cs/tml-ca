export class CompStatusStructureModel {
    private _compStatusStructureModel: any[] = [
        {status: 10, shortName: 'REG', messege: '2 Days', date: '12-Sep-18'},
        {status: 40, shortName: 'INV', messege: '2 Days', date: '12-Sep-18'},
        {status: 50, shortName: 'RCA', messege: '1 Days', date: '12-Sep-18'},
        {status: 60, shortName: 'CA', messege: 'Pending 1 day', date: '12-Sep-18'},
        {status: 70, shortName: 'PA', messege: 'Pending 1 day', date: '12-Sep-18'},
        {status: 80, shortName: 'CLOSE', messege: 'Pending 1 day', date: '12-Sep-18'}
    ];

    
    get compStatusStructureModel(): any[]{
        return this._compStatusStructureModel;
    }
    
    set compStatusStructureModel(compStatusStructureModel: any[]){
        this._compStatusStructureModel = compStatusStructureModel;
    }
}