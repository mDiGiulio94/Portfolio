import React, { Suspense, lazy} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loading from "./feature/Loading.js";
import ScrollTop from "./feature/ScrollTop.js";
import ColorMode from "./feature/ColorMode.js";

const Home = lazy(() => import("./pages/Home.js"));
const AllJobs = lazy(() => import("./pages/AllJobs.js"));
const AdminConsole = lazy(() => import("./pages/AdminConsole.js"));
const AdminCode = lazy(() => import("./pages/AdminCode.js"));

const ProtectedRoute = ({ children }) => {
  const code = process.env.REACT_APP_SECRET_CODE;
  const accessCode = localStorage.getItem("token");

  if (!code) {
    return <Navigate to="/code-check" replace />;
  }

  const isAuthorized = accessCode === code;

  if (!isAuthorized) {
    return <Navigate to="/code-check" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <ColorMode />
      <Suspense fallback={
        <div className="loading-container">
    <Loading />
        </div>
    }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllJobs />} />
          <Route path="/code-check" element={<AdminCode />} />
           <Route
            path="/control-panel"
            element={
              <ProtectedRoute>
                <AdminConsole />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      
      <ScrollTop />
    </Router>
  );
}

export default App;
