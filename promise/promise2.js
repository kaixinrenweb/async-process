// promise是一个构造函数
function Promise (exector){
    this.status = "pending"; //状态
    this.value = "";         //成功的值信息
    this.reason= "";         //失败的信息
    this.fulfilledCallbacks = [];  //成功之后的回调
    this.rejectedCallbacks = [];   //失败之后的回调
    let self = this;
    function resolve(value){
        if(self.status=='pending'){
            self.value = value;
            self.status = 'fulfilled';
            self.fulfilledCallbacks.forEach(fn=>fn());
        }
    }
    function reject(reason){
        if(self.status=='pending'){
            self.reason = reason;
            self.status = 'rejected';
            self.rejectedCallbacks.forEach(fn=>fn());
        }
    }
    try {
        exector(resolve, reject);
    }catch(e){
        reject(e);
    }
}

function resolvePromise(promise2, x, resolve, reject){
    if(promise2 === x){
        throw new TypeError("循环引用");
    }
    //如果x返回的是一个普通值，那直接就resolve
    if(x!=null && (typeof x==='object' || typeof x==='function')){ //可能就是一个promise
        //看当前的promise有木有then方法，有可能报错
        try {
            let then = x.then;
            if(typeof then==='function'){ //是一个promise
                then.call(x, y=>{
                    resolve(y);
                }, r=>{
                    reject(r);
                });
            }else{ //{then:{}}
                resolve(x);
            }
        }catch(e){
            reject(e);
        }
    }else{
        resolve(x);
    }
}

//then
Promise.prototype.then = function(onFulfilled, onRejcted){
    let promise2 = new Promise((resolve,reject)=>{
        if(this.status=='fulfilled'){
            setTimeout(()=>{
                try {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                }catch(e){
                    reject(e);
                }
            });
        }
        if(this.status=='rejected'){
            setTimeout(() => {
                try {
                    let x = onRejcted(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                }catch(e){
                    reject(e);
                }
            });
        }
        if(this.status=='pending'){
            this.fulfilledCallbacks.push(()=>{
                setTimeout(()=>{
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e);
                    }
                });        
            });
            this.rejectedCallbacks.push(()=>{
                setTimeout(()=>{
                    try {
                        let x = onRejcted(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e);
                    }
                });
            });
        }
    });
    return promise2;
}

module.exports = Promise;