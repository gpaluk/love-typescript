import {Component} from 'core/Component'
import {IDrawableComponent} from 'groups/IDrawableComponent'
import {IData} from 'core/IData'

export class ImageComponent extends Component<ImageComponentData> implements IDrawableComponent {
    public constructor() {
        super(ImageComponentData)

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

export class ImageComponentData implements IData {
    public image: HTMLImageElement = document.createElement('img')
    public toString(): string {
        return `[ImageComponentData] image: ${this.image.src}`
    }
}
