import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loading from "./shared/components/Loading";
import ScrollTop from "./shared/components/ScrollTop";

const Home = lazy(() => import("./pages/Home.js"));

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
        </Routes>
      </Suspense>
      
      <ScrollTop />
    </Router>
  );
}

export default App;
