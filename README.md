# 코딩애플 Node.js 강의   
# Setting
 - git_start.txt : 깃 저장소 연결   
 - node_start.txt : node.js 및 라이브러리 설치
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
그 후 server.js 상단에 추가   
const bodyParser= require('body-parser')   
app.use(bodyParser.urlencoded({extended: true}))
그러나   
하지만 2021년 이후로 설치한 프로젝트들은 body-parser 라이브러리가 express에 기본 포함되어있어서   
따로 npm으로 설치할 필요가 없습니다.   
app.use(express.urlencoded({extended: true}))   
이 코드만 추가 해주면 됨ㅋ   

---   


   
   
#### 탈부착 class 

- class명을 원하는 요소에 추가하는 법은   
&nbsp;&nbsp; 셀렉터로찾은요소.classList.add('클래스명') 이렇게 쓰면 됩니다.

- class명을 원하는 요소에서 제거하는 법은   
&nbsp;&nbsp; 셀렉터로찾은요소.classList.remove('클래스명') 이렇게 쓰면 됩니다.

<pre><code>

</code></pre>   





