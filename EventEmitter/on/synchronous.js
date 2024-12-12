import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event-1', (a, b) => {
  setTimeout(() => {
    console.log('this happens asynchronously-1');
  },4000);
  
});
myEmitter.on('event-1', (a, b) => {
    setTimeout(() => {
      console.log('this happens asynchronously-2');
    },2000);
    
  });
  myEmitter.on('event-1', (a, b) => {
    setTimeout(() => {
      console.log('this happens asynchronously-3');
    },3000);
    
  });
myEmitter.emit('event-1', 'a', 'b');

