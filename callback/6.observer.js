// 观察者的设计模式  基于发布订阅的设计模式的
// 发布订阅  发布者 订阅者 两者之间是没有关系的
// 观察者模式  观察者 和 被观察者是有关系的（你中有我，我中有你）
// 被观察者 保存了 所有的观察者
// 被观察者状态一旦发生改变  就会通知所有的观察者去update

// 被观察者 （宝宝）
class Subject {
    constructor(){
        this.state = "开心"; //被观察者自身的一个初始化的状态
        this.arrs = [];   //专门用来存储观察者的
    }
    attach(observer){
        this.arrs.push(observer);
    }
    setState(state){
        this.state = state;
        this.arrs.forEach(observer=>observer.update(state));
    }
}

// 观察者 (我、我媳妇)
class Observer {
    constructor(name){
        this.name = name;
    }
    update(state){
        console.log(`${this.name}知道了: 宝宝 ${state}`);
    }
}

let subject = new Subject();
let me = new Observer("我");
let wife = new Observer("我媳妇");
//把观察者放到被观察者身上去
subject.attach(me);
subject.attach(wife);
//宝宝状态发生改变
subject.setState("不开心了");

