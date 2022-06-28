# 코딩애플 Node.js 강의   
# Setting
 - git_start.txt : 깃 저장소 연결 방법   
 - node_start.txt : node.js 및 라이브러리 설치 방법   
 - 부트스트랩 설치 : https://getbootstrap.kr/docs/5.1/getting-started/introduction/ 
    여기 들어가서 스타트 템플렛 복붙.

 - 서버 시작은 하는법 : 터미널키고 "node server.js" 엔터   
 혹은 "nodemon server.js" 엔터

## Level 1 
### 폼에 입력한 데이터를 서버에 전송하는 법 (POST요청)



<pre><code>

 app.post('/경로',function(요청, 응답) {
    응답.send('전송완료');
});

</code></pre>   
   
### body-parser 설치   
- app.post()할 때 요청 값(POST)를 쉽게 가져오기 위해 바디파서 설치.   
터미널에 : npm install body-parser  엔터   
그 후 server.js 파일 안 상단에 아래 코드 추가   
<pre><code>

const bodyParser= require('body-parser')   
app.use(bodyParser.urlencoded({extended: true}))

</code></pre> 

하지만 2021년 이후로 설치한 프로젝트들은 body-parser 라이브러리가 express에 기본 포함되어있어서   
따로 npm으로 설치할 필요가 없습니다.   

app.use(express.urlencoded({extended: true}))   

이 코드만 추가 해주면 됨ㅋ   

---   

### API란?   


Application Programming Interface라는 어려운 용어인데 실은 별거 아닙니다. 

서로 다른 프로그램간에 소통할 수 있게 도와주는 통신 규약을 뜻합니다. 

근데 이걸 웹에서 사용하면 

'서버와 고객간의 통신 규약'을 뜻합니다. 조금 더 쉽게 풀어말하면

'서버에게 요청해서 데이터 가져오는 방법' 이 바로 API입니다.   

 

여러분 지금까지 짠 코드가 

"누군가 /write로 접속하면 write.html을 보내주세요" 

같은 거였는데 바로 이게 서버의 API입니다. 여러분 서버랑 통신할 수 있는 방법이니까요. 

write.html을 보고싶으면 /write로 접속하라는 API를 정의하고 계셨던 것입니다.   

 

REST API는 무엇인가

Representational State Transfer 라는 뜻인데 그냥 어떤 아조씨가 주장하는 API 디자인 방법입니다.

그런데 유명해져서 요즘은 거의 정론이 되었지만요. 

이 아저씨가 말하길

"웹 API 짤 때 REST 원칙을 지켜서 짜면 좋아요 오호홍"

이라고 하는데 총 6개의 원칙이 있습니다. 

더 자세한 건 api_6.txt
 

 



---   

### MongoDB에서 데이터를 꺼내고 싶다면 
<pre><code>
(server.js)


app.get('/list', function(요청, 응답){
  db.collection('post').find().toArray(function(에러, 결과){
    console.log(결과)
    응답.render('list.ejs', { posts : 결과 })
  })
})
</code></pre>   

- .find().toArray() 라고 적으시면 collection('post')에 있는 모든 데이터를 Array 자료형으로 가져옵니다. 

### 데이터를 list.ejs 파일에 보내고 싶다면?   
 응답.render('list.ejs', { posts : 결과 })     

 .render()라는 함수에 둘째 파라미터를 요로케 적어주시면 
list.ejs 파일을 렌더링함과 동시에 {posts: 결과} 라는 데이터를 함께 보내줄 수 있습니다.
(정확히 말하면 결과라는 데이터를 posts 라는 이름으로 ejs 파일에 보내주세요~ 입니다)

### 데이터로 EJS 파일 꾸미기(php 처럼 쓰면 됨)

<pre><code>
 (views/list.ejs)
 

   <% for(var i = 0; i < posts.length; i++) { %>
      <h4>할 일 제목 : <%= posts[i].title %></h4>
      <p>마감날짜 : <%= posts[i].date %></p>
   <% } %>  

</code></pre>   

### 코드 이해하기

<pre><code>
   app.post('/add', function(요청, 응답){
   db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과){
      var 총게시물갯수 = 결과.totalPost;
      db.collection('post').insertOne( { _id : (총게시물갯수 + 1), 제목 : 요청.body.title, 날짜 : 요청.body.date } , function(){
         console.log('저장완료')
         응답.send('전송완료');
      });
   });
   });
</code></pre>   

이런 긴 코드는 무슨 예술작품처럼 한눈에 보고 이해하려하시면 안됩니다.

위에서 부터 한줄한줄 읽어나가셔야합니다.
1번줄 : 누군가 /add 경로로 post 요청을 하면   

2번줄 : counter라는 콜렉션에서 총게시물갯수 저장해놓은 문서를 찾습니다. 그 찾은 문서는 결과라는 변수에 담겨옵니다.   

3번줄 : 결과.totalPost하면 총게시물 갯수가 뿅하고 출현합니다. 그걸 var 총게시물갯수 변수에 저장해서 사용합니다.   

4번줄 : 이제 글저장 시간입니다. post라는 콜렉션에 insertOne을 이용해 게시물을 추가합니다. 추가할 때 _id를 var 총게시물갯수를 이용해 제대로 부여해줍니다.   

6번줄 : 성공했다고 응답.send로 브라우저에게 글자를 보냅니다. 응답.render, 응답.redirect 이런 것도 이용가능합니다.   

근데 뭔가 하나의 기능이 빠져있습니다.

4번줄에서 글을 잘 발행했다면...

counter라는 콜렉션 내의 'totalPost'라는 값도 1 증가시켜야하겠는데요?

(totalPost가 총게시물갯수 세는 역할이라면서요.)

그러면 어떻게 하는지 다음 시간에 알아보도록 합시다. 






&nbsp;&nbsp; 

<pre><code>
</code></pre>  




