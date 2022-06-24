# 코딩애플 JS 강의
## Level 1 
### 6강 서브메뉴 만들어보기와 classList 다루기

#### 부트스트랩 
- cdn   
link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"   
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>   
---
   
   
#### 탈부착 class 

- class명을 원하는 요소에 추가하는 법은   
&nbsp;&nbsp; 셀렉터로찾은요소.classList.add('클래스명') 이렇게 쓰면 됩니다.

- class명을 원하는 요소에서 제거하는 법은   
&nbsp;&nbsp; 셀렉터로찾은요소.classList.remove('클래스명') 이렇게 쓰면 됩니다.

<pre><code>
  var 어레이 = [7,3,5,2,40];

  var 새어레이 = 어레이.filter(function(a){
    return a < 4
  });
  console.log(새어레이);
</code></pre>   





