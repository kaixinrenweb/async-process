let Promise = require("./promise/promise2");
let promise = new Promise((resolve, reject)=>{
    resolve(123);
});

promise.then().then().then(data=>{
    console.log(data);
}, err=>{
    console.log('err', err);
});