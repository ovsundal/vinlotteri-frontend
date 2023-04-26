import React from "react";
import { ILotteryOutletContext } from "../interfaces/ILotteryOutletContext";
import { useOutletContext } from "react-router-dom";
import { isEmpty } from "lodash";
import styled from "styled-components";
// @ts-ignore
import wine1Image from "../images/wine1.png";
const Contest = () => {
  const { lotteryInstance }: ILotteryOutletContext = useOutletContext();

  if (isEmpty(lotteryInstance)) {
    return null;
  }
  return (
    <div>
      <h2>Wine you can win today!</h2>
      <WineDisplayWrapper>
        {lotteryInstance.wines.map((wine) => (
          <WineInstanceWrapper>
            <img src={wine1Image} alt={"wine"} />
            <h5>{wine.name}</h5>
            <p>{wine.price},-</p>
          </WineInstanceWrapper>
        ))}
      </WineDisplayWrapper>
    </div>
  );
};

const WineDisplayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
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
`;

export default Contest;
