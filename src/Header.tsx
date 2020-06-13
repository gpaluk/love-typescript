import {Entity} from 'core/entity'
import {pluginscript} from 'Renderer'

export interface IParams {
    readonly id?: string
    readonly message?: string
}

export class Header extends Entity {
    constructor(params: IParams) {
        super(params.id)
    }

    public render(): HTMLElement {
        return <h1 class="text-white">Hello world!! uygsfdugfidfhgidsuhfisduhfidsuh;kfjhsdioufhiufh</h1>
    }
}
