// 面向切面的编程方式
// 面向对象
// 前端的埋点 在ajax的请求中包装一层自己的逻辑 -> 应用场景

Function.prototype.before = function(callback){ //高阶函数  参数是函数
    // return (val)=>{ //返回了一个函数
    //     callback();  //before要做的事情
    //     this(val);
    // };
    let self = this;
    return function(){
        callback();
        self.apply(self, arguments);
    };
}

function fn(val){
    console.log("有一定的功能了", val);
}

let newFn = fn.before(()=>{
    console.log("在函数执行之前执行这段话....");
});

newFn('hello');