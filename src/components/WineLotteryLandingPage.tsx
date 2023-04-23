import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  INVALID_TAB_ERROR,
  MAIN_TITLE_WINE_LOTTERY_APPLICATION,
  ROUTE_CONTEST,
  ROUTE_OVERVIEW,
  ROUTE_TICKETS,
  TAB_BUY_TICKETS,
  TAB_DRAW_WINNERS,
  TAB_OVERVIEW,
} from "../shared/constants";
import { Tabs } from "@equinor/eds-core-react";
import Overview from "./Overview";
import Tickets from "./Tickets";
import Contest from "./Contest";
import { TabCategory } from "../shared/enums";

const WineLotteryLandingPage = () => {
  const [activeTab, setActiveTab] = useState(TabCategory.TAB_OVERVIEW);
  const navigate = useNavigate();

  const { overview: topic } = useParams();

  useEffect(() => {
    switch (topic) {
      case ROUTE_OVERVIEW: {
        setActiveTab(TabCategory.TAB_OVERVIEW);
        break;
      }
      case ROUTE_TICKETS: {
        setActiveTab(TabCategory.TAB_BUY_TICKETS);
        break;
      }
      case ROUTE_CONTEST: {
        setActiveTab(TabCategory.TAB_DRAW_WINNERS);
        break;
      }
      default: {
        throw new Error(INVALID_TAB_ERROR);
      }
    }
  }, [topic]);

  const handleChange = (index: number) => {
    switch (index) {
      case TabCategory.TAB_OVERVIEW: {
        navigate(ROUTE_OVERVIEW);
        setActiveTab(TabCategory.TAB_OVERVIEW);
        break;
      }
      case TabCategory.TAB_BUY_TICKETS: {
        navigate(ROUTE_TICKETS);
        setActiveTab(TabCategory.TAB_BUY_TICKETS);
        break;
      }
      case TabCategory.TAB_DRAW_WINNERS: {
        navigate(ROUTE_CONTEST);
        setActiveTab(TabCategory.TAB_DRAW_WINNERS);
        break;
      }
      default:
        throw new Error(INVALID_TAB_ERROR);
    }
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
