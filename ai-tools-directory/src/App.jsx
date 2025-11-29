// src/App.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ToolPage from "./pages/ToolPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tools/:slug" element={<ToolPage />} />
    </Routes>
  );
}
