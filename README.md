# React Router를 활용한 동물 검색 페이지

## 메인 페이지에서 동물 목록 화면에 표시하기

### React Router를 사용한 페이지 별 라우팅 과정

1. 터미널에 npm install react-router-dom 으로 React Router 라이브러리 설치
2. `main.jsx` 파일에 App 컴포넌트를 BrowserRouter로 감싸기

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

3. Route에 들어갈 컴포넌트들 만들어 기본 컴포넌트 코드 작성

4. `App.jsx` 파일에서 Routes, Route로 페이지 링크 연결

```jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main.jsx";
import Search from "./pages/Search.jsx";
import Detail from "./pages/Detail.jsx";

export default function App() {
  return (
    <>
      <header>
        <h1>💚 동물 조아 💚</h1>
      </header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <footer>all rights reserved to OZ</footer>
    </>
  );
}
```

### data.js 파일 내 데이터를 메인 페이지에 렌더링하는 방법

1. `data.js`안의 데이터를 import
2. `ul` 목록을 만들어 `map` 함수를 통해 배열의 데이터를 `li` 리스트로 출력

```jsx
import { data } from "../assets/data/data.js";

export default function Main() {
  return (
    <ul>
      {data.map((el) => (
        <li key={el.id}>
          <img src={el.img} alt={el.name} />
          <div>{el.name}</div>
        </li>
      ))}
    </ul>
  );
}
```

### 동물 카드 클릭 시 상세 페이지로 경로 이동 설정

메인 페이지에 상세 페이지 `Link`연결하기

```jsx
import { Link } from "react-router-dom"; // Link import
import { data } from "../assets/data/data.js";

export default function Main() {
  return (
    <ul>
      {data.map((el) => (
        <li key={el.id}>
          <Link to={`/detail/${el.id}`}>
            {" "}
            // id로 Link 연결
            <img src={el.img} alt={el.name} />
            <div>{el.name}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

## 동물 상세 정보 페이지 만들기

### 상세 페이지로 이동 시 특정 id값에 대한 데이터를 받아오는 방법

1. 상세 페이지로 이동 시 `:id`라는 이름으로 정보를 가져올 수 있게끔 `App.jsx` 파일 코드 수정

```jsx
<Route path="/detail/:id" element={<Detail />} /> // path에 :id 추가
```

2. `useParams()`로 `:id`에 해당하는 값을 객체로 가져옴

```jsx
import { useParams } from "react-router-dom";
import { data } from "../assets/data/data";

export default function Detail() {
  const params = useParams();
  console.log(params.id); // id 값 조회
  const animalData = data.find((el) => el.id === Number(params.id));
  console.log(animalData); // animalData 조회

  return (
    <section className="detail">
      <img src={animalData.img} alt={animalData.name} />
      <h2>{animalData.name}</h2>
      <div>{animalData.description}</div>
    </section>
  );
}
```

> **useParams란?**
> : 주소(URL)에 있는 값들을 객체로 반환해주는 리액트 훅(Hook)

## 동물 이름으로 검색 기능 만들기 & 검색 결과 페이지 생성하기

### useSearchParams를 사용하여 경로의 특정 값에 대한 데이터를 받아오는 방법

`useSearchParams()`로 쿼리스트링 값을 읽어와 param에 저장

```jsx
const [searchParams] = useSearchParams();
const param = searchParams.get("animal");
```

### useNavigate를 사용하여 경로를 이동하는 방법

1. `App.jsx`에서 입력창과 버튼 만들기
2. `useState()`로 입력 값을 실시간으로 관리
3. `useNavigate()`를 통해 입력 값 받아와서 경로로 이동하기

```jsx
import { useState } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  return (
    <header>
      <h1>💚 동물 조아 💚</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={() => navigate(`/search?animal=${inputValue}`)}>
        검색
      </button>
    </header>
  );
} // 코드가 길어서 변경 사항만 가져왔습니다.
```

### korean-regexp 라이브러리 개념

한국어 검색을 쉽게 할 수 있도록 도와주는 라이브러리

- 단순 문자열 비교가 가능(초성으로 검색 가능)

### 전체 데이터 목록에서 검색어로 필터링 된 데이터를 받아오는 방법

1. 가져온 쿼리스트링 값을 `getRegExp()`을 통해 정규식으로 생성
2. `filter()`함수로 data 배열의 name과 일치하는 것만 filterData 배열에 담음
3. `map()`함수로 filterData에 담긴 data를 화면에 반환

```jsx
import { Link, useSearchParams } from "react-router-dom";
import { data } from "../assets/data/data";
import { getRegExp } from "korean-regexp";

export default function Search() {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("animal");
  const reg = getRegExp(param);

  const filtereData = data.filter((el) => el.name.match(reg));
  return (
    <ul>
      {filtereData.map((el) => (
        <li key={el.id}>
          <Link to={`/detail/${el.id}`}>
            <img src={el.img} alt={el.name} />
            <div>{el.name}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

++라이브러리를 사용하지 않고 `includes()`로 필터링 하는 법

```jsx
const filtereData = data.filter((el) => el.name.includes(param));
```
