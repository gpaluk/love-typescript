import {IData} from 'core/IData'

export class Event extends CustomEvent<any> {
    private _dispatcher: any

    constructor(type: string, target: any) {
        super(type, {bubbles: false, cancelable: false})
        this._dispatcher = target
    }

    public get dispatcher(): any {
        return this._dispatcher
    }

    public get data(): IData {
        return this._dispatcher.data
    }
}
