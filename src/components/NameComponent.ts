import {Component} from 'core/Component'
import {IData} from 'core/IData'

export class NameComponent extends Component<NameComponentData> {
    public constructor() {
        super(NameComponentData)
    }

    public get name(): string {
        return this._data.name
    }

    public set name(value: string) {
        this._data.name = value
    }
}

export class NameComponentData implements IData {
    public name: string = ''
    public toString(): string {
        return `[NameComponentData] Name: ${this.name}`
    }
}
