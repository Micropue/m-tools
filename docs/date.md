## $m.date()

### 输出格式化时间函数

#### `$m.date(regexp)`

`regexp`参数可选，可以用于输出格式化的时间。默认情况下会返回一个类时间对象。

格式化占位符：

| 字母 | 说明                                          |
| :--- | :-------------------------------------------- |
| Y    | 4位数字的年份例如：`2025`                     |
| m    | 2位数字的月份，自动补位0，例如：`03`          |
| F    | 月份，完整的文本格式，例如 January 或者 March |
| d    | 2位数字日期，自动补位0                        |
| w    | 星期中的第几天，以数字表示，0表示星期天       |
| H    | 24小时格式，有前导0，h为12小时格式            |
| i    | 分钟格式，有前导0                             |
| s    | 秒格式，有前导0                               |
| A    | 大写上下午，如AM                              |

```typescript
(regexp?: string) => {
    toString(): string;
    year: number;
    month: number;
    date: number;
    day: number;
    timestamp: number;
    hour: number;
    minute: number;
    second: number;
}
```

#### `$m.date(regexp).toString()`

返回根据`regexp`格式化后的时间

示例：

```javascript
const regexp = "Y-m-d H:i:s";
console.log($m.date(regexp).toString())
//2025-03-21 23:43:45
```

#### 类型定义：

```typescript
export declare const date: (regexp?: string) => {
    toString(): string;
    year: number;
    month: number;
    date: number;
    day: number;
    timestamp: number;
    hour: number;
    minute: number;
    second: number;
};
```