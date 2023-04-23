import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  BASE_URL,
  ROUTE_CONTEST,
  ROUTE_OVERVIEW,
  ROUTE_TICKETS,
} from "./shared/constants";
import WineLotteryLandingPage from "./components/WineLotteryLandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to={`/${BASE_URL}`} />} />
        <Route path={`${BASE_URL}`} element={<WineLotteryLandingPage />}>
          <Route
            index
            element={<Navigate replace to={`${ROUTE_OVERVIEW}`} />}
          />
          <Route path={`${ROUTE_OVERVIEW}`} element={<></>} />
          <Route path={`${ROUTE_TICKETS}`} element={<></>} />
          <Route path={`${ROUTE_CONTEST}`} element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
