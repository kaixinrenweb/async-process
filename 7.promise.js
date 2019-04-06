// promise 承诺 
// 三种状态 默认状态: pending(等待) fulfilled(成功) rejected(失败)
// promise一旦成功，就不能失败，一旦失败，就不能成功
// 执行器同步执行 但是then是异步的
// 执行器一旦运行报错，就会走reject
let Promise = require("./promise/promise1");
let promise = new Promise((resolve, reject)=>{ //执行器
    //等待态
    // resolve(100);  //成功态
    // reject(200);   //失败态
    // throw new Error("错了...");
    setTimeout(() => {
        reject(456);
    }, 1000);
});

promise.then(data=>{
    console.log("success", data);
}, err=>{
    console.log("error...", err);
});

promise.then(data=>{
    console.log("success", data);
}, err=>{
    console.log("error...", err);
});