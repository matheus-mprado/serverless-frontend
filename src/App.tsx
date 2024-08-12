import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import LoginCallback from "./screens/LoginCallback";
import Dashboard from "./screens/Dashboard";

function App() {
  const idToken = localStorage.getItem("accessToken");

  return (
    <BrowserRouter>
      <Routes>
        {idToken ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path="/callback" element={<LoginCallback />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
