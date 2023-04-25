import React, { useEffect, useState } from "react";
import {
  Location,
  NavigateFunction,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import {
  BASE_URL,
  INVALID_TAB_ERROR,
  MAIN_TITLE_WINE_LOTTERY_APPLICATION,
  ROUTE_CONTEST,
  ROUTE_OVERVIEW,
  ROUTE_PARAMETER_LOTTERY_ID,
  ROUTE_TICKETS,
  TAB_BUY_TICKETS,
  TAB_DRAW_WINNERS,
  TAB_OVERVIEW,
} from "../shared/constants";
import { Tabs } from "@equinor/eds-core-react";
import { TabCategory } from "../shared/enums";
import backendFacadeClientFunctions from "../services/backendFacadeClientFunctions";
import { ILotteryDetails } from "../interfaces/ILotteryDetails";

const WineLotteryLandingPage = () => {
  const [lotteryInstance, setLotteryInstance] = useState({} as ILotteryDetails);
  const [activeTab, setActiveTab] = useState(TabCategory.TAB_OVERVIEW);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case `/${BASE_URL}/${ROUTE_OVERVIEW}`: {
        setActiveTab(TabCategory.TAB_OVERVIEW);
        break;
      }
      case `/${BASE_URL}/${ROUTE_TICKETS}`: {
        setActiveTab(TabCategory.TAB_BUY_TICKETS);
        break;
      }
      case `/${BASE_URL}/${ROUTE_CONTEST}`: {
        setActiveTab(TabCategory.TAB_DRAW_WINNERS);
        break;
      }
      default: {
        setActiveTab(TabCategory.TAB_OVERVIEW);
      }
    }
  }, [location.pathname]);
  useGetLotteryInstance(location, setLotteryInstance);

  const newLotteryClickHandler = newLotteryButtonClickHandler(
    navigate,
    setLotteryInstance
  );

  const handleChange = (index: number, location: Location) => {
    switch (index) {
      case TabCategory.TAB_OVERVIEW: {
        navigate({
          pathname: ROUTE_OVERVIEW,
          search: location.search,
        });
        setActiveTab(TabCategory.TAB_OVERVIEW);
        break;
      }
      case TabCategory.TAB_BUY_TICKETS: {
        navigate({
          pathname: ROUTE_TICKETS,
          search: location.search,
        });
        setActiveTab(TabCategory.TAB_BUY_TICKETS);
        break;
      }
      case TabCategory.TAB_DRAW_WINNERS: {
        navigate({
          pathname: ROUTE_CONTEST,
          search: location.search,
        });
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
      <TabComponent
        activeTab={activeTab}
        handleChange={(index) => handleChange(index, location)}
      />
      <Outlet context={{ lotteryInstance, newLotteryClickHandler }} />
    </WineLotteryLandingPageWrapper>
  );
};

const useGetLotteryInstance = (
  location: Location,
  setLotteryDetails: React.Dispatch<React.SetStateAction<ILotteryDetails>>
) => {
  useEffect(() => {
    const getLotteryInstanceById = async (lotteryId: number) => {
      const lotteryInstance =
        await backendFacadeClientFunctions().getLotteryById(lotteryId);

      setLotteryDetails({ ...lotteryInstance });
    };

    const lotteryId = new URLSearchParams(location?.search).get(
      ROUTE_PARAMETER_LOTTERY_ID
    );

    if (lotteryId && parseInt(lotteryId)) {
      getLotteryInstanceById(parseInt(lotteryId));
    }
  }, []);
};

const newLotteryButtonClickHandler =
  (
    navigate: NavigateFunction,
    setLotteryInstance: React.Dispatch<React.SetStateAction<ILotteryDetails>>
  ) =>
  () => {
    backendFacadeClientFunctions()
      .createNewLottery()
      .then((result) => {
        setLotteryInstance({ ...result });
        navigate({ search: `${ROUTE_PARAMETER_LOTTERY_ID}=${result.id}` });
      });
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
  </Tabs>
);

const WineLotteryLandingPageWrapper = styled.div``;

export default WineLotteryLandingPage;
