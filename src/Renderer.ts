export function pluginscript(nodeName: string, attributes: any[], ...children: HTMLElement[]): any {
    children = [].concat(...children)
    return {nodeName, attributes, children}
}

export class Renderer {
    public static render(vdom: any): HTMLElement {
        let component = vdom.nodeName.prototype
        let a = new component.constructor(vdom.attributes)

        let data: any = a.render()
        let htmlElement: HTMLElement = this._render(data)

        return htmlElement
    }

    private static _render(vdom: any): HTMLElement {
        let dom: HTMLElement = document.createElement(vdom.nodeName)

        if (vdom.attributes != null) {
            for (let [key, value] of Object.entries(vdom.attributes)) {
                dom.setAttribute(key, vdom.attributes[key])
            }
        }

        for (let child of vdom.children) {
            if (typeof child === 'string') {
                dom.appendChild(document.createTextNode(child))
            } else {
                dom.appendChild(this._render(child))
            }
        }

        document.body.appendChild(dom)
        return dom
    }
}
