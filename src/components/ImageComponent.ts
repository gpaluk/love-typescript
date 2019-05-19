import {Component} from 'core/Component'
import {IDrawableComponent} from 'groups/IDrawableComponent'

export class ImageComponent extends Component implements IDrawableComponent {
    protected _data: ImageComponentData = new ImageComponentData()

    constructor() {
        super()
        this.image.onload = e => this._onImageLoaded(e)
        this.image.onerror = () => this._onImageError()
    }

    public get image(): HTMLImageElement {
        return this._data.image
    }

    public draw(): void {
        console.log("I'm drawing")
    }

    private _onImageLoaded(e: Event) {
        console.log(`Image loaded: ${this.image.src}`)
    }

    private _onImageError() {
        console.log(`Error loading: ${this.image.src}`)
    }
}

export class ImageComponentData {
    public image: HTMLImageElement = document.createElement('img')
}
