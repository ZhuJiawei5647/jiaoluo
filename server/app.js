const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const http = require('http').createServer(app)

MongoClient.connect("mongodb://localhost:27017/jiaoluo", function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  db.close();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function (req, res, next) {
	console.log(req.baseURL)
	console.log(req.path)
	console.log(req.query)
	console.log('123')
	next()
})

app.post('/url', (req, res) => {
	console.log(req.body)
	console.log(req.query)
	res.send('ok')
})
app.get('/', (req, res) => {
	res.send('Hello Word')
})

const wechat_route = require('./wechat/route.js');
app.use('/wechat', wechat_route);

http.listen(8080, () => console.log('port :: 80'));