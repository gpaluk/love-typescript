import {NameComponent} from 'components/NameComponent'
import {pluginscript, Renderer} from 'Renderer'
import {AxiosComponent, AxiosComponentData} from 'components/AxiosComponent'
import {EventType} from 'events/EventType'
import {Entity} from 'core/entity'
import {Event} from 'events/Event'
import {WebService} from 'services/WebService'
import {Header} from 'Header'

export interface IParams {
    readonly id?: string
    readonly message?: string
}

export class Card extends Entity {
    private _axios: AxiosComponent
    private _counter: number = 0
    private _data: string = '-'

    constructor(params: IParams) {
        super(params.id)

        this.addService(WebService)
        this.addComponent(NameComponent).name = params.message
        this._axios = this.getComponent(AxiosComponent)
        this.addEventListener(this._axios, EventType.DATA_UPDATED, (e: Event) => {
            let response = (e.data as AxiosComponentData).response.data
            this._data = response.title
            Renderer.render(this.render(), document.getElementById('card'))
        })

        this.handleLoadData(null)

        this.handleIncrement = this.handleIncrement.bind(this)
        this.handleLoadData = this.handleLoadData.bind(this)
    }

    private handleIncrement(e: MouseEvent): void {
        this._counter++
    }

    private handleLoadData(e: MouseEvent): void {
        this._axios.get(`todos/${this._axios.nextRecord}`)
    }

    public render(): HTMLElement {
        return (
            <div>
                <Header id="header" />
                <div class="bg-gray-800 rounded-lg p-6 m-4">
                    <h1 class="text-white text-2xl">{this.getComponent(NameComponent).name}</h1>
                    <ul class="list-disc p-4">
                        <li class="text-white">Welcome</li>
                        <li class="text-white">To</li>
                        <li class="text-white">Love</li>
                        <li class="text-white">TypeScript</li>
                        <li class="text-white">Counter: {this._counter}</li>
                        <li class="text-white">Data: {this._data}</li>
                    </ul>
                </div>
                <button class="m-2 rounded-lg p-2 bg-red-300" onclick={this.handleIncrement}>
                    Increment!
                </button>
                <button class="m-2 rounded-lg p-2 bg-indigo-300" onclick={this.handleLoadData}>
                    Load data!
                </button>
            </div>
        )
    }
}
