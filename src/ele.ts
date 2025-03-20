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
 * scrollTo() 元素内滚动
 * fadeIn()
 * fadeOut()
 */
interface Offset {
    readonly top: number;
    readonly left: number;
    readonly width: number;
    readonly height: number;
}
interface ElementCore<T> {
    value: T | ElementCore<T>[];
    attr(prop: string, value?: string): string | ElementCore<T> | false;
    readonly classList: string[];
    hasClass(className: string): boolean;
    addClass(className: string): ElementCore<T>;
    removeClass(className: string): ElementCore<T>;
    toggleClass(className: string): ElementCore<T>;
    append(template: string): ElementCore<T>;
    prepend(template: string): ElementCore<T>;
    focus(): ElementCore<T>;
    blur(): ElementCore<T>;
    css(
        name: keyof CSSStyleDeclaration,
        value: string | number
    ): (string | number) | ElementCore<T>;
    on(
        type: GlobalEventHandlersEventMap,
        listener: EventListenerOrEventListenerObject
    ): ElementCore<T>;
    offset(): Offset;
    readonly width: number;
    readonly height: number;
    readonly top: number;
    readonly left: number;
    hide(): ElementCore<T>;
    show(): ElementCore<T>;
    remove(): void;
    html(innerHTML: any): ElementCore<T>;
    text(innerText: any): ElementCore<T>;
    innerWidth(): number;
    innerHeight(): number;
    outerWidth(): number;
    outerHeight(): number;
    scrollTo(scrollHeight: number): ElementCore<T>;
    fadeIn(): ElementCore<T>;
    fadeOut(): ElementCore<T>;
}
const useCore = <T extends HTMLElement>(element: T) => {
    const core: ElementCore<T> = {
        value: element,
        attr: function (
            prop: string,
            value?: string
        ): string | ElementCore<T> | false {
            if (!prop) throw new Error("can't find parameter: 'prop'");
            if (value) {
                element.setAttribute(prop, value);
                return this;
            } else {
                return element.getAttribute(prop) ?? false;
            }
        },
        classList: (() => {
            return [...element.classList];
        })(),
        hasClass: function (className: string): boolean {
            return this.classList.includes(className);
        },
        addClass: function (className: string): ElementCore<T> {
            if (!className) throw new Error("can't find parameter: 'className'");
            element.classList.add(className);
            return this;
        },
        removeClass: function (className: string): ElementCore<T> {
            if (!className) throw new Error("can't find parameter: 'className'");
            element.classList.remove(className);
            return this;
        },
        toggleClass: function (className: string): ElementCore<T> {
            if (!className) throw new Error("can't find parameter: 'className'");
            if (this.classList.includes(className)) {
                element.classList.remove(className);
            } else {
                element.classList.add(className);
            }
            return this;
        },
        append: function (template: string): ElementCore<T> {
            const tmp = document.createElement("span");
            tmp.innerHTML = template;
            const childArray = Array.from(tmp.childNodes); // 复制 `childNodes`
            for (const node of childArray) {
                element.append(node);
            }
            return this;
        },
        prepend: function (template: string): ElementCore<T> {
            const tmp = document.createElement("span");
            tmp.innerHTML = template;
            const childArray = Array.from(tmp.childNodes).reverse(); // 反转以保证顺序
            for (const node of childArray) {
                element.prepend(node);
            }
            return this;
        },
        focus: function (): ElementCore<T> {
            const ele = element as unknown as HTMLElement;
            ele.focus();
            return this;
        },
        blur: function (): ElementCore<T> {
            const ele = element as unknown as HTMLElement;
            ele.blur();
            return this;
        },
        css: function (
            name: keyof CSSStyleDeclaration,
            value: string | number
        ): any | ElementCore<T> {
            if (!value) {
                // 使用 null 或者 undefined 来代替 false，这样可以更清晰地表示没有找到对应的样式值
                return getComputedStyle(element)[name] || null;
            } else {
                // 检查 name 是否为 length 或其他只读属性
                if (name !== "length" && name !== "parentRule") {
                    (element as unknown as HTMLElement).style.setProperty(
                        name.toString(),
                        value.toString()
                    );
                } else {
                    console.warn(`尝试修改只读属性: ${name}`);
                }
                return this;
            }
        },

        on: function (
            type: GlobalEventHandlersEventMap,
            listener: EventListenerOrEventListenerObject
        ): ElementCore<T> {
            element.addEventListener(type.toString(), listener);
            return this;
        },
        offset: function (): Offset {
            return {
                top: (element as unknown as HTMLElement).offsetTop,
                left: (element as unknown as HTMLElement).offsetLeft,
                width: (element as unknown as HTMLElement).offsetWidth,
                height: (element as unknown as HTMLElement).offsetHeight,
            };
        },
        width: (() => {
            return element.getBoundingClientRect().width;
        })(),
        height: (() => {
            return element.getBoundingClientRect().height;
        })(),
        top: (() => {
            return element.getBoundingClientRect().top;
        })(),
        left: (() => {
            return element.getBoundingClientRect().left;
        })(),
        hide: function (): ElementCore<T> {
            const all = element?.getAttribute("style");
            (element as unknown as HTMLElement).setAttribute("style", all + "; display: none");
            return this;
        },
        show: function (): ElementCore<T> {
            const all = element?.getAttribute("style");
            if (all) {
                element.setAttribute("style", all.replace(/display:[ ]*none/, ""));
            } else {
                element.style.display = "initial";
            }
            return this;
        },
        remove: function (): void {
            element.remove()
        },
        html: function (innerHTML: any): ElementCore<T> {
            element.innerHTML = innerHTML
            return this
        },
        text: function (innerText: any): ElementCore<T> {
            element.innerText = innerText
            return this
        },
        innerWidth: function (): number {
            return window.innerWidth
        },
        innerHeight: function (): number {
            return window.innerHeight
        },
        outerWidth: function (): number {
            return window.outerWidth
        },
        outerHeight: function (): number {
            return window.outerHeight
        },
        scrollTo: function (scrollHeight: number): ElementCore<T> {
            element.scrollTop = scrollHeight
            return this
        },
        fadeIn: function (): ElementCore<T> {
            throw new Error("Function not implemented.");
        },
        fadeOut: function (): ElementCore<T> {
            throw new Error("Function not implemented.");
        },
    };
    return core;
};
export function $<T extends HTMLElement>(
    selector: string
): ElementCore<T> | ElementCore<T>[] {
    const ele = document.querySelectorAll(selector);
    if (ele.length > 1) {
        const rst: ElementCore<T>[] = [];
        ele.forEach((self) => rst.push(useCore<T>(self as T)));
        return rst;
    } else {
        return useCore<T>(ele[0] as T);
    }
}
