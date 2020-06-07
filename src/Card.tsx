import {NameComponent} from 'components/NameComponent'
import {pluginscript} from 'Renderer'
import {AxiosComponent} from 'components/AxiosComponent'
import {EventType} from 'events/EventType'
import {Entity} from 'core/entity'
import {Event} from 'events/Event'
import {AxiosResponse} from 'axios'
import {Registry} from 'core/Registry'

export interface IProps {
    readonly name?: string
    readonly color?: string
}

export class Card extends Entity {
    private _axios: AxiosComponent

    constructor(props: IProps) {
        super()

        this.addComponent(NameComponent).name = props.name
        this._axios = this.addComponent(AxiosComponent)
        this.addEventListener(this._axios, EventType.DATA_UPDATED, (e: Event) => {
            let response = (e.data as AxiosResponse).data
            console.log('Load complete')
            console.log(response)
            Registry.auditEntity(this)
        })
        this._axios.get(`todos/${this._axios.nextRecord}`)
    }

    public render(): HTMLElement {
        return (
            <div class="bg-gray-800 rounded-lg p-6 m-4">
                <h1 class="text-white text-2xl">{this.getComponent(NameComponent).name}</h1>
                <ul class="list-disc p-4">
                    <li class="text-white">Welcome</li>
                    <li class="text-white">To</li>
                    <li class="text-white">Love</li>
                    <li class="text-white">TypeScript</li>
                </ul>
            </div>
        )
    }
}
