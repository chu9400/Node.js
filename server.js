const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: true}))


app.listen(8080, function() {
    console.log('listening on 8080');
});

app.get('/pet', function(요청, 응답) {
    응답.send('펫샵입니다.');
});

app.get('/beauty',function(req, res) {
    res.send('뷰티샵입니다');
});
app.get('/',function(요청, 응답) {
    응답.sendFile(__dirname + '/index.html');
});
app.get('/write',function(요청, 응답) {
    응답.sendFile(__dirname + '/write.html');
});

app.post('/add',function(요청, 응답) {
    응답.send('전송완료');
    console.log(요청.body);
});