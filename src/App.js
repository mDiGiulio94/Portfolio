import React, { Suspense, lazy, useState } from "react";
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

// inserire qui una rotta che conosco solo io protetta, questa rotta porterà ad una pagina di auth ma non collegata a firebase, l'accesso verrà permesso solo se si inseriscono le credenziali definite, o se riesco ad implemenatare una logica che generi un codice otp mandato via email vediamo
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(false);

const code = process.env.REACT_APP_SECRET_CODE;
const accessCode = localStorage.getItem("token")

  if(accessCode === code ){
    setUser(true)
  }
  if(!user){
    return <Navigate to="./code-check" />
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
          {/* <Route path="/control-panel" element={<AdminConsole />} /> */}
          <Route path="/code-check" element={<AdminCode />} />
           <Route
            path="/contol-panel"
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
