import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Club from "./pages/Club.jsx";
import Executives from "./pages/Executives.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Monthly from "./pages/Monthly.jsx";
import MonthlyDetail from "./pages/MonthlyDetail.jsx";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isMonthlyDetail = location.pathname.startsWith("/monthly/");

  return (
    <div className={`relative flex-1 flex flex-col ${!isHome ? "bg-black/60" : ""}`}>
      {!isMonthlyDetail && <Navbar />}
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/club" element={<Club />} />
          <Route path="/executives" element={<Executives />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/monthly" element={<Monthly />} />
          <Route path="/monthly/:id" element={<MonthlyDetail />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
