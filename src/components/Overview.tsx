import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@equinor/eds-core-react";
import {
  BUTTON_NEW_LOTTERY,
  CALL_TO_ACTION,
  ROUTE_PARAMETER_LOTTERY_ID,
} from "../shared/constants";
import backendFacadeClientFunctions from "../services/backendFacadeClientFunctions";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { isEmpty } from "lodash";

interface ILotteryDetails {
  availableTicketsInfo: string;
  lotteryIncomeInfo: string;
  spentOnPrizesInfo: string;
  ticketPriceInfo: string;
  totalBalanceInfo: string;
}
const Overview = () => {
  const [lotteryDetails, setLotteryDetails] = useState({} as ILotteryDetails);
  const navigate = useNavigate();
  const location = useLocation();

  useGetLotteryInstance(location, setLotteryDetails);

  const Content = () =>
    isEmpty(lotteryDetails) ? (
      <p>{CALL_TO_ACTION}</p>
    ) : (
      <LotteryDetails lotteryDetails={lotteryDetails} />
    );

  return (
    <OverviewWrapper>
      <Content />
      <Button
        onClick={() =>
          newLotteryButtonClickHandler(navigate, setLotteryDetails)
        }
      >
        {BUTTON_NEW_LOTTERY}
      </Button>
    </OverviewWrapper>
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

const newLotteryButtonClickHandler = (
  navigate: NavigateFunction,
  setLotteryDetails: React.Dispatch<React.SetStateAction<ILotteryDetails>>
) => {
  backendFacadeClientFunctions()
    .createNewLottery()
    .then((result) => {
      setLotteryDetails({ ...result });
      navigate({ search: `${ROUTE_PARAMETER_LOTTERY_ID}=${result.id}` });
    });
};

const LotteryDetails = ({
  lotteryDetails,
}: {
  lotteryDetails: ILotteryDetails;
}) => {
  const {
    ticketPriceInfo,
    availableTicketsInfo,
    spentOnPrizesInfo,
    lotteryIncomeInfo,
    totalBalanceInfo,
  } = lotteryDetails;
  return (
    <div>
      <p>{availableTicketsInfo}</p>
      <p>{ticketPriceInfo}</p>
      <p>{lotteryIncomeInfo}</p>
      <p>{spentOnPrizesInfo}</p>
      <SummationLines>{totalBalanceInfo}</SummationLines>
    </div>
  );
};

const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SummationLines = styled.p`
  border-top: 1px solid black;
  border-bottom: 3px double;
`;
export default Overview;
