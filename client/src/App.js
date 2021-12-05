import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import NotFound from "./components/notfound";
import NavBar from "./components/navbar";
import { PostDetails } from "./components/postdetails";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/posts/:id" element={<PostDetails />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
