import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import {
  MAIN_TITLE_WINE_LOTTERY_APPLICATION,
  TAB_BUY_TICKETS,
  TAB_DRAW_WINNERS,
  TAB_OVERVIEW,
} from "../constants";
import { Tabs } from "@equinor/eds-core-react";
import Overview from "./Overview";
import Tickets from "./Tickets";
import Contest from "./Contest";

const WineLotteryLandingPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <WineLotteryLandingPageWrapper>
      <h2>{MAIN_TITLE_WINE_LOTTERY_APPLICATION}</h2>
      <TabComponent activeTab={activeTab} handleChange={handleChange} />
      <Outlet />
    </WineLotteryLandingPageWrapper>
  );
};

const TabComponent = ({
  activeTab,
  handleChange,
}: {
  activeTab: number;
  handleChange: (index: number) => void;
}) => (
  <Tabs activeTab={activeTab} onChange={handleChange}>
    <Tabs.List>
      <Tabs.Tab>{TAB_OVERVIEW}</Tabs.Tab>
      <Tabs.Tab>{TAB_BUY_TICKETS}</Tabs.Tab>
      <Tabs.Tab>{TAB_DRAW_WINNERS}</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panels>
      <Tabs.Panel>
        <Overview />
      </Tabs.Panel>
      <Tabs.Panel>
        <Tickets />
      </Tabs.Panel>
      <Tabs.Panel>
        <Contest />
      </Tabs.Panel>
    </Tabs.Panels>
  </Tabs>
);

const WineLotteryLandingPageWrapper = styled.div``;

export default WineLotteryLandingPage;
