## $m.ajax()

### 更方便好用的`Ajax`函数

> [!NOTE]
>
> 该函数支持`fetch`和`xhr`两种请求方式，支持设置请求头等。但是不支持取消请求。
>
> 支持`Typescript`泛型

示例：

```typescript
//泛型中指定期望的数据返回类型
$m.ajax<{
  code:number
  msg:string
}>({
  url:"/" //请求地址
  type:"GET" //请求方式，只支持GET和POST
  requestHeader:{
  	'Content-Type':"application/x-www-form-urlencoded;" //设置请求头
	},
  method:"fetch", //请求类型，只支持fetch和xhr
  data:{
   	a:1,
   	b:2
  }, //请求数据格式
  success(data,status){},//成功请求时的回调函数
  error(data,status,msg){}//失败的回调函数
}).then().catch() //支持promise
```

> [!CAUTION]
>
> 在使用`fetch`时，如果数据内容非JSON或无法正确解析为对象则也会触发error回调。但是`xhr`不会。

在使用`POST`请求时，数据格式会默认设置为`"application/x-www-form-urlencoded;"`。

部分情况下`error`回调函数或`catch`的返回字段中可能为`null`。

原型定义：

```typescript
interface Config<T> {
    url: string;
    type?: "GET" | "POST";
    requestHeader?: {
        [key: string]: string;
    };
    method?: "xhr" | "fetch";
    data?: {
        [query: string]: string;
    };
    success?: (data: T | string, status?: number) => void;
    error?: (data: T | string | null, status?: number | null, msg?: any) => void;
}
export declare function ajax<T>(config: Config<T>): Promise<{
    data: T | string;
    status: number;
}>;
```
