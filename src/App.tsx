import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BASE_URL } from "./constants";
import WineLotteryLandingPage from "./components/WineLotteryLandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to={`/${BASE_URL}`} />} />
        <Route
          path={`${BASE_URL}`}
          element={<WineLotteryLandingPage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
