import {Component} from 'core/Component'
import {IData} from 'core/IData'
import axios, {AxiosResponse, AxiosInstance} from 'axios'

export class AxiosComponent extends Component<AxiosComponentData> {
    private _axios: AxiosInstance
    private _record: number = 1

    public get nextRecord(): number {
        return this._record++
    }

    constructor() {
        super(AxiosComponentData)

        this._axios = axios.create({
            baseURL: 'https://jsonplaceholder.typicode.com/',
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json'
        })
    }

    public get axios(): AxiosInstance {
        return this._axios
    }

    public async get(endpoint: string) {
        try {
            let response: AxiosResponse = await this._axios.get(endpoint)
            this.data.response = response
        } catch (e) {
            console.error('An error occurred')
        }
    }

    public get data(): AxiosComponentData {
        return this._data
    }
}

export class AxiosComponentData implements IData {
    public response: AxiosResponse
    public toString(): string {
        return this.response == null ? 'no data' : JSON.stringify(this.response.data)
    }
}
