import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import NotFound from "./components/notfound";
import NavBar from "./components/navbar";
import PostDetails from "./components/postdetails";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/materialui/theme";
import { Box } from "@mui/system";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "primary.background",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/posts/:id" element={<PostDetails />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
