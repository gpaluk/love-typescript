import {IEntity} from './entity'
import {IService} from './Service'
import {IComponent} from './Component'

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

    public static removeEntity(entity: IEntity): void {
        if (this._components.has(entity.id)) {
            this._components.delete(entity.id)
        }
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
        if (this._components.has(component.id)) {
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

    public static getServiceById(id: string): IService {
        return this._services.get(id)
    }

    public static removeService(service: IService): void {
        if (this._services.has(service.id)) {
            this._services.delete(service.id)
        }
    }

    public static auditEntity(entity: IEntity, wrapInfo: boolean = true): void {
        if (wrapInfo) {
            console.log('*** LOVE AUDIT START ***')
        }

        console.log(`${entity.type} id: ${entity.id}`)

        this._services.forEach(service => {
            if (service.hasEntity(entity)) {
                console.log(`\tService: ${service.type}\n\t\tid: ${service.id}`)
            }
        })
        entity.components.forEach(component => {
            let trimmed: string = this.trim(component.data.toString())
            console.log(`\tComponent: ${component.type}\n\t\tid: ${component.id}\n\t\tdata: ${trimmed}`)
        })
        entity.eventListeners.forEach(listener => {
            console.log(`\tListener: ${listener}`)
        })

        if (wrapInfo) {
            console.log('*** LOVE AUDIT END ***')
        }
    }

    public static audit(): void {
        console.log('* AUDIT START *')
        console.log('============  entities  ============')
        this._entities.forEach(entity => {
            this.auditEntity(entity, false)
        })
        console.log('* AUDIT END *')
    }

    public static trim(string: string, length: number = 100): string {
        return string.length <= length ? string : string.substr(0, length - 3) + '...'
    }
}
