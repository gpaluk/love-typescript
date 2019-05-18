import { Service } from "core/Service";
import { ImageComponent } from "components/ImageComponent";

export class RenderService extends Service
{
    constructor()
    {
        super()
        
        this.addDependency(ImageComponent)
    }

    public update(): void {
        this._entities.forEach((value, key) =>
        {
            value.getComponent(ImageComponent).draw()
        })
    }
}