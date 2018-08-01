export class InvestigationDataModel {
    private _unloadingEquipmentList: any[
        { id: '1', desc: 'sunanda' }
    ];
    private _lubricantUsedList: any[];
    private _layingPositionList: any[];
    private _jointingTypeList: any[];

    get unloadingEquipmentList(): any[] {
        return this._unloadingEquipmentList;
    }
    get lubricantUsedList(): any[] {
        return this._lubricantUsedList;
    }
    get layingPositionList(): any[] {
        return this._layingPositionList;
    }
    get jointingTypeList(): any[] {
        return this._jointingTypeList;
    }

}