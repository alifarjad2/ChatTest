import "./App.css";
import Chat from "./components/Chat.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
