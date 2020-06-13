import {uniqueId} from 'lodash'
import {Registry} from 'core/Registry'

export function pluginscript(nodeName: string, attributes: any[], ...children: HTMLElement[]): any {
    children = [].concat(...children)
    return {nodeName, attributes, children}
}

export class Renderer {
    public static render(vdom: any, element?: HTMLElement): HTMLElement {
        let entity = vdom.nodeName.prototype

        if (entity) {
            // Registry.getEntityById(vdom.attributes.id) === undefined

            let a = new entity.constructor(vdom.attributes)
            let data: any = a.render()
            return this._render(data, element)
        }
        return this._render(vdom, element)
    }

    private static _evt: Map<string, Function> = new Map()

    private static rand(): string {
        return uniqueId('evt_')
    }

    private static _render(vdom: any, element?: HTMLElement): HTMLElement {
        let dom: HTMLElement = document.createElement(vdom.nodeName)

        if (vdom.attributes != null) {
            for (let [key, value] of Object.entries(vdom.attributes)) {
                switch (key) {
                    case 'onabort':
                    case 'afterprint':
                    case 'animationend':
                    case 'onanimationiteration':
                    case 'onanimationstart':
                    case 'onbeforeprint':
                    case 'onbeforeunload':
                    case 'onblur':
                    case 'oncanplay':
                    case 'oncanplaythrough':
                    case 'onchange':
                    case 'onclick':
                    case 'oncontextmenu':
                    case 'oncopy':
                    case 'oncut':

                    case 'onmousedown':
                    case 'onmouseenter':
                    case 'onmouseleave':
                    case 'onmousemove':
                    case 'onmouseover':
                    case 'onmouseout':
                    case 'onmouseup':
                        let rand: string = this.rand()

                        this._evt.set(rand, vdom.attributes['onclick'])

                        dom.setAttribute(key, `${rand}(...arguments)`)

                        window[rand] = function() {
                            vdom.attributes[key](...arguments)
                        }
                        break
                    default:
                        dom.setAttribute(key, vdom.attributes[key])
                }
            }
        }

        for (let child of vdom.children) {
            if (typeof child === 'string') {
                dom.appendChild(document.createTextNode(child))
            } else if (typeof child === 'number') {
                dom.appendChild(document.createTextNode(child.toString()))
            } else if (typeof child === 'object') {
                if (typeof child.nodeName === 'function') {
                    dom.appendChild(this.render(child, element))
                } else {
                    dom.appendChild(this._render(child))
                }
            } else {
                dom.appendChild(this._render(child))
            }
        }

        if (element) {
            element.innerHTML = dom.innerHTML
        } else {
            document.body.appendChild(dom)
        }

        return dom
    }
}
