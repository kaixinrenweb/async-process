// let Promise = require("./promise/promise3");

let promise = new Promise((resolve,reject)=>{
    reject(100);
});

promise.catch(err=>{
    console.log('error',err);
}).then(data=>{
    console.log(data);
    throw new Error("pp");
}).finally(()=>{
    console.log(200);
}).then(data=>{
    console.log("finallyend...", data);
},err=>{
    console.log("finallyerr", err);
});

//finally  无论如何都会执行