# 一个简单实用的`javascript`工具库。

使用`typescript`编写，支持类`vue`框架的代码补全提示或直接在页面上使用。

**所有功能都在全局对象`$m`下，部分工具支持链式调用。**

### 示例：操作`cookie`

```javascript
//新建/更改cookie
$m.cookie.set({
  key:"newCookie",
  value:"hello world"
})
//删除cookie
$m.cookie.remove("newCookie")
//获取cookie
$m.cookie.getAll() 
//返回{"newCookie":"hello world",}
```

### 示例：方便的Ajax操作

```javascript
$m.ajax({
  url:"/",
  //请求地址
  data:{},
  //请求携带数据
  type:"GET",
  //请求方法
  method:"fetch",
  //请求类型
  success(data){},
  //回调函数
  error(data){},
  //回调函数
}).then().catch()
```

