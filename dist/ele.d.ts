interface Actions {
}
interface Returned extends Actions {
    [name: string]: any;
    css(option: Array<{
        name: string;
        value: string;
    }> | string, value?: string): void;
}
export declare function $(this: any, selector?: string): Returned | Actions;
export {};
