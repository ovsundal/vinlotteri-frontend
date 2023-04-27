import { IWineLotteryClientFunctions } from "../interfaces/IWineLotteryClientFunctions";
import {
  BACKEND_ENDPOINT_BUY_TICKET,
  BACKEND_ENDPOINT_CREATE_LOTTERY,
  BACKEND_ENDPOINT_DRAW_WINNER,
  BACKEND_ENDPOINT_GET_LOTTERY,
  BACKEND_URL,
  NO_OWNER_PROVIDED,
} from "../shared/constants";
import { ILotteryDetails } from "../interfaces/ILotteryDetails";

const backendFacadeClientFunctions = (): IWineLotteryClientFunctions => {
  return {
    getLotteryById: async (lotteryId: number) => {
      const address = `${BACKEND_URL}/${BACKEND_ENDPOINT_CREATE_LOTTERY}/${lotteryId}`;
      const response = await fetch(address);

      return (await response.json()) as ILotteryDetails;
    },
    createNewLottery: async () => {
      const address = `${BACKEND_URL}/${BACKEND_ENDPOINT_GET_LOTTERY}`;
      const response = await fetch(address);

      return (await response.json()) as ILotteryDetails;
    },
    buyTicket: async (lotteryId, ticket) => {
      const address = `${BACKEND_URL}/${BACKEND_ENDPOINT_BUY_TICKET}/${lotteryId}`;
      const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(ticket),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(NO_OWNER_PROVIDED);
      }
      return (await response.json()) as ILotteryDetails;
    },
    drawWinner: async (lotteryId: number, wineId: number) => {
      const address = `${BACKEND_URL}/${BACKEND_ENDPOINT_DRAW_WINNER}/${lotteryId}/${wineId}`;
      const response = await fetch(address);

      return (await response.json()) as ILotteryDetails;
    },
  };
};

export default backendFacadeClientFunctions;
