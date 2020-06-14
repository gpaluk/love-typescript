import {Entity} from 'core/entity'
import {pluginscript} from 'Renderer'
import {mdiEmoticonExcitedOutline} from '@mdi/js'

export interface IParams {
    readonly id?: string
    readonly message?: string
}

export class Header extends Entity {
    constructor(params: IParams) {
        super(params.id)
    }

    private clickHandler(e: MouseEvent): void {
        console.log('You clicked me!!', e.currentTarget)
    }

    public render(): HTMLElement {
        return (
            <header class="flex items-center justify-between bg-black p-2">
                <svg onclick={this.clickHandler} class="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#ffffff" d={mdiEmoticonExcitedOutline} />
                </svg>
                <image class="w-10 h-10 rounded-full" src="https://pbs.twimg.com/profile_images/1096025475753877504/H9Q7u1VQ_400x400.png" />
                <image class="w-10 h-10 rounded-full" src="https://pbs.twimg.com/profile_images/1096025475753877504/H9Q7u1VQ_400x400.png" />
            </header>
        )
    }
}
