import { Service } from "core/Service";
import { SpatialComponent } from "components/SpatialComponent";

export class PhysicsService extends Service {
    constructor() {
        super()

        this.addDependency(SpatialComponent)
    }

    public update(): void {
        this._entities.forEach((entity, key) => {
            let component: SpatialComponent = entity.getComponent(SpatialComponent)
            component.data.matrix[0][3]++
            component.update()
        })
    }
}