//fs readFile
// name.txt age.txt
//回调地狱
let fs = require("fs");
// fs.readFile("name.txt", "utf8", (err, data)=>{
//     if(err) return err;
//     fs.readFile(data, "utf8", (err, data)=>{
//         if(err) return err;
//         console.log(data);
//     });
// });
function read(url){
    return new Promise((resovle, reject)=>{
        fs.readFile(url, "utf8", (err, data)=>{
            if(err) return reject(err);
            resovle(data);
        });
    });
}
//promise提供了链式调用
// then 方法执行的结果是一个promise,每次返回的promise都是一个新的promise
// 这个返回的promise不同于jquery里面的this
read("name.txt").then(data=>{
    console.log(data);
    // return read(data+1);
    throw new Error("234");
}).then(data=>{
    console.log(data);
}, err=>{
    console.log("error", err);
    return 123;
}).then(data=>{
    console.log("success", data);
});

// then必须返回一个新的promise
let p = new Promise((resolve, reject)=>{
    reject();
});
let p2 = p.then(null, (err)=>{
    return 1;
});
p2.then(data=>{

})