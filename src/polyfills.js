// Polyfills for older browser compatibility

// CommonJS exports polyfill - 必须在其他polyfills之前
if (typeof exports === 'undefined') {
  window.exports = {};
}

// CommonJS module polyfill
if (typeof module === 'undefined') {
  window.module = {
    exports: window.exports,
    require: function() { return {}; }
  };
}

// Object.create polyfill
if (!Object.create) {
  Object.create = function(proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object: ' + proto);
    }
    if (proto === null) {
      throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
    }

    function F() {}
    F.prototype = proto;
    var result = new F();

    if (propertiesObject !== undefined) {
      Object.defineProperties(result, propertiesObject);
    }

    return result;
  };
}

// Object.defineProperties polyfill
if (!Object.defineProperties) {
  Object.defineProperties = function(obj, props) {
    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        Object.defineProperty(obj, prop, props[prop]);
      }
    }
    return obj;
  };
}

// Object.defineProperty polyfill (basic)
if (!Object.defineProperty) {
  Object.defineProperty = function(obj, prop, descriptor) {
    if (descriptor.value !== undefined) {
      obj[prop] = descriptor.value;
    }
    return obj;
  };
}

// Promise polyfill (basic)
if (typeof Promise === 'undefined') {
  window.Promise = function(executor) {
    var self = this;
    this.state = 'pending';
    this.value = undefined;
    this.handlers = [];

    function resolve(result) {
      if (self.state === 'pending') {
        self.state = 'fulfilled';
        self.value = result;
        self.handlers.forEach(handle);
        self.handlers = null;
      }
    }

    function reject(error) {
      if (self.state === 'pending') {
        self.state = 'rejected';
        self.value = error;
        self.handlers.forEach(handle);
        self.handlers = null;
      }
    }

    function handle(handler) {
      if (self.state === 'pending') {
        self.handlers.push(handler);
      } else {
        if (self.state === 'fulfilled' && typeof handler.onFulfilled === 'function') {
          handler.onFulfilled(self.value);
        }
        if (self.state === 'rejected' && typeof handler.onRejected === 'function') {
          handler.onRejected(self.value);
        }
      }
    }

    this.then = function(onFulfilled, onRejected) {
      return new Promise(function(resolve, reject) {
        handle({
          onFulfilled: function(result) {
            try {
              resolve(onFulfilled ? onFulfilled(result) : result);
            } catch (ex) {
              reject(ex);
            }
          },
          onRejected: function(error) {
            try {
              resolve(onRejected ? onRejected(error) : error);
            } catch (ex) {
              reject(ex);
            }
          }
        });
      });
    };

    executor(resolve, reject);
  };
}

// fetch polyfill placeholder (basic)
if (typeof fetch === 'undefined') {
  window.fetch = function(url, options) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(options.method || 'GET', url);
      xhr.onload = function() {
        resolve({
          ok: xhr.status >= 200 && xhr.status < 300,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: {
            get: function(name) {
              return xhr.getResponseHeader(name);
            }
          },
          text: function() {
            return Promise.resolve(xhr.responseText);
          },
          json: function() {
            return Promise.resolve(JSON.parse(xhr.responseText));
          }
        });
      };
      xhr.onerror = function() {
        reject(new Error('Network request failed'));
      };
      xhr.send(options.body || null);
    });
  };
}