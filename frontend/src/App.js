import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import LandingPage from "./pages/landingPage.jsx";
import Authentication from "./pages/authentication.jsx";
import VideoMeet from "./pages/videoMeet.jsx";
import HomeComponent from "./pages/home.jsx";
import History from "./pages/history.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/history" element={<History />} />
          <Route path="/:url" element={<VideoMeet />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
