// class Events {
//   listeners = {}; //Master object

//   addListener(eventName, fn) {
//     this.listeners[eventName] = this.listeners[eventName] || [];
//     this.listeners[eventName].push(fn);
//     return this;
//   }

//   on(eventName, fn) {
//     return this.addListener(eventName, fn);
//   }

//   once(eventName, fn) {
//     this.listeners[eventName] = this.listeners[eventName] || [];
//     const onceWrapper = () => {
//       fn();
//      return this.off(eventName, fn);
//     };
//     this.listeners[eventName].push(onceWrapper);
//     //console.log("this in once", this);
//     return this;
//   }

//   off(eventName, fn) {
//     return this.removeListener(eventName, fn);
//   }

//   removeListener(eventName, fn) {
//     let lis = this.listeners[eventName];
//     if (!lis) return this;

//     for (let i = lis.length; i >= 0; i--) {
//       if (lis[i] === fn) {
//         lis.splice(i, 1);
//         break;
//       }
//     }
//     //console.log("this in removeListeners", this);
//     return this;
//   }

//   emit(eventName, ...args) {
//     let fns = this.listeners[eventName];
//     if (!fns) return false;
//     fns.forEach((f) => {
//       f(...args);
//     });
//     return true;
//   }

//   listenersCount(eventName) {
//     let fns = this.listeners[eventName];
//     return fns.length;
//   }
// }

// const myE = new Events();
// myE.once("foo", () => {
//   console.log("An event occured 1");
// });

// myE.on("add",function (num1, num2){
//   console.log(num1+num2);
// });

// myE.emit("foo");
// myE.emit("foo");
// myE.emit("foo");
// myE.emit("add", 1, 2)

// const EventEmitter = require("node:events")

// class MyEmitter extends EventEmitter{}

// const myEE = new MyEmitter()

// myEE.emit("error", new Error("This is an error") )

const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('error', (err) => {
  console.error('whoops! there was an error');
});
myEmitter.emit('error', new Error());
// Prints: whoops! there was an error
