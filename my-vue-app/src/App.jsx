import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import Home from "./pages/home/Home";

function App() {
  // const { authUser } = useAuthContext();
  var authUser=true;
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          // element={authUser ? <Home /> : <Navigate to={"/login"} />}
          element={<Home />}
        />
        <Route
          path="/login"
          // element={authUser ? <Navigate to="/" /> : <Login />}
          element={<Login />}
        />
        <Route
          path="/signup"
          // element={authUser ? <Navigate to="/" /> : <SignUp />}
          element={ <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;