const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: true}))

var db;

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://admin:1324@cluster0.xlqugu9.mongodb.net/?retryWrites=true&w=majority', function(에러, client) {
    if(에러) {return console.log('에러')}
    db = client.db('todoapp');

    db.collection('post').insertOne({_id : 2, title : '제목', date : 2022}, function(에러, 결과) {
        console.log('저장완료');
    });

    app.listen(8080, function() {
        console.log('SUCCESS');
    });
});





app.get('/',function(요청, 응답) {
    응답.sendFile(__dirname + '/index.html');
});
app.get('/write',function(요청, 응답) {
    응답.sendFile(__dirname + '/write.html');
});

// app.post('/add',function(요청, 응답) {
//     응답.send('전송완료');
//     console.log(요청.body);
// });