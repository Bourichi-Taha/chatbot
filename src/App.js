import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Welcome from "./pages/Welcome";
import Chatbot from "./pages/Chatbot";
import Chat from "./components/Chat";
import ChatFiles from "./components/ChatFiles";
import Projects from "./components/Projects";
import Project from "./components/Project";
import ProjectCreate from "./components/ProjectCreate";
import { motion } from "framer-motion";
import Register from "./features/registration/Register";
import Login from './features/Login/Login';

function App() {
  const location = useLocation();

  return (
    <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
>
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Layout />}>
        {/* public routes */}

        <Route index element={<Welcome />} />
        <Route path="/" element={<Chatbot />} >
          <Route path="/chat-files" element={<ChatFiles />} />
          <Route path="/chatbot" element={<Chat />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectName" element={<Project />} />
          <Route path="/projects/create" element={<ProjectCreate />} />

        </Route>


        {/* end of public routes */}
        {/* protected routes */}
        {/* <Route element={<PersistLogin />}> */}
        <Route element={<RequireAuth />}>


        </Route>
      </Route>
      {/* protected routes */}
      {/* </Route> */}
    </Routes>
    </motion.div>
  );
}

export default App;