## $mt.cookie

原型定义：

```typescript
export declare const cookie: {
    getAll(): {
        [name: string]: string;
    };
    set(config: {
        key: string;
        value?: string;
        path?: string;
        secure?: Boolean;
        sameSite?: "Lax" | "Strict" | "None";
        expires?: number;
    }): void;
    get(key: string): string | false;
    remove(key: string, path?: string): void;
};

```

方法：

`getAll()`获取所有cookie，返回一个对象。索引为cookie名称，值为cookie值。

`set(config)`设置或调整cookie。其中cookie的名称是必须的。更多可以详见developer.mozilla.org

`get(key)`获取cookie的值，存在该cookie时返回值，不存在则返回false。

`remove(key,path?)`删除cookie，无返回值。

