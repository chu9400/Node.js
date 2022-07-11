//express 연결
const express = require('express');
const { addListener } = require('nodemon');
const app = express();

//MongoDB 연결
const MongoClient = require('mongodb').MongoClient;
app.use(express.urlencoded({extended: true}))

//ejs 파일 호환되게 설치
app.set('view engine', 'ejs');

// 해당 경로를 퍼블릭하게 쓰겠다 선언
app.use('/public', express.static('public'));

// 메쏘드 오버라이드 설치
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


var db;

MongoClient.connect('mongodb+srv://admin:1324@cluster0.xlqugu9.mongodb.net/?retryWrites=true&w=majority', function(에러, client) {
    if(에러) {return console.log('에러')}
    db = client.db('todoapp');

    app.post('/add',function(요청, 응답) {
        응답.send('전송완료');
        db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과) {
            console.log(결과.totalPost);
            var 총게시물갯수 = 결과.totalPost;
            db.collection('post').insertOne({_id : 총게시물갯수, title : 요청.body.title, date : 요청.body.date}, function(에러, 결과) {
                console.log('저장 완료');
                db.collection('counter').updateOne({name:'게시물갯수'},{$inc : {totalPost:1}} );
            });
        });
    });

    app.listen(8080, function() {
        console.log('SUCCESS');
    });
});


app.get('/', function(요청, 응답){
    응답.render('index.ejs');
});
app.get('/write', function(요청, 응답){
    응답.render('write.ejs');
});


app.get('/list', function(요청, 응답) {

    db.collection('post').find().toArray(function(에러, 결과) {
        console.log(결과);
        응답.render('list.ejs', {posts : 결과});
    });

});


app.delete('/delete', function(요청, 응답){
    /* 요청.body._id = parseInt(요청.body._id); */
    db.collection('post').deleteOne(요청.body, function(에러, 결과){
      console.log('삭제완료')
    })
    응답.send('삭제완료')
  });


app.get('/detail/:id', function(요청, 응답){
    db.collection('post').findOne({_id : parseInt(요청.params.id) }, function(에러, 결과){
        응답.render('detail.ejs', {data : 결과} );
    })
  });

app.get('/edit/:id', function(요청, 응답){
  db.collection('post').findOne({ _id : parseInt(요청.params.id) }, function(에러, 결과){
    응답.render('edit.ejs', { post : 결과 })
  })
  
});


app.put('/edit', function(요청, 응답) {
    db.collection('post').updateOne({_id: parseInt(요청.body.id)}, {$set: {title : 요청.body.title, date : 요청.body.date}}, 
        function(에러, 결과) {
        console.log('수정 완료')
        console.log({_id: parseInt(요청.body.id)})

        응답.redirect('/list')
    })

})