
import { EventEmitter } from 'node:events';


/** This code will throw error and program will crash  */
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();
ee.on('something', async (value) => {
  throw new Error('kaboom');
});
ee.emit('something',12)

