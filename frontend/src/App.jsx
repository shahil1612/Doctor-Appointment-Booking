import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import CustomToaster from "./components/ui/CustomToaster";

function App() {
  return (
    <Router>
      <CustomToaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
