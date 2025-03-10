import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyAds from "./pages/MyAds";
import Favorites from "./pages/Favorites";
import CreateAd from "./pages/CreateAd";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/meins" element={<MyAds />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create-ad" element={<CreateAd />} />
      </Routes>
    </Router>
  );
}

export default App;
