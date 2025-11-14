import React, { Suspense, lazy } from "react";
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
const AdminConsole = lazy(() => import("./pages/AdminConsole.js"))

// inserire qui una rotta che conosco solo io protetta, questa rotta porterà ad una pagina di auth ma non collegata a firebase, l'accesso verrà permesso solo se si inseriscono le credenziali definite, o se riesco ad implemenatare una logica che generi un codice otp mandato via email vediamo

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
          <Route path="/control-panel" element={<AdminConsole />} />
        </Routes>
      </Suspense>
      
      <ScrollTop />
    </Router>
  );
}

export default App;
