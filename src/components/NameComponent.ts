import { Component, IComponent } from "core/Component";

export class NameComponent extends Component
{
    protected _data:NameComponentData = new NameComponentData()

    public get name():string
    {
        return this._data.name;
    }

    public set name(value:string)
    {
        this._data.name = value;
    }
}

export class NameComponentData
{
    public name:string = "";
}