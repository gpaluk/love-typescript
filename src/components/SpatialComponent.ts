import {Component} from 'core/Component'
import {IData} from 'core/IData'

export class SpatialComponent extends Component<SpatialComponentData> {
    public constructor() {
        super(SpatialComponentData)
        this.reset()
    }

    public get data(): SpatialComponentData {
        return this._data as SpatialComponentData
    }

    public reset(): void {
        this.data.matrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
    }
}

export class SpatialComponentData implements IData {
    public matrix: number[][]
    public toString(): string {
        return `[SpatialComponentData] matrix: ${this.matrix.toString()}`
    }
}
