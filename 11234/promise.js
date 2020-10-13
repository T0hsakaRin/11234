const STATUS = {
  PENDING:"PENDING",
  FULFILLED:'FULFILLED',
  REJECTED:'REJECTED'
}

// 1.excoutor
// class MyPromise {
//   constructor(excutor){
//     this.value = undefined
//     let resolve = (value)=>{
//       console.log('value',value);
//     }
//     let reject = (reason)=>{
//       console.log('reason',reason);
//     }
//     try{
//       excutor(resolve,reject)
//     }catch(e){
//       reject(e)
//     }
//   }
// }
// const newP = new MyPromise((resolve,reject)=>{
//   const a = "resolve"
//   resolve(a)
// })



// 2 添加then方法
// class MyPromise {
//   constructor(excutor){
//     this.value = undefined
//     this.reason = this.reason
//     this.state = STATUS.PENDING
//     let resolve = (value)=>{
//       console.log('resolve 调用');
//       this.state = STATUS.FULFILLED
//       this.value = value
//     }
//     let reject = (reason)=>{
//       console.log('reject 调用');
//       this.state = STATUS.REJECTED
//       this.reason = reason
//     }
//     try{
//       excutor(resolve,reject)
//     }catch(e){
//       reject(e)
//     }
//   }
//   then(onFulfilled,onReject){
//     console.log('then 执行');
//     if(this.state === "FULFILLED"){
//       onFulfilled(this.value)
//     }
//     if(this.state === "REJECTED"){
//       onReject(this.reason)
//     }


//   }
//   test(){
//     console.log('test');
//   }
// }
// const newP = new MyPromise((resolve,reject)=>{
//   setTimeout(
//     ()=>{
//       resolve(1)
//     },
//   1000)
// }).then(()=>{
//   console.log('onFulfilled');
  
// })




// new Promise((resolve)=>{
//   resolve(1)
// }).then((a)=>{
//   console.log('a',a);
// })


// 3 解决异步 
// 发布订阅 
class MyPromise {
  constructor(excutor){
    this.state = "pending"
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks =[]
    this.onRejectedCallbacks =[]

    let resolve = (value)=>{
      console.log('resolve',this.onResolvedCallbacks);
      if(this.state === 'pending'){
        this.state = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach(fn=>fn())
      }
    }
    let reject = (reason)=>{
      if(this.state === 'pending'){
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn=>fn())
      }
    }
    try{
      excutor(resolve,reject)
    }catch(e){
      reject(e)
    }
  }
  then(onFulfilled,onReject){
    console.log('then');
    if(this.state === "FULFILLED"){
      onFulfilled(this.value)
    }
    if(this.state === "REJECTED"){
      onReject(this.reason)
    }
    if(this.state === 'PENDING'){
      this.onResolvedCallbacks.push(()=>{onFulfilled(this.value)})
      this.onRejectedCallbacks.push(()=>{onReject(this.reason)})
    }
  }
}

const newP = new MyPromise((resolve,reject)=>{
  const a = "resolve"
  resolve(a)
  setTimeout(
    ()=>{
      resolve(1)
    },
  1000)
}).then(
  (resolve)=>console.log("resolve",resolve),
  (reject)=>console.log("reject",reject)
)


//同步任务  
// exuctor(a)
// then()

//异步任务  
// exuctor(a)
// then()

// resolve(a)



// 4 处理promise2  x (then里面继续返回promise)
// 
// 
// 分割线  



class MyPromise {
  constructor(excutor){
    this.state = "pending"
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks =[]
    this.onRejectedCallbacks =[]

    let resolve = (value)=>{
      console.log('resolve',this.onResolvedCallbacks);
      if(this.state === 'pending'){
        this.state = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach(fn=>fn())
      }
    }
    let reject = (reason)=>{
      if(this.state === 'pending'){
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn=>fn())
      }
    }
    try{
      excutor(resolve,reject)
    }catch(e){
      reject(e)
    }
  }
  // x 代表上一个then回调的结果  有可能是普通值 promise
  // 普通值可以直接返回 
  //如果是promise  要通过resolve返回
  //resolvePromise
  then(onFulfilled,onReject){
    console.log('then');
    let promise2 = new MyPromise((resolve,reject)=>{
      if(this.state === "FULFILLED"){
        //先让primise2生成  再执行下面这一段 这儿是模拟异步  并没有达到真实效果
        setTimeout(()=>{
          try{
            let x = onFulfilled(this.value)
            console.log('onFulfilled x',x);
  
            resolvePromise(promise2,x,resolve,reject)
          }catch(e){
            reject(e)
          }
        },0)
      }
      if(this.state === "REJECTED"){
        setTimeout(()=>{
          try{
            let x = onReject(this.reason)
            resolvePromise(promise2,x,resolve,reject)
          }catch(e){
            reject(e)
          }
        })
      }
      if(this.state === 'PENDING'){
        this.onResolvedCallbacks.push(()=>{
            try{
              let x = onFulfilled(this.value)
              resolvePromise(promise2,x,resolve,reject)
            }catch(e){
              reject(e)
            }
        })
        this.onRejectedCallbacks.push(()=>{
            try{
              let x = onReject(this.reason)
              resolvePromise(promise2,x,resolve,reject)
            }catch(e){
              reject(e)
            }
        })
      }
    })
    return promise2
  }
}

function resolvePromise(promise2, x, resolve, reject){
  console.log('xxxxx is',x);
  
  // 循环引用报错
  if(x === promise2){
    // reject报错
    return reject(new TypeError('Chaining cycle detected for myPromise'));
  }
  // 防止多次调用
  let called;
  // x不是null 且x是对象或者函数
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    
    try {
      // A+规定，声明then = x的then方法
      let then = x.then;

      // 如果then是函数，就基本确认默认是promise了 (判断promise的方法)
      if (typeof then === 'function') { 
        // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
        then.call(x, y => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          // resolve(y)
          // resolve的结果依旧是promise 那就需要继续递归解析调用
          // todo
          // resolvePromise(promise2, y, resolve, reject);
        }, err => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          reject(err);// 失败了就失败了
        })
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      console.log('aaaaaaaaa2');

      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了那就不要在继续执行了
      reject(e); 
    }
  } else {
    resolve(x);
  }
}



// 5 处理链式调用
//  添加catch
// class MyPromise{
//   constructor(executor){
//     this.state = 'pending';
//     this.value = undefined;
//     this.reason = undefined;
//     this.onResolvedCallbacks = [];
//     this.onRejectedCallbacks = [];
//     let resolve = value => {
//       if (this.state === 'pending') {
//         this.state = 'fulfilled';
//         this.value = value;
//         this.onResolvedCallbacks.forEach(fn=>fn());
//       }
//     };
//     let reject = reason => {
//       if (this.state === 'pending') {
//         this.state = 'rejected';
//         this.reason = reason;
//         this.onRejectedCallbacks.forEach(fn=>fn());
//       }
//     };
//     try{
//       executor(resolve, reject);
//     } catch (err) {
//       reject(err);
//     }
//   }
//   then(onFulfilled,onRejected) {
//      值穿透解决 
//     onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
//     onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
//     let promise2 = new MyPromise((resolve, reject) => {
//       if (this.state === 'fulfilled') {
//         setTimeout(() => {
//           try {
//             let x = onFulfilled(this.value);
//             resolvePromise(promise2, x, resolve, reject);
//           } catch (e) {
//             reject(e);
//           }
//         }, 0);
//       };
//       if (this.state === 'rejected') {
//         setTimeout(() => {
//           try {
//             let x = onRejected(this.reason);
//             resolvePromise(promise2, x, resolve, reject);
//           } catch (e) {
//             reject(e);
//           }
//         }, 0);
//       };
//       if (this.state === 'pending') {
//         this.onResolvedCallbacks.push(() => {
//           setTimeout(() => {
//             try {
//               let x = onFulfilled(this.value);
//               resolvePromise(promise2, x, resolve, reject);
//             } catch (e) {
//               reject(e);
//             }
//           }, 0);
//         });
//         this.onRejectedCallbacks.push(() => {
//           setTimeout(() => {
//             try {
//               let x = onRejected(this.reason);
//               resolvePromise(promise2, x, resolve, reject);
//             } catch (e) {
//               reject(e);
//             }
//           }, 0)
//         });
//       };
//     });
//     return promise2;
//   }
//   catch(fn){
//     return this.then(null,fn);
//   }
// }
new Promise((resolve,reject)=>{
  resolve(1111)
  // throw new Error("error")
}).then(
  ()=>{},
  (reason)=>{console.log("reason",reason)
  }).catch((e)=>{
    console.log('catch',e);
    
  })
  
// function resolvePromise(promise2, x, resolve, reject){
//   if(x === promise2){
//     return reject(new TypeError('Chaining cycle detected for promise'));
//   }
//   let called;
//   if (x != null && (typeof x === 'object' || typeof x === 'function')) {
//     try {
//       let then = x.then;
//       if (typeof then === 'function') { 
//         then.call(x, y => {
//           if(called)return;
//           called = true;
//           resolvePromise(promise2, y, resolve, reject);
//         }, err => {
//           if(called)return;
//           called = true;
//           reject(err);
//         })
//       } else {
//         resolve(x);
//       }
//     } catch (e) {
//       if(called)return;
//       called = true;
//       reject(e); 
//     }
//   } else {
//     resolve(x);
//   }
// }


// 5 其他方法
// resolve方法
// Promise.resolve = function(val){
//   return new Promise((resolve,reject)=>{
//     resolve(val)
//   });
// }
// reject方法
// Promise.reject = function(val){
//   return new Promise((resolve,reject)=>{
//     reject(val)
//   });
// }
// race方法 
// MyPromise.race = function(promises){
//   return new MyPromise((resolve,reject)=>{
//     for(let i=0;i<promises.length;i++){
//       promises[i].then(resolve,reject)
//     };
//   })
// }
// all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
// MyPromise.all = function(promises){
//   let arr = [];
//   let i = 0;
//   function processData(index,data){
//     arr[index] = data;
//     i++;
//     if(i == promises.length){
//       resolve(arr);
//     };
//   };
//   return new Promise((resolve,reject)=>{
//     for(let i=0;i<promises.length;i++){
//       promises[i].then(data=>{
//         processData(i,data);
//       },reject);
//     };
//   });
// }
