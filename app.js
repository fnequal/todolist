let express = require('express')
let app = express()
let bodyParser = require('body-parser')

let MongoClient = require('mongodb').MongoClient
let mongoUrl = 'mongodb://localhost:27017/todolist'
let _db
app.use(bodyParser.json())
MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    console.log(err)
    return false
  }
  console.log('NODE_ENV is ' + app.get('env'))
  console.log('connected to mongodb')
  _db = db
  app.listen(8888, () => {
    console.log('server is running')
  })
})

if (app.get('env') === 'production') {
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
}

app.post('/add', (req, res) => {
  let collection = _db.collection('todolists')
  let task = req.body
  if (!task.content || !task.time || !task.date) {
    res.send({errCode: -1, errMsg: '缺少参数'})
  }
  collection.insert({
    content: task.content,
    time: task.time,
    date: task.date,
    done: false
  }, (err, doc) => {
    if (err) {
      res.send({errCode: -1, errMsg: '网络错误'})
    } else {
      res.send({errCode: 0, errMsg: '创建成功', data: doc.ops[0]})
    }
  })
})

app.get('/list', (req, res) => {
  let collection = _db.collection('todolists')
  let totalTime = 0
  let totalCount = 0
  collection.find().toArray((err, docs) => {
    if (err) {
      res.send({errCode: -1, errMsg: '网络错误'})
    } else {
      docs.forEach(doc => {
        if (!doc.done) {
          totalCount++
          totalTime += doc.time
        }
      }, this)
      let total = {
        'time': totalTime,
        'count': totalCount
      }
      res.send({errCode: 0, errMsg: 'ok', data: {'list': docs, total: total}})
    }
  })
})

const ObjectId = require('mongodb').ObjectId
app.delete('/delete/:id', (req, res) => {
  let collection = _db.collection('todolists')
  let id = req.params.id
  collection.remove({_id: ObjectId(id)}, (err, doc) => {
    if (err) {
      res.send({errCode: -1, errMsg: '网络错误'})
    } else {
      res.send({errCode: 0, errMsg: 'ok'})
    }
  })
})

app.get('/search/:title', (req, res) => {
  let collection = _db.collection('todolists')
  if (req.params.title) {
    collection.find({content: {'$regex': req.params.title, $options: 'i'}}).toArray((err, docs) => {
      if (err) {
        res.send({errCode: -1, errMsg: '网络错误'})
      } else {
        res.send({errCode: 0, errMsg: 'ok', data: docs})
      }
    })
  }
})

app.post('/finish', (req, res) => {
  let id = req.body.id
  let collection = _db.collection('todolists')
  collection.update({_id: ObjectId(id)}, {$set: {done: true}}, (err, doc) => {
    if (err) {
      res.send({errCode: -1, errMsg: '网络错误'})
    } else {
      res.send({errCode: 0, errMsg: 'ok'})
    }
  })
})
