export class InvestigationDataModel {
    private _unloadingEquipmentList: any[] = [
        { id: '2', desc: 'Forklift', checked: false, arrName:'unloadingEquipmentList' },
        { id: '3', desc: 'Crane With Sling', checked: false, arrName:'unloadingEquipmentList' },
        { id: '4', desc: 'Crane With Pipe Tongs', checked: false, arrName:'unloadingEquipmentList' },
        { id: '5', desc: 'Crane With Hooks', checked: false, arrName:'unloadingEquipmentList' },
        { id: '6', desc: 'Others', checked: false, arrName:'unloadingEquipmentList' }
    ];
    private _lubricantUsedList: any[]= [
        { id: '8', desc: 'Vegetable Oil', checked: false, arrName:'lubricantUsedList' },
        { id: '9', desc: 'Grease', checked: false, arrName:'lubricantUsedList' },
        { id: '10', desc: 'Soap Water', checked: false, arrName:'lubricantUsedList' },
        { id: '11', desc: 'Any Other Materia', checked: false, arrName:'lubricantUsedList' }
    ];
    private _layingPositionList: any[]= [
        { id: '13', desc: 'Overhead / At a height', checked: false, arrName:'layingPositionList' },
        { id: '14', desc: 'On Ground Level', checked: false, arrName:'layingPositionList' },
        { id: '15', desc: 'Below Ground(Backfilled)', checked: false, arrName:'layingPositionList' }
    ];
    private _jointingTypeList: any[]= [
        { id: '17', desc: 'Push on Joints', checked: false, arrName:'jointingTypeList' },
        { id: '18', desc: 'Mechanical Joint', checked: false, arrName:'jointingTypeList' },
        { id: '19', desc: 'Restrained Joint', checked: false, arrName:'jointingTypeList' },
        { id: '20', desc: 'Flanged Joint', checked: false, arrName:'jointingTypeList' },
        { id: '21', desc: 'Others', checked: false, arrName:'jointingTypeList' }
    ];

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