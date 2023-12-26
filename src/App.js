import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
// import RequireAuth from "./components/RequireAuth";
// import Welcome from "./pages/Welcome";
import Chatbot from "./pages/Chatbot";
import Chat from "./components/Chat";
import ChatFiles from "./components/ChatFiles";
import Projects from "./components/Projects";
import Project from "./components/Project";
import ProjectCreate from "./components/ProjectCreate";
import Library from "./components/Library";
import ProjectEdit from "./components/ProjectEdit";
import RequireAuth from "./components/RequireAuth";


function App() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route element={<RequireAuth />} >
          {/* <Route index element={<Welcome />} /> */}
          <Route path="/" element={<Chatbot />} >
            <Route path="/chat-files" element={<ChatFiles />} />
            {/* project routes */}
            <Route path="/chatbot/:projectId" element={<Chat />} />
            <Route path="/projects" element={<Projects />} />
            <Route exact path="/projects/:projectId" element={<Project />} />
            <Route exact path="/projects/:projectId/edit" element={<ProjectEdit />} />
            <Route path="/projects/create" element={<ProjectCreate />} />
            {/* end project routes */}
            {/* library routes */}
            <Route path="/library" element={<Library />} />

            {/* end library routes */}
          </Route>
        </Route>
      </Route>
      {/* protected routes */}
      {/* </Route> */}
    </Routes>
  );
}

export default App;