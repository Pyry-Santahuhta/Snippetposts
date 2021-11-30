import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import NotFound from "./components/notfound";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Stäkoverflou</h1>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
