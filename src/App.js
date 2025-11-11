import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loading from "./feature/Loading.js";
import ScrollTop from "./feature/ScrollTop.js";

const Home = lazy(() => import("./pages/Home.js"));
const AllJobs = lazy(() => import("./pages/AllJobs.js"));

function App() {
  return (
    <Router>
      <Suspense fallback={
        <div className="loading-container">
    <Loading />
        </div>
    }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllJobs />} />
        </Routes>
      </Suspense>
      
      <ScrollTop />
    </Router>
  );
}

export default App;
