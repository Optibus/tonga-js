# Tonga-js
A javascript client for the Tonga flag management framework


## Install

```bash
npm i git+https://github.com/Optibus/tonga-js.git#main-dist
```

## Import in ES Modules
```javascript
// import Prefetch Class
import { Prefetch } as CdkConfig from 'tonga-js'
// import Ondemand Class
import { Ondemand } as CdkConfig from 'tonga-js'
```

## Import in CommonJS (Node js)
```javascript
// import Prefetch Class
const { Prefetch } = require('tonga-js');
// assign to a common name
const CdkConfig = Prefetch;
```


## Prefetch
should mostly be used in client side where you can expect many `get`'s happening and want them to be quick.
* in this mode the `get` function is **synchronos**
* the constructor invokes an async function that will emit a `ready` event when done. 

#### Example 
```javascript
import { Prefetch } as CdkConfig from 'tonga-js'

const getConfData = (context) => {
    return new Promise(resolve) => {
        // code that will get the flags from the server or database
    }
}
// any context that you want to be used in the getConfData above
const context = {
    user: 'me'
};

const cdkConfig = new CdkConfig({ getConfgData }, context);
cdkConfig.on('ready' () => {
    const flagValue = cdkConfig.get('flagKey');
})
```



## On Demand
should mostly be used in servers where you are most likely not to call the `get` so often, so the cache size is smaller
* in this mode the `get` function is **asynchronos**
* the constructor 
#### Example 

```javascript
import { Ondemand } as CdkConfig from 'tonga-js'

const getFlag = (context) => {
    return new Promise(resolve) => {
        // code that will get the flag value from the server or database
    }
}
// any context that you want to be used in the getConfData above
const context = {
    user: 'me'
};

const cdkConfig = new CdkConfig({ getFlag }, context);
const flagValue = await cdkConfig.get('flagKey');
```

## Analyitics
The first argument passed in both modes is an object of functions. An optional function can be added to call analyitics -  `analytics`.
As an optimization it will be throttled. So in order to prevent calling it too many times during one second, it will aggregate all calls and will make one call after a full second that it hasnt been called.

#### Example 

```javascript

export interface ThrottleArgs {
  flagKey: string;
  flagValue: unknown;
}

const analyitics = (throttledArgs: ThrottledArgs[], context) => {
    return new Promise() {
        // ajax called that can have in its body the the throtteled args
    }
}

const cdkConfig = new CdkConfig({ getFlag, analytics }, context);
const flagValue = await cdkConfig.get('flagKey');
```