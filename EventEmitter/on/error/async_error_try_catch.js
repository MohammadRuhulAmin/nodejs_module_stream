import { EventEmitter } from 'node:events';
const ee = new EventEmitter();
ee.on('something', async (value) => {
  try{
    throw new Error('kaboom-->xxx');
  }catch(error){
    console.error(error.message)
  }
});
ee.emit('something',12)
