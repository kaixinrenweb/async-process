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

//then
Promise.prototype.then = function(onFulfilled, onRejcted){
    if(this.status=='fulfilled'){
        onFulfilled(this.value);
    }
    if(this.status=='rejected'){
        onRejcted(this.reason);
    }
    if(this.status=='pending'){
        this.fulfilledCallbacks.push(()=>{
            onFulfilled(this.value);
        });
        this.rejectedCallbacks.push(()=>{
            onRejcted(this.reason);
        });
    }
}

module.exports = Promise;