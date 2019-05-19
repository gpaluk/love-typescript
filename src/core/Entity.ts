import {IComponent} from 'core/Component'
import {ServiceRegistry} from 'core/ServiceRegistry'
import {IService} from 'core/Service'

export interface IEntity {
    readonly components: Map<string, IComponent>
    addComponent<T extends IComponent>(type: new () => T): T
    getComponent<T extends IComponent>(type: new () => T): T
    removeComponent<T extends IComponent>(type: new () => T): T
    hasComponent<T extends IComponent>(type: new () => T): boolean
    addService<T extends IService>(type: new () => T): T
    dispose(): void
}

export class Entity implements IEntity {
    private _components: Map<string, IComponent> = new Map<string, IComponent>()

    public get components() {
        return this._components
    }

    public dispose(): void {
        this._components.forEach((value, key) => {
            this._components.get(key).dispose()
        })

        this._components = null
    }

    public addService<T extends IService>(type: new () => T): T {
        return ServiceRegistry.addEntity<T>(this, type)
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
