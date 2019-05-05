let fs = require("fs");
function promisify(fn){
    return function(){
        return new Promise((resolve, reject)=>{
            fn(...arguments, (err, data)=>{
                if(err) reject(err);
                resolve(data);
            });
        });
    }
}
let readFile = promisify(fs.readFile);
// async函数执行后返回的是一个promise
// 如果try  +catch 那么这个promise返回的就是真
async function read(){
    let ageTxt = await readFile("./name1.txt", "utf8");
    let age    = await readFile(ageTxt, "utf8");
    return age;
}
read().then(data=>{
    console.log(data);
}).catch(err=>{
    console.log("----", err);
})

//generator +  co = async await