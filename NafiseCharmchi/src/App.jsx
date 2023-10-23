import Sidebar from "../src/components/sidebar";
import ChatBox from "./components/chatBox";

const App = () => {
  return (
    <div className="flex">
      {localStorage.token ? <Sidebar />  : "notLogin!"}
      <ChatBox />
    </div>
  );
};
export default App;
