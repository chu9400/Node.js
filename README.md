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
   


&nbsp;&nbsp; 

<pre><code>

</code></pre>   





