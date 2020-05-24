import {IEntity} from 'core/entity'
import {IDisposable} from 'core/IDisposable'
import {EventDispatcher} from './EventDispatcher'
import {isEqual, cloneDeep, uniqueId} from 'lodash'
import {IData} from './IData'

export interface IComponent extends IDisposable {
    entity: IEntity
    dispose(): void
}

export abstract class Component<T extends IData> extends EventDispatcher implements IComponent {
    private _entity: IEntity

    protected _data: T
    protected _cache: T
    protected _bindId: string

    constructor(type: new () => T) {
        super()
        this._data = new type()
        this._cache = new type()
        this._bindId = uniqueId(`${type.name}_`)
    }

    public get bindId(): string {
        return this._bindId
    }

    public get entity(): IEntity {
        return this._entity
    }

    public set entity(value: IEntity) {
        this._entity = value
    }

    public dispose(): void {
        this._entity = null
    }

    public update(): void {
        if (!isEqual(this._cache, this._data)) {
            this._cache = cloneDeep(this._data)
            this.dispatchEvent(this._bindId)
        }
    }
}
