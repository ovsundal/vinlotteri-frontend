import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  BASE_URL,
  ROUTE_CONTEST,
  ROUTE_OVERVIEW,
  ROUTE_TICKETS,
} from "./shared/constants";
import WineLotteryLandingPage from "./components/WineLotteryLandingPage";
import Overview from "./components/Overview";
import Tickets from "./components/Tickets";
import Contest from "./components/Contest";

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
          <Route path={`${ROUTE_OVERVIEW}`} element={<Overview />} />
          <Route path={`${ROUTE_TICKETS}`} element={<Tickets />} />
          <Route path={`${ROUTE_CONTEST}`} element={<Contest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
