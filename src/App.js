import Home from "./pages/homepage/Home";
import Topbar from "./components/topbar/Topbar";
import { Single } from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context)
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/">
          <Route index element={user ? <Home /> : <Login />} />
          <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="register" element={user ? <Navigate to="/"/> : <Register />}></Route>
          <Route path="write" element={user ? <Write /> : <Register />}></Route>
          <Route path="post/:postId" element={user ?  <Single /> :<Navigate to="/login"/> }></Route>
          <Route path="settings" element={user ? <Settings /> : <Register />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
