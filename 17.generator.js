// generator 生成器 -》 iterator 迭代器 next{value,done}

// let obj = {0:1,1:2,2:3,length:3, [Symbol.iterator]:function(){
//     let self = this;
//     let index = 0;
//     return {
//         next(){
//             return {
//                 value: self[index],
//                 done: index++ == self.length
//             }
//         }
//     }
// }};

let obj = {0:1,1:2,2:3,length:3, [Symbol.iterator]: function* (){
    let index = 0;
    while(index != this.length){
        yield this[index++];
    }
}};

// 类数组 有索引 有长度 有迭代器 iterator -> 展开转成数组
Array.from({0:1,1:2,2:3,length:3})
function fn(){
    // arguments
    let r = [...obj];
    console.log(r);
    console.log(Array.isArray(r));
}
fn(1,2,3);