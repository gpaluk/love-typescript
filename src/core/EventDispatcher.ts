import {Event} from 'events/Event'

export class EventDispatcher {
    private _div: HTMLDivElement

    constructor() {
        this._div = document.getElementById('love-root') as HTMLDivElement

        this.dispatchEvent = this.dispatchEvent.bind(this)
        this.addEventListener = this.addEventListener.bind(this)
    }

    public dispatchEvent(type: string): void {
        let e: Event = new Event(type, this)
        this._div.dispatchEvent(e)
    }

    public addEventListener(notification: string, callback: Function): void {
        this._div.addEventListener(notification, (e: Event) => callback(e), false)
    }
}
