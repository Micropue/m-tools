## $m.$

### 用于简单化操作DOM元素

方法介绍：

attr 设置或获取元素属性
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
 * fadeIn() 淡入
 * fadeOut() 淡出
 * val() 获取元素value值或设置

> [!NOTE]
>
> 部分支持链式调用，并且每一个`ElemetCore`对象都有自身的`value`属性，访问此属性可以修改`Element`原型上的属性。

链式调用：

```javascript
$m.$("body").addClass("myClass").attr('myAttribute','found').append("<div></div>").fadeOut()
//每一个链条都指向$选择的根元素。
```

原型定义：

```typescript
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
    val(value?: string): string | ElementCore<T>;
}
export declare function $<T extends HTMLElement>(selector: string): ElementCore<T> | ElementCore<T>[];

```

