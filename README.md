# express-mount-tracker

A tracker for mounted routes in express

** usage example**
```
const express = require('express');
const app = require('express-mount-tracker')(express());

app.get('/hello', function (req, res) {
  res.send('Hello World')
})

console.log(app.mountedRoutes) // prints [{path:'/hello', method:'get'}]
app.listen(3000)
```


**example with router**
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

```
where objeck have the following signature: 
{
    id: string, helper to identify later this particular route
    path: string, mount point 
    data: any, user custom object, everyting you want to associate with this route 
}

``

It keeps the sema behavior of standard express **app.[get|post|delete|path|put]** but add exta info in the final mountpoints objecty

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


```
$ npm install express-mount-tracker
```


### License

MIT