import {Event} from 'events/Event'
import {uniqueId} from 'lodash'
import {Registry} from './Registry'
import {IData} from './IData'

export class EventDispatcher {
    private _div: HTMLDivElement
    protected _id: string
    private _eventListeners: string[] = []

    constructor(id?: string) {
        this._div = document.getElementById('love-root') as HTMLDivElement

        this.dispatchEvent = this.dispatchEvent.bind(this)
        this.addEventListener = this.addEventListener.bind(this)

        id == null ? (this._id = uniqueId(`EventDispatcher_`)) : (this._id = id)
    }

    public get eventListeners(): string[] {
        return this._eventListeners
    }

    public dispatchEvent(type: string, data?: IData): void {
        console.log('[Dispatch] ' + this._id + '/' + type)

        let e: Event = new Event(this._id + '/' + type, this._id, data)
        this._div.dispatchEvent(e)
    }

    public addEventListener(dispatcher: EventDispatcher, notification: string, callback: Function): void {
        this._div.addEventListener(`${dispatcher.id}/${notification}`, (e: Event) => callback(e), false)
        if (!this._eventListeners.includes(notification)) {
            this._eventListeners.push(`\n\t\ttype: ${dispatcher.type}\n\t\tid: ${dispatcher.id}/${notification}`)
        }
    }

    public removeEventListener(dispatcher: EventDispatcher, notification: string, callback: Function): void {
        this._div.removeEventListener(`${dispatcher.id}/${notification}`, (e: Event) => callback(e), false)
        if (this._eventListeners.includes(notification)) {
            let index: number = this._eventListeners.indexOf(`\n\t\ttype:${dispatcher.type}\n\t\tid: ${dispatcher.id}/${notification}`)
            this._eventListeners = this._eventListeners.splice(index, 1)
        }
    }

    public get registry(): Registry {
        return Registry
    }

    public get id(): string {
        return this._id
    }

    public get type(): string {
        return Object.getPrototypeOf(this).constructor.name
    }
}
