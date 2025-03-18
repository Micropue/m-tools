//元素操作
/**
 * 属性名称：$(selector) 元素选择器
 * 支持多个元素、ElementCore或Element
 * 方法：
 * attr 设置或获取元素属性
 * classList 当前元素的类名表「数组」
 * hasClass 是否含有此类名
 * addClass() 添加类名
 * removeClass() 移除类名
 * toggleClass() 切换类名显示
 * append() 添加元素，支持字符串
 * prepend() 添加元素，支持字符串
 * focus() 聚焦
 * blur() 失焦
 * css() 获取或设置css样式
 * on() 事件监听器
 * offset() 返回元素的offset位置对象
 * width、height、top、left元素的getBoundClientRect()「几何」位置
 * hide() 隐藏元素
 * show() 显示元素
 * remove() 移除元素
 * html() 添加html代码进入元素
 * text() 添加innerText进入元素
 * innerWidth()、innerHeight()、outerWidth()、outerHeight()
 * each(self=>{}) 元素遍历
 * scrollTo() 元素内滚动
 * fadeIn()
 * fadeOut()
 */
interface Offset {
    readonly top: number
    readonly left: number
    readonly width: number
    readonly height: number
}
interface ElementCore<T> {
    value: T | ElementCore<T>[]
    attr(prop: string, value?: string): string | ElementCore<T> | false
    readonly classList: string[]
    hasClass(className: string): boolean
    addClass(className: string): ElementCore<T>
    removeClass(className: string): ElementCore<T>
    toggleClass(className: string): ElementCore<T>
    append(template: string): ElementCore<T>
    prepend(template: string): ElementCore<T>
    focus(): ElementCore<T>
    blur(): ElementCore<T>
    css(name: keyof CSSStyleDeclaration, value: string | number): (string | number) | ElementCore<T>
    on(type: GlobalEventHandlersEventMap, listener: EventListenerOrEventListenerObject): ElementCore<T>
    offset(): Offset
    readonly width: number
    readonly height: number
    readonly top: number
    readonly left: number
    hide(): ElementCore<T>
    show(): ElementCore<T>
    remove(): void
    html(innerHTML: any): ElementCore<T>
    text(innerText: any): ElementCore<T>
    innerWidth(): number
    innerHeight(): number
    outerWidth(): number
    outerHeight(): number
    each(eachItems: (item: ElementCore<T> | undefined) => void): ElementCore<T>
    scrollTo(scrollHeight: number): ElementCore<T>
    fadeIn(): ElementCore<T>
    fadeOut(): ElementCore<T>
}
const useCore = <T extends Element>(element: T) => {
    const core: ElementCore<T> = {
        value: element,
        attr: function (prop: string, value?: string): string | ElementCore<T> | false {
            if (!prop) throw new Error("can't find parameter: 'prop'")
            if (value) {
                element.setAttribute(prop, value)
                return this
            } else {
                return element.getAttribute(prop) ?? false
            }
        },
        classList: (() => {
            return [...element.classList]
        })(),
        hasClass: function (className: string): boolean {
            return this.classList.includes(className)
        },
        addClass: function (className: string): ElementCore<T> {
            if (!className) throw new Error("can't find parameter: 'className'")
            element.classList.add(className)
            return this
        },
        removeClass: function (className: string): ElementCore<T> {
            if (!className) throw new Error("can't find parameter: 'className'")
            element.classList.remove(className)
            return this
        },
        toggleClass: function (className: string): ElementCore<T> {
            if (!className) throw new Error("can't find parameter: 'className'")
            if (this.classList.includes(className)) {
                element.classList.remove(className)
            } else {
                element.classList.add(className)
            }
            return this
        },
        append: function (template: string): ElementCore<T> {
            return this
        },
        prepend: function (template: string): ElementCore<T> {
            throw new Error("Function not implemented.")
        },
        focus: function (): ElementCore<T> {
            throw new Error("Function not implemented.")
        },
        blur: function (): ElementCore<T> {
            throw new Error("Function not implemented.")
        },
        css: function (name: keyof CSSStyleDeclaration, value: string | number): string | number | ElementCore<T> {
            throw new Error("Function not implemented.")
        },
        on: function (type: GlobalEventHandlersEventMap, listener: EventListenerOrEventListenerObject): ElementCore<T> {
            throw new Error("Function not implemented.")
        },
        offset: function (): Offset {
            throw new Error("Function not implemented.")
        },
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        hide: function (): ElementCore<T> {
            throw new Error("Function not implemented.")
        },
        show: function (): ElementCore<T> {
            throw new Error("Function not implemented.")
        },
        remove: function (): void {
            throw new Error("Function not implemented.")
        },
        html: function (innerHTML: any): ElementCore<T> {
            throw new Error("Function not implemented.")
        },
        text: function (innerText: any): ElementCore<T> {
            throw new Error("Function not implemented.")
        },
        innerWidth: function (): number {
            throw new Error("Function not implemented.")
        },
        innerHeight: function (): number {
            throw new Error("Function not implemented.")
        },
        outerWidth: function (): number {
            throw new Error("Function not implemented.")
        },
        outerHeight: function (): number {
            throw new Error("Function not implemented.")
        },
        each: function (eachItems: (item: ElementCore<T>) => void): ElementCore<T> {
            throw new Error("Function not implemented.")
        },
        scrollTo: function (scrollHeight: number): ElementCore<T> {
            throw new Error("Function not implemented.")
        },
        fadeIn: function (): ElementCore<T> {
            throw new Error("Function not implemented.")
        },
        fadeOut: function (): ElementCore<T> {
            throw new Error("Function not implemented.")
        }
    }
    return core
}
export function $<T extends Element>(selector: string): ElementCore<T> | ElementCore<T>[] {
    const ele = document.querySelectorAll(selector)
    if (ele.length > 1) {
        const rst: ElementCore<T>[] = []
        ele.forEach(self => rst.push(useCore<T>(self as T)))
        return rst
    } else {
        return useCore<T>(ele[0] as T)
    }
}