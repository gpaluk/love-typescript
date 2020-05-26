import {Service} from 'core/Service'
import {AxiosComponent} from 'components/AxiosComponent'

export class WebService extends Service {
    constructor() {
        super()

        this.addDependency(AxiosComponent)
    }

    public update(): void {
        this._entities.forEach((entity, key) => {
            let component: AxiosComponent = entity.getComponent(AxiosComponent)
            component.update()
        })
    }
}
