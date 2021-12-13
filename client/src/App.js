import { Routes, Route } from "react-router-dom";
import Login from "./components/authenthication/Login";
import Register from "./components/authenthication/Register";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/NotFound";
import NavBar from "./components/Navbar";
import PostDetails from "./components/postDetails/PostDetails";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/materialui/Theme";
import { Box } from "@mui/system";

//The main app component
//All of the react routes are specified in this component.
function App() {
  return (
    //Setting the theme for the whole app by wrapping the main box in a themeprovider
    <ThemeProvider theme={theme}>
      {/*Box that holds the whole page. 
      The background color is set here.*/}
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
