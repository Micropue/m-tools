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
    css(name: keyof CSSStyleDeclaration, value: string | number): (string | number) | ElementCore<T>;
    on(type: GlobalEventHandlersEventMap, listener: EventListenerOrEventListenerObject): ElementCore<T>;
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
export {};
