let Promise = require("./promise/promise3");
// let promise = new Promise((resolve,reject)=>{
//     resolve(200);
// });

// promise.then(data=>{
//     console.log(data);
// });

Promise.resolve(200).then(data=>{
    console.log(data);
});

Promise.reject(300).catch(data=>{
    console.log(data);
});