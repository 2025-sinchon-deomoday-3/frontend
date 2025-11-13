import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, matchPath } from "react-router-dom";
import './App.css'
import MainLayout from './layouts/MainLayout';
import UploadLayout from './layouts/UploadLayout';
import BackLayout from './layouts/BackLayout';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* NavTopbar(네비게이션) */}
          <Route element={<MainLayout />}>
            {/* <Route path="/home" element={<HomePage />} /> */}
          </Route>

          {/* UploadTopbar(뒤로가기+게시하기) */}
          <Route element={<UploadLayout />}>
            {/* <Route path="/accountbook" element={<AccountbookPage/>} /> */}
          </Route>

          {/* BackTopbar(뒤로가기) */}
          <Route element={<BackLayout />}>
            {/* <Route path="/profile" element={<ProfilePage/>} /> */}
          </Route>

          {/* Topbar X */}
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
