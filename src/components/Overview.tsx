import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@equinor/eds-core-react";
import { BUTTON_NEW_LOTTERY, CALL_TO_ACTION } from "../shared/constants";
import backendFacadeClientFunctions from "../services/backendFacadeClientFunctions";
interface ILotteryDetails {
  availableTicketsInfo: string;
  lotteryIncomeInfo: string;
  spentOnPrizesInfo: string;
  ticketPriceInfo: string;
  totalBalanceInfo: string;
}
const Overview = () => {
  const [lotteryDetails, setLotteryDetails] = useState({} as ILotteryDetails);
  const newLotteryButtonClickHandler = () => {
    backendFacadeClientFunctions()
      .createNewLottery()
      .then((result) => {
        setLotteryDetails({ ...result });
      });
  };

  return (
    <OverviewWrapper>
      {CALL_TO_ACTION}
      <LotteryDetails lotteryDetails={lotteryDetails} />
      <Button onClick={newLotteryButtonClickHandler}>
        {BUTTON_NEW_LOTTERY}
      </Button>
    </OverviewWrapper>
  );
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
