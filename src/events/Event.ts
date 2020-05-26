import {IData} from 'core/IData'

export class Event extends CustomEvent<any> {
    private _dispatcher: string
    private _data: IData

    constructor(type: string, dispatcher: string, data?: IData) {
        super(type, {bubbles: false, cancelable: false})
        this._dispatcher = dispatcher
        this._data = data
    }

    public get dispatcher(): any {
        return this._dispatcher
    }

    public get data(): IData {
        return this._data
    }
}
