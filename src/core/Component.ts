import { IEntity } from 'core/entity'
import { IDisposable } from 'core/IDisposable'
import { EventDispatcher } from './EventDispatcher'

export interface IComponent extends IDisposable {
    entity: IEntity
    dispose(): void
}

export class Component extends EventDispatcher implements IComponent {
    protected _data: any
    private _entity: IEntity

    public get entity(): IEntity {
        return this._entity
    }

    public set entity(value: IEntity) {
        this._entity = value
    }

    public dispose(): void {
        this._entity = null
    }
}
