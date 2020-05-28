import {IComponent} from 'core/Component'
import {ServiceRegistry} from 'core/ServiceRegistry'
import {IService} from 'core/Service'
import {EventDispatcher} from './EventDispatcher'
import {Registry} from './Registry'
import {uniqueId} from 'lodash'

export interface IEntity {
    readonly components: Map<string, IComponent>
    addComponent<T extends IComponent>(type: new () => T): T
    getComponent<T extends IComponent>(type: new () => T): T
    removeComponent<T extends IComponent>(type: new () => T): T
    hasComponent<T extends IComponent>(type: new () => T): boolean
    addService<T extends IService>(type: new () => T): T
    dispose(): void
    readonly id: string
    readonly type: string
    readonly eventListeners: string[]
}

export class Entity extends EventDispatcher implements IEntity {
    private _components: Map<string, IComponent> = new Map<string, IComponent>()

    constructor(id?: string) {
        super(id)

        if (id == null) {
            this._id = uniqueId(`Entity_`)
        }

        Registry.addEntity(this._id, this)
    }

    public get components(): Map<string, IComponent> {
        return this._components
    }

    public dispose(): void {
        this._components.forEach((value, key) => {
            this._components.get(key).dispose()
        })

        this._components = null
        Registry.removeEntity(this)
    }

    public addService<T extends IService>(type: new () => T): T {
        return ServiceRegistry.addEntity<T>(this, type)
    }

    public getService<T extends IService>(type: new () => T): T {
        return ServiceRegistry.getService<T>(type)
    }

    public removeService<T extends IService>(type: new () => T): T {
        return ServiceRegistry.removeEntity<T>(this, type)
    }

    public addComponent<T extends IComponent>(type: new () => T): T {
        let c: T = new type()
        c.entity = this

        this._components.set(type.name, c)

        return this._components.get(type.name) as T
    }

    public getComponent<T extends IComponent>(type: new () => T): T {
        return this._components.get(type.name) as T
    }

    public removeComponent<T extends IComponent>(type: new () => T): T {
        let component: IComponent = this._components.get(type.name)

        if (component != null) {
            this._components.set(type.name, null)
        }

        return component as T
    }

    public hasComponent<T>(type: new () => T): boolean {
        return this._components.get(type.name) != null
    }
}
