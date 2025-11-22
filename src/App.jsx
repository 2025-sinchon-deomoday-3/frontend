import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  matchPath,
} from "react-router-dom";
import "./App.css";
//Layout
import MainLayout from "./layouts/MainLayout";
import UploadLayout from "./layouts/UploadLayout";
import BackLayout from "./layouts/BackLayout";
//Home
import HomePage from "./pages/HomePage";
//Login, Signup, Profile
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
//Scrapbook
import ScrapbookPage from "./pages/ScrapbookPage";
//Accountbook
import AccountbookPage from "./pages/AccountbookPage";
//AcctSummary
import AcctSummaryLoading from "./pages/AcctSummaryLoading";
import AcctSummaryComplete from "./pages/AcctSummaryComplete";
import AcctSummaryProfileData from "./pages/AcctSummaryProfileData";
import AcctSummaryPage from "./pages/AcctSummaryPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* NavTopbar(네비게이션) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />{" "}
            {/* 기본 경로를 /home으로 리다이렉트 */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/scrapbook" element={<ScrapbookPage />} />
          </Route>

          {/* UploadTopbar(뒤로가기+게시하기) */}
          <Route element={<UploadLayout />}>
            <Route path="/accountbook" element={<AccountbookPage />} />
          </Route>

          {/* BackTopbar(뒤로가기) */}
          <Route element={<BackLayout />}>
            <Route
              path="/summaries/profile"
              element={<AcctSummaryProfileData />}
            />
          </Route>

          {/* Topbar X */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 가계부 요약본 */}
          <Route path="/summaries/loading" element={<AcctSummaryLoading />} />
          <Route path="/summaries/complete" element={<AcctSummaryComplete />} />
          <Route path="/summaries/snapshot" element={<AcctSummaryPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
