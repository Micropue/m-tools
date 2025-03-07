//元素操作
interface Attrs {
    name: string,
    value?: string | number
}
interface Actions {
    insertEle(name: string, options: {
        innerHTML?: string,
        innerText?: string,
        style?: keyof CSSStyleDeclaration
        attrs?: Array<Attrs>
    }, location: "append" | "prepend"): void
}
interface Returned extends Actions {
    [name: string]: any
    css(option: string, value: string): void
    offset(): {
        readonly top: number,
        readonly left: number,
        readonly width: number,
        readonly height: number
    }
    readonly width: number
    readonly height: number
}
export function $(this: any, selector?: string): Returned | Actions {
    const ele: HTMLElement | null = document?.querySelector(selector!)
    /**
     * 非元素型操作
     */
    const actions: Actions = {
        insertEle(name,options){
            
        }
    }
    /**
     * 对元素操作
     */
    const features: Returned = {
        css(option: string, value: string) {
            ele.style[option] = value
        },
        offset() {
            return {
                top: ele.offsetTop,
                left: ele.offsetLeft,
                width: ele.offsetWidth,
                height: ele.offsetHeight
            }
        },
        width: ele.getBoundingClientRect().width,
        height: ele.getBoundingClientRect().height,
        ...actions
    }
    for (const i in features) {
        this[i] = features[i]
    }
    if (selector)
        return features
    else
        return actions
}