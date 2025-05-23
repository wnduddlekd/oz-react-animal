import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main.jsx";
import Search from "./pages/Search.jsx";
import Detail from "./pages/Detail.jsx";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  return (
    <>
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
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <footer>all rights reserved to OZ</footer>
    </>
  );
}
