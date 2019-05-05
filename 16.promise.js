
// let promise = new Promise((resolve,reject)=>{
//     resolve(100);
// });
let fs = require("fs");
// function read(url){
//     return new Promise((resolve, reject)=>{
//         fs.readFile(url, "utf8", (err, data)=>{
//             if(err) return reject(err);
//             resolve(data);
//         });
//     });
// }

function promisify(fn){
    return function(){
        return new Promise((resolve,reject)=>{
            fn(...arguments, (err, data)=>{
                if(err) reject(err);
                resolve(data);
            });
        });
    }
}

//promise化 -> promisify
let read = promisify(fs.readFile);
let write = promisify(fs.writeFile);
write("./name.txt", "1234");

Promise.all([read("./name.txt", "utf8")]).then(data=>{
    console.log(data);
})

// Promise.all = function(values){ //values->array
//     return new Promise((resolve, reject)=>{
//         let arr = [];
//         let count = 0;
//         function processData(key, val){
//             arr[key] = val;
//             if(++count == values.length){
//                 resolve(arr);
//             }
//         }
//         for(let i=0; i<values.length; i++){
//             let current = values[i];
//             //判断当前项是promise还是普通值
//             let then = current.then;
//             if(then && typeof then==='function'){ //promise
//                 current.then(y=>{
//                     processData(i, y);
//                 }, reject);
//             }else{ //普通值
//                 processData(i, current);
//             }
//         }
//     });
// }

// Promise.race = function(values){
//     return new Promise((resolve,reject)=>{
//         for(let i=0; i<values.length; i++){
//             let current = values[i];
//             //判断当前项是promise还是普通值
//             let then = current.then;
//             if(then && typeof then==='function'){ //promise
//                 current.then(y=>{
//                     resolve(y);
//                 }, reject);
//             }else{ //普通值
//                 resolve(current);
//             }
//         }
//     });
// }

// Promise.race([read("./name.txt"), read("./age.txt"), 1,2 ,3]).then(data=>{
//     console.log(data);
// }).catch(err=>{
//     console.log("err", err);
// })

// Promise.all([read("./name.txt"), read("./age.txt"), 1,2 ,3]).then(data=>{
//     console.log(data);
// }).catch(err=>{
//     console.log("err", err);
// });

