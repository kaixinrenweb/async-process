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

//兼容别人的promise
function resolvePromise(promise2, x, resolve, reject){
    if(promise2 === x){
        throw new TypeError("循环引用");
    }
    //如果x返回的是一个普通值，那直接就resolve
    if(x!=null && (typeof x==='object' || typeof x==='function')){ //可能就是一个promise
        //看当前的promise有木有then方法，有可能报错
        let called;
        try {
            let then = x.then; 
            if(typeof then==='function'){ //是一个promise
                then.call(x, y=>{
                    if(called) return;  
                    called = true;
                    //如果y依然是一个promise,递归解析
                    resolvePromise(promise2, y, resolve, reject);
                }, r=>{
                    if(called) return; //防止调用失败，又调用成功
                    called = true;
                    reject(r);
                });
            }else{ //{then:{}}
                resolve(x);
            }
        }catch(e){
            if(called) return; //防止出错之后，继续调用成功的逻辑
            called = true;
            reject(e);
        }
    }else{
        resolve(x);  //普通值
    }
}

//then
Promise.prototype.then = function(onFulfilled, onRejcted){
    //如果then的方法中没有传入成功或者失败的回调函数，就依次往下传
    onFulfilled = typeof onFulfilled ==='function'? onFulfilled : val=>val;
    onRejcted = typeof onRejcted=='function' ? onRejcted : err=>{throw err};
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

// npm install promises-aplus-tests -g
// promises-aplus-tests promise2.js
Promise.deferred = function(){
    let dtd = {};
    dtd.promise = new Promise((resolve, reject)=>{
        dtd.resolve = resolve;
        dtd.reject  = reject;
    });
    return dtd;
}

module.exports = Promise;