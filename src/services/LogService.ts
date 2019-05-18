import { NameComponent } from "components/nameComponent";
import { Service } from "core/Service";

export class LogService extends Service
{
    protected _requires = [NameComponent]

    public update(): void
    {
        for(let entity of this._entities)
        {
            console.log(`LogService:: ${entity.getComponent(NameComponent).name}`)
        }
    }
}