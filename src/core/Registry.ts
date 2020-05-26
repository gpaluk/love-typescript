//import {singleton} from 'tsyringe'

import {IEntity} from './entity'
import {IService, Service} from './Service'
import {IComponent} from './Component'

//@singleton()
export class Registry {
    private static _entities: Map<string, IEntity> = new Map<string, IEntity>()
    private static _services: Map<string, IService> = new Map<string, IService>()
    private static _components: Map<string, IComponent> = new Map<string, IComponent>()

    public static addEntity(id: string, entity: IEntity): IEntity {
        if (!this._entities.has(id)) {
            this._entities.set(id, entity)
        } else {
            console.warn('Facade::addEntity Entity already registered')
        }
        return entity
    }

    public static getEntityById(id: string): IEntity {
        return this._entities.get(id)
    }

    public static addComponent(component: IComponent): IComponent {
        if (!this._components.has(component.id)) {
            this._components.set(component.id, component)
        } else {
            console.warn('Facade::addComponent Component already registered')
        }
        return component
    }

    public static removeComponent(component: IComponent): void {
        if (!this._components.has(component.id)) {
            this._components.delete(component.id)
        }
    }

    public static getComponentById(id: string): IComponent {
        return this._components.get(id)
    }

    public static addService(service: IService): IService {
        if (!this._services.has(service.id)) {
            this._services.set(service.id, service)
        } else {
            console.warn(`Facade::addService Service ${service.id} already registered`)
        }
        return service
    }
}
