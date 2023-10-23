import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ChatPage from "@/components/chat/ChatPage";
import Modal from "./components/chat/Modal";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to={"/chat"} />} />
        <Route path="chat" element={<ChatPage />}>
          <Route path="addContact" element={<Modal />} />
          <Route path="editContact" element={<Modal />} />
          <Route path="deleteContact" element={<Modal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
