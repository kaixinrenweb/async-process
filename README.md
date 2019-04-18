## 异步发展流程
- callback 
- promise
- generator
- async await *
```
视频观看地址：http://www.doudouyoutang.com/course.html
```

## callback (回调函数)
- js中的函数

## 高阶函数
- 一个函数的参数 是函数
- 一个函数的返回值  是函数
- `before`方法
- `after`方法

## Case
- 并行的读取文件
- 依赖于`after`方法实现的
- 依赖于`发布订阅`的设计模式来实现

## 设计模式
- `发布订阅`的设计模式
- `观察者`的设计模式

## promise
- 基本语法（语法糖）
- 三种状态 默认状态: `pending`(等待) `fulfilled`(成功) `rejected`(失败)
- `promise`一旦成功，就不能失败，一旦失败，就不能成功
- 执行器同步执行 但是`then`是异步的
- 执行器一旦运行报错，就会走`reject`
- `promise`提供了链式调用
- `then`方法执行的结果是一个`promise`,每次返回的`promise`都是一个新的`promise`
- 自己写的`promise`要通过`test`测试，符合`promise a+`规范
- `resolve(new Promise)`
- `catch`方法，`finally`方法（原型上的方法，实例上的方法）
- `Promise.resolve` / `Promise.reject` (类上面的方法)
- `Promise.all` / `Promise.race` (类上面的方法)
- `promisify`->`promise`化

## generator 生成器
- iterator 迭代器