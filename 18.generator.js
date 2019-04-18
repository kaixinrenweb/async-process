// generator 配合yield来使用的 yiled暂停
function* fn(){ 
    let a = yield 1;
    console.log(a);
    let b = yield 2;
    console.log(b);
    return 5;
}
let it = fn();
console.log(it.next()); 
console.log(it.next(10)); 
console.log(it.next(20)); 