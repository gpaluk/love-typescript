import { IEntity } from "core/entity";
import { IService } from "./Service";

export class ServiceRegistry
{
    private static _services: Map<string, IService> = new Map<string, IService>()
    
    public static addEntity<T extends IService>(entity: IEntity, type: (new () => T)): T
    {
        if(!this.hasService<T>(type))
        {
            this.addService(type)
        }

        let service:T  = this.getService<T>(type) as T
        service.addEntity(entity)

        return service;
    }

    public static addService<T extends IService>(type: (new () => T)): T
    {
        let t: T = new type();

        let service: IService = this._services.get(type.name);
        if(service)
        {
            return service as T
        }
        this._services.set(type.name, t);

        return t;
    }

    public static removeService<T extends IService>(type: (new () => T)): T
    {
        let service: IService = this._services.get(type.name);
        service.dispose();

        return service as T;
    }

    public static getService<T extends IService>(type: (new () => T)): T
    {
        return this._services.get(type.name) as T
    }

    public static hasService<T extends IService>(type: (new () => T)): boolean
    {
        return (this._services.has(type.name))
    }

    public static update(): void
    {
        this._services.forEach((value, key) =>
        {
            value.update()
        })
    }
}