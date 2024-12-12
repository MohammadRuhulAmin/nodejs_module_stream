class EventEmitter {
    constructor() {
      this._eventListeners = {};
    }
    addEventListener(eventName, listener) {
      if (!this._eventListeners[eventName]) {
        this._eventListeners[eventName] = [];
      }
      this._eventListeners[eventName].push(listener);
    }
  
    removeEventListener(eventName, listener) {
      if (this._eventListeners[eventName]) {
        this._eventListeners[eventName] = this._eventListeners[eventName].filter(
          (l) => l !== listener
        );
      }
    }
  
    dispatchEvent(event) {
      if (this._eventListeners[event.type]) {
        this._eventListeners[event.type].forEach((listener) => {
          listener(event);
        });
      }
    }
  }
  
  // Example usage:
  const myEmitter = new EventEmitter();
  
  myEmitter.addEventListener('myEvent', (event) => {
    console.log('Event received:', event);
  });
  
  myEmitter.dispatchEvent({ type: 'myEvent', data: 'Hello' });