let Promise = require("./promise/promise2");
let promise = new Promise((resolve, reject)=>{ //执行器 同步执行代码
    resolve(123);
    // reject(234);
    // setTimeout(() => {
    //     resolve(100);
    // }, 1000);
    // throw new Error("出错了...");
});

//链式调用
promise.then(data=>{
    console.log("success1", data);
    // throw new Error("33");
    // return promise;
    return new Promise((resolve,reject)=>{
        resolve(new Promise((resolve,reject)=>{
            resolve(100);
        }));
    });
}, err=>{
    console.log("error1", err);
}).then(data=>{
    console.log("success2", data);
}, err=>{
    console.log("error2", err);
});

// promise.then(data=>{
//     console.log("success2", data);
// }, err=>{
//     console.log("error2", err);
// });