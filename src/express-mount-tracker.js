/*
MIT License

Copyright (c) 2020 Ivan Vaccari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/'use strict';

module.exports = (router) => {
    router.mountedRoutes = [];

    const expressUse = router.use;
    router.use = function (...args) {
        const _prepend = (typeof args[0] === 'string') ? args[0] : '';

        args.forEach(m => {
            if (Array.isArray(m.mountedRoutes)) {
                m.mountedRoutes.forEach(route => {
                    const _r = { method: route.method, path: _prepend + route.path };
                    if (route.id) {
                        _r.id = route.id;
                        _r.data = route.data;
                    }

                    router.mountedRoutes.push(_r);
                });
            }
        });

        expressUse.call(router, ...args);
    };

    const track = (args, method) => {
        if (typeof args[0] === 'string') {
            router.mountedRoutes.push({ method: method, path: args[0] });
        } else if (typeof args[0] === 'object' && typeof args[0].path === 'string' && typeof args[0].id === 'string') {
            router.mountedRoutes.push({ method: method, path: args[0].path, id: args[0].id, data: args[0].data });
            args.splice(0, 1, args[0].path);
        }
    };

    const expressGet = router.get;
    router.get = function (...args) {
        // apply tracking
        track(args, 'get');

        // ten just like the standard espress router.get
        expressGet.call(router, ...args);
    };

    const expressPost = router.post;
    router.post = function (...args) {
        // apply tracking
        track(args, 'post');

        // ten just like the standard espress router.post
        expressPost.call(router, ...args);
    };

    const expressDelete = router.post;
    router.delete = function (...args) {
        // apply tracking
        track(args, 'delete');

        // ten just like the standard espress router.delete
        expressDelete.call(router, ...args);
    };

    const expressPut = router.post;
    router.put = function (...args) {
        // apply tracking
        track(args, 'put');

        // ten just like the standard espress router.put
        expressPut.call(router, ...args);
    };

    const expressPatch = router.post;
    router.patch = function (...args) {
        // apply tracking
        track(args, 'patch');

        // ten just like the standard espress router.patch
        expressPatch.call(router, ...args);
    };

    return router;
};
