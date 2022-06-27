//express 연결
const express = require('express');
const { addListener } = require('nodemon');
const app = express();

//MongoDB 연결
const MongoClient = require('mongodb').MongoClient;
app.use(express.urlencoded({extended: true}))

//ejs 파일 호환되게 설치
app.set('view engine', 'ejs');

var db;

MongoClient.connect('mongodb+srv://admin:1324@cluster0.xlqugu9.mongodb.net/?retryWrites=true&w=majority', function(에러, client) {
    if(에러) {return console.log('에러')}
    db = client.db('todoapp');

    app.post('/add',function(요청, 응답) {
        응답.send('전송완료_f');
        db.collection('post').insertOne({ title : 요청.body.title, date : 요청.body.date}, function(에러, 결과) {

            console.log(요청.body.title);
            console.log(요청.body.date);
            console.log('전송완료_b');
        });
    });

    app.post('/add', function(요청, 응답) {
        응답.send('전송 완료');
        db.collection('post').insertOne({title : 요청.body.title , date : 요청.body.date}, function(에러, 결과) {
            console.log('전송완료_');
        }  );

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

app.get('/list', function(요청, 응답) {

    db.collection('post').find().toArray(function(에러, 결과) {
        console.log(결과);
        응답.render('list.ejs', {posts : 결과});
    });

});
