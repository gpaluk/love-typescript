import { IEntity } from "core/Entity";
import { IDisposable } from "core/IDisposable";
import { IComponent } from "core/component";

export interface IService extends IDisposable
{
    addEntity(entity: IEntity): void
    removeEntity(entity: IEntity): void
    update(): void
}

export abstract class Service implements IService
{
    protected _requires:Array<new() => IComponent> = new Array<new() => IComponent>()
    protected _entities:Array<IEntity> = new Array<IEntity>()

    public addEntity(entity: IEntity): void
    {
        for(let a of this._requires)
        {
            if(!entity.hasComponent(a))
            {
                entity.addComponent(a)
            }
        }
        this._entities.push(entity)
    }

    public removeEntity(entity:IEntity): void
    {
        let pos = this._entities.indexOf(entity);
        if(pos > -1)
        {
            this._entities.splice(pos, 1);
        }
    }

    abstract update(): void

    public dispose(): void
    {
        this._entities.length = 0;
    }
}