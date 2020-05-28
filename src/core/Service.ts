import {IEntity} from 'core/Entity'
import {IDisposable} from 'core/IDisposable'
import {IComponent} from 'core/component'
import {EventDispatcher} from './EventDispatcher'
import {uniqueId} from 'lodash'
import {Registry} from './Registry'

export interface IService extends IDisposable {
    addEntity(entity: IEntity): void
    removeEntity(entity: IEntity): void
    hasEntity(entity: IEntity): boolean
    update(): void
    readonly id: string
    readonly type: string
    readonly entityCount: number
    readonly dependencyCount: number
    readonly entities: Array<IEntity>
    readonly eventListeners: string[]
}

export abstract class Service extends EventDispatcher implements IService {
    private _dependencies: Array<new () => IComponent> = new Array<new () => IComponent>()
    protected _entities: Array<IEntity> = new Array<IEntity>()
    protected _id: string

    constructor(id?: string) {
        super(id)

        if (id == null) {
            this._id = uniqueId(`Service_`)
        }

        Registry.addService(this)
    }

    public dispose(): void {
        this._entities.length = 0
    }

    public get entities(): Array<IEntity> {
        return this._entities
    }

    public get entityCount(): number {
        return this._entities.length
    }

    public get dependencies(): Array<new () => IComponent> {
        return this._dependencies
    }

    public get dependencyCount(): number {
        return this._dependencies.length
    }

    public get id(): string {
        return this._id
    }

    protected addDependency<T extends IComponent>(type: new () => T): void {
        if (!this._dependencies.includes(type)) {
            this._dependencies.push(type)
            console.info(`${type.name} automatically registered by ${this.type}.`)
        }
    }

    public addEntity(entity: IEntity): void {
        for (let a of this._dependencies) {
            if (!entity.hasComponent(a)) {
                entity.addComponent(a)
            }
        }
        this._entities.push(entity)
    }

    public removeEntity(entity: IEntity): void {
        let pos = this._entities.indexOf(entity)
        if (pos > -1) {
            this._entities.splice(pos, 1)
        }
    }

    public hasEntity(entity: IEntity) {
        return this._entities.includes(entity)
    }

    abstract update(): void
}
