import React from "react";
import styled from "styled-components";
import { Button } from "@equinor/eds-core-react";
import { BUTTON_NEW_LOTTERY, CALL_TO_ACTION } from "../shared/constants";
import { useOutletContext } from "react-router-dom";
import { isEmpty } from "lodash";
import { ILotteryOutletContext } from "../interfaces/ILotteryOutletContext";
import { ILotteryDetails } from "../interfaces/ILotteryDetails";

const Overview = () => {
  const { lotteryInstance, newLotteryClickHandler }: ILotteryOutletContext =
    useOutletContext();

  return (
    <OverviewWrapper>
      <Content lotteryDetails={lotteryInstance} />
      <Button onClick={newLotteryClickHandler}>{BUTTON_NEW_LOTTERY}</Button>
    </OverviewWrapper>
  );
};

const Content = ({ lotteryDetails }: { lotteryDetails: ILotteryDetails }) =>
  isEmpty(lotteryDetails) ? (
    <p>{CALL_TO_ACTION}</p>
  ) : (
    <LotteryDetails lotteryDetails={lotteryDetails} />
  );

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
