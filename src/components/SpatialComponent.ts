import { Component } from "core/Component";
import { EventType } from "events/EventType";

export class SpatialComponent extends Component {
    protected _data: SpatialComponentData = new SpatialComponentData()
    protected _cache: SpatialComponentData = new SpatialComponentData()

    constructor() {
        super()
    }

    public update(): void {
        console.log(`The spatial component updated:  ${this._data.matrix}`)
        if (this._data !== this._cache) {
            this._cache.matrix = this._data.matrix
            this.dispatchEvent(EventType.DATA_UPDATE)
        }
    }

    public get data(): SpatialComponentData {
        return this._data
    }
}

export class SpatialComponentData {
    public matrix: number[][] =
        [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]
}