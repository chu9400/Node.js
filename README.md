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

 

 

#### 1. Uniform Interface

인터페이스는 일관성이 있어야한다는 소리가... 뭔소리냐면 

- 하나의 URL로는 하나의 데이터를 가져와야함 (하나를 가져오기 위한 두개의 URL을 만들지 말자)

- 간결하고 예측가능하게 짜세요 (URL 하나를 알면 둘을 알게)

- URL 이름짓기 관습을 잘 따라주세요

이름짓기 관습이 뭔지는 밑에 가서 더 알아보도록 합시다. 

 

(참고)

다른 곳에서 URL 대신 URI 이런 용어를 많이 쓰기도 하는데 

URI는 자료를 넘버링하고 분류하고 지칭하는 방법이라 보시면 됩니다. URL과 비슷하지만 조금 더 큰 의미입니다. 도서관에서 책 분류할 때 URI에 의해서 분류하기도 합니다. 

 

#### 2. Client-server 역할 구분하기

고객들은 그냥 URL 하나만 알면 서버에 있는 자료를 갖다쓸 수 있습니다. 

고객에게 서버역할을 맡기거나

고객에게 DB에 있는 자료를 직접 꺼내라고 하든지 그런 식으로 코드를 짜시면 안됩니다. 

 

#### 3. Stateless

요청들은 각각 독립적으로 처리되어야합니다. 

요청1이 성공해야 요청2를 보내주고 그런 식으로 요청간의 의존성이 존재하는 코드를 짜시면 안됩니다. 

다르게 말하면

요청하나 만으로 자료를 가져오기 충분하도록 

요청에 필요한 모든 정보들을 실어 보내는게 좋다는 뜻이겠죠? 

 

#### 4. Cacheable

요청을 통해 보내는 자료들은 캐싱이 가능해야합니다.

그리고 캐싱가능하다고 표시하거나 캐싱 기간을 설정해주어야 한다고 합니다.

 

* 캐싱이뭐냐면

네이버를 방문하면 크롬 브라우저는 자동으로 자주 사용하는 이미지 파일, CSS 파일 등을 하드에 저장해놓습니다. 

별로 바뀔일 없는 네이버 로고나 아이콘 같은거요.

하드에 저장해놓고 네이버 방문할 때 네이버서버에 네이버 로고주세요~라고 요청하지 않고 하드에서 불러옵니다.

이 행위를 캐싱이라고 합니다. 

 

#### 5. Layered System

요청처리하는곳, DB에 저장하는곳 이런 여러가지 단계를 거쳐서 요청을 처리해도 됩니다.

멋있게 말하면 여러개의 레이어를 거쳐서 요청을 처리하게 만들어도 된다고 합니다.

우리도 그렇게 할 것입니다.

 

#### 6. Code on Demand

서버는 고객에게 실제 실행가능한 코드를 전송해줄 수도 있습니다. 

 

 

 

URL 이름짓기 관습

 

instagram.com/explore/tags/kpop
instagram.com/explore/tags/food
facebook.com/natgeo/photos
facebook.com/bbc/photos

이 URL들은 페이스북이 매우 잘 만든 API입니다. 왜냐면

facebook.com/bbc/photos 이거 딱봐도 BBC뉴스 페북계정의 사진첩인 느낌이 들지 않습니까. 한눈에 딱 보입니다.

 

- 단어들을 동사보다는 명사 위주로 구성함

- 응용해서 다른 정보들을 쉽게 가져올 수 있을 정도로 일관성 있음 

- 대충 봐도 어떤 정보가 들어올지 예측이 가능함 

 

정리하면 이런 특징을 가지고 있는데 여러분도 따라하십시오. 

 

이외에도 이름을 잘 지을 수 있는 방법은

- 띄어쓰기는 언더바_대신 대시-기호-사용

- 파일 확장자 쓰지 말기 (.html 이런거)

- 하위 문서들을 뜻할 땐 / 기호를 사용함 (하위폴더같은 느낌)

여러가지가 있습니다. 이것만 잘 지켜주시면 예쁜 서버 API들이 완성됩니다. 

 

 

예를 들면 우리가 지금까지 만든 서버API 중에

/add로 POST 요청을 하면 ~해주세요 

이런 API 있었죠?

그런데 이걸 /newpost로 POST 요청을 하면 ~해주세요  뭐 이런식으로 명사로 바꾸면 조금 더 REST 해지겠네요.

---   

   
   

&nbsp;&nbsp; 셀렉터로찾은요소.classList.remove('클래스명') 이렇게 쓰면 됩니다.

<pre><code>

</code></pre>   





