import React from "react";
import { ILotteryOutletContext } from "../interfaces/ILotteryOutletContext";
import { useOutletContext } from "react-router-dom";
import { isEmpty } from "lodash";
import styled from "styled-components";
// @ts-ignore
import wine1Image from "../images/wine1.png";
import {
  BUTTON_DRAW_NEXT_WINNER,
  CONTEST_CALL_TO_ACTION,
  CONTEST_FINISHED,
  CONTEST_NEXT_PRIZE,
  CONTEST_WINNER,
} from "../shared/constants";
import { Button } from "@equinor/eds-core-react";

const Contest = () => {
  const { lotteryInstance, newDrawWinnerClickHandler }: ILotteryOutletContext =
    useOutletContext();

  const awardId = lotteryInstance.nextWineToAward?.id;

  if (isEmpty(lotteryInstance)) {
    return null;
  }
  return (
    <ContestWrapper>
      <h2>{CONTEST_CALL_TO_ACTION}</h2>
      <WineDisplayWrapper>
        {lotteryInstance.wines.map((wine) => (
          <WineInstanceWrapper key={wine.id}>
            <p>
              {wine.wonBy !== "" ? (
                `${CONTEST_WINNER} ${wine.wonBy}`
              ) : (
                <span>&nbsp;</span>
              )}
            </p>
            <img src={wine1Image} alt={"wine"} />
            <h5>{wine.name}</h5>
            <p>{wine.price},-</p>
          </WineInstanceWrapper>
        ))}
      </WineDisplayWrapper>
      <h3>
        {awardId == null ? CONTEST_FINISHED : CONTEST_NEXT_PRIZE}
        {lotteryInstance.nextWineToAward?.name}
      </h3>
      <Button
        disabled={awardId == null}
        onClick={() => newDrawWinnerClickHandler(awardId as number)}
      >
        {BUTTON_DRAW_NEXT_WINNER}
      </Button>
    </ContestWrapper>
  );
};

const WineDisplayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 15px;
  margin-bottom: 50px;

  img {
    height: 80px;
    margin-right: 10px;
  }
  h5 {
    margin-bottom: -10px;
  }
`;

const WineInstanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Contest;
