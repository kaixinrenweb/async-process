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
function * read(){
    let ageTxt = yield readFile("./name.txt", "utf8");
    let age    = yield readFile(ageTxt, "utf8");
    yield 1+Number(age);
    return age;
}
let it = read();  //生成器{}
let {value, done} = it.next();
value.then(data=>{
    let {value, done} = it.next(data);
    value.then(data=>{
        let {value, done} = it.next(data);
        Promise.resolve(value).then(data=>{
            console.log(data);
        })
    })
});