# todolist

> An effective and flexible way to keep on top of your tasks.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# start server
npm run server

前端运行在8081端口，可在config下的index.js修改
后端运行在8888端口，文件是app.js，记得先开启mongodb
不同端口请求发生跨域，有两种解决方案：
一可在config下的index.js对proxyTable进行修改，如下，
proxyTable: {
  '/api': {
    target: 'http://localhost:8888',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
}
二是修改app.js文件，在所有请求之前加上代码如下：
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-type, Content-length, Authorization, Accept, X-Request-width')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
