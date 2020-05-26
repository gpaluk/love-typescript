import {Event} from 'events/Event'
import {IEntity} from './entity'
import {uniqueId} from 'lodash'
import {Registry} from './Registry'
import {IData} from './IData'

export class EventDispatcher {
    private _div: HTMLDivElement
    protected _id: string

    constructor(id?: string) {
        this._div = document.getElementById('love-root') as HTMLDivElement

        this.dispatchEvent = this.dispatchEvent.bind(this)
        this.addEventListener = this.addEventListener.bind(this)

        id == null ? (this._id = uniqueId(`Entity_`)) : (this._id = id)
    }

    public dispatchEvent(type: string, data?: IData): void {
        console.log('[Dispatch] ' + this._id + '/' + type)

        let e: Event = new Event(this._id + '/' + type, this._id, data)
        this._div.dispatchEvent(e)
    }

    public addEventListener(dispatcher: EventDispatcher, notification: string, callback: Function): void {
        console.log('Adding event listener: ' + dispatcher.id + '/' + notification)
        this._div.addEventListener(`${dispatcher.id}/${notification}`, (e: Event) => callback(e), false)
    }

    public get registry(): Registry {
        return Registry
    }

    public get id(): string {
        return this._id
    }
}
