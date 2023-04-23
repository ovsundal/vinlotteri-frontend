import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@equinor/eds-core-react";
import {
  BUTTON_NEW_LOTTERY,
  CALL_TO_ACTION,
  ROUTE_PARAMETER_LOTTERY_ID,
} from "../shared/constants";
import backendFacadeClientFunctions from "../services/backendFacadeClientFunctions";
import { NavigateFunction, useNavigate } from "react-router-dom";

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

  return (
    <OverviewWrapper>
      {CALL_TO_ACTION}
      <LotteryDetails lotteryDetails={lotteryDetails} />
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
