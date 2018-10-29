export class ActiivityTrackingModel {

    private _activityTrackingGridConfig: any = {
        'complainRefNo': {
            headerDesc: 'Complaint Number', headerClass: 'header-first-td-style', dataClass: 'tbody-first-td-style'
        },
        'statusDisplay': {
            headerDesc: 'Status', headerClass: 'header-mid-td-style', dataClass: 'tbody-mid-td-style'
        },
        'commercialSett': {
            headerDesc: 'Commercial Settlement', headerClass: 'header-last-td-style', dataClass: 'tbody-last-td-style'
        }
    }

    private _activityTrackingGridConfigWithOutCommSet: any = {
        'complainRefNo': {
            headerDesc: 'Complaint Number', headerClass: 'header-first-td-style', dataClass: 'tbody-first-td-style'
        },
        'statusDisplay': {
            headerDesc: 'Status', headerClass: 'header-last-td-style', dataClass: 'tbody-last-td-style-partial-grid'
        }
    }

    get activityTrackingGridConfig(): any{
        return this._activityTrackingGridConfig;
    }
    set activityTrackingGridConfig(activityTrackingGridConfig: any){
        this._activityTrackingGridConfig = activityTrackingGridConfig;
    }

    get activityTrackingGridConfigWithOutCommSet(): any {
        return this._activityTrackingGridConfigWithOutCommSet;
    }

    set activityTrackingGridConfigWithOutCommSet(activityTrackingGridConfigWithOutCommSet: any) {
        this._activityTrackingGridConfigWithOutCommSet = activityTrackingGridConfigWithOutCommSet;
    }
}