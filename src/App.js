import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import Welcome from "./pages/Welcome";
import Chatbot from "./pages/Chatbot";
import Chat from "./components/Chat";
import ChatFiles from "./components/ChatFiles";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}

          <Route index element={<Welcome/>} />
          <Route path="/" element={<Chatbot/>} >
              <Route path="/chatbot" element={<Chat />} />
              <Route path="/chat-files" element={<ChatFiles />} />
          </Route>


        {/* end of public routes */}
        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>


          </Route>
        </Route>
        {/* protected routes */}
      </Route>
    </Routes>
  );
}

export default App;