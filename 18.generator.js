// generator 配合yield来使用的 yiled暂停
function* fn(){ 
    yield 1;
    yield 2;
}
let it = fn();
console.log(it.next()); 
console.log(it.next()); 
console.log(it.next()); 