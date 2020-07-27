# express-mount-tracker

A tracker for mounted routes in expressjs.
This package applied to a express router or app instance register every yimer the user write down a use, get, post, patch, delete and put, then create an array of mounted routes. It can also add custom data to a route so the user can later iterate over the resulting array and retrieve custom data in order to create a documentation or statistical report.

To start registreing the mounts, you need to wrap the standard express app or router with express-mount-tracker:
```
const express = require('express');
const app = require('express-mount-tracker')(express());
const router = require('express-mount-tracker')(express.Router());
```

This will add a layer where the package will do his tricks. 
The returned object is still an express app/router so you can use it as usually.

### Examples

```
const express = require('express');
const app = require('express-mount-tracker')(express());

app.get('/hello', function (req, res) {
  res.send('Hello World')
})

console.log(app.mountedRoutes) // prints [{path:'/hello', method:'get'}]
app.listen(3000)
```


**Example with router**

Router will also be ancapsulated under express-mount-tracker

```
const express = mitownRequire('express');
const app = require('express-mount-tracker')(express());
const router = require('express-mount-tracker')(express.Router());

router.get('/mario', function (req, res) {
  res.send('Hello, its-a me, Mario!')
})

app.use('/itsame', router);

app.get('/hello', function (req, res) {
  res.send('Hello World')
})

console.log(app.mountedRoutes) // prints [{path:'/itsame/mario', method:'get'}, {path:'/hello', method:'get'}]
app.listen(3000)

```

### Additional parameters

this package introduces another way the user can define express routes:

**app.[get|post|delete|path|put](object, callback [, callback ...])**


where objeck have the following signature:
```
{
    id: string, helper to identify later this particular route
    path: string, mount point 
    data: any, user custom object, everyting you want to associate with this route 
}

```

It keeps the sema behavior of standard express **app.[get|post|delete|path|put]** but add exta info in the final mountpoints object

Example:
```
const express = mitownRequire('express');
const app = require('express-mount-tracker')(express());
const router = require('express-mount-tracker')(express.Router());

router.get('/mario', function (req, res) {
  res.send('Hello, its-a me, Mario!')
})

app.use({id: 'itsameroute', path:'/itsame'}, router);

app.get('/hello', function (req, res) {
  res.send('Hello World')
})

console.log(app.mountedRoutes) // prints [{path:'/itsame/mario', method:'get'}, {path:'/hello', method:'get'}]
app.listen(3000)

```

### Installation

This is a standard NPM package. Install it with

```
$ npm install express-mount-tracker
```

### License

MIT
