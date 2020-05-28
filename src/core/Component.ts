import {IEntity} from 'core/entity'
import {IDisposable} from 'core/IDisposable'
import {EventDispatcher} from './EventDispatcher'
import {isEqual, cloneDeep, uniqueId} from 'lodash'
import {IData} from './IData'
import {Registry} from './Registry'
import {EventType} from 'events/EventType'

export interface IComponent extends IDisposable {
    entity: IEntity
    dispose(): void
    readonly id: string
    readonly type: string
    readonly data: IData
    readonly eventListeners: string[]
}

export abstract class Component<T extends IData> extends EventDispatcher implements IComponent {
    private _entity: IEntity

    protected _data: T
    protected _dataCache: T

    protected _view: HTMLElement

    constructor(type: new () => T, id?: string) {
        super(id)

        if (id == null) {
            this._id = uniqueId(`Component_`)
        }

        this._data = new type()
        this._dataCache = new type()

        Registry.addComponent(this)
    }

    public dispose(): void {
        Registry.removeComponent(this)
        this._entity = null
    }

    public get registry(): Registry {
        return Registry
    }

    public get id(): string {
        return this._id
    }

    public get entity(): IEntity {
        return this._entity
    }

    public set entity(value: IEntity) {
        this._entity = value
    }

    public get data(): IData {
        return this._data
    }

    public update(): void {
        if (!isEqual(this._dataCache, this._data)) {
            this._dataCache = cloneDeep(this._data)
            this.dispatchEvent(EventType.DATA_UPDATED, this._data)
        }
    }
}
