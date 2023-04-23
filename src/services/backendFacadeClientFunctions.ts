import { IWineLotteryClientFunctions } from "../interfaces/IWineLotteryClientFunctions";
import {
  BACKEND_ENDPOINT_CREATE_LOTTERY,
  BACKEND_URL,
} from "../shared/constants";
import { ILotteryResponse } from "../interfaces/ILotteryResponse";

const backendFacadeClientFunctions = (): IWineLotteryClientFunctions => {
  return {
    getLotteryById: async (lotteryId: number) => {
      const address = `${BACKEND_URL}/${BACKEND_ENDPOINT_CREATE_LOTTERY}/${lotteryId}`;
      const response = await fetch(address);

      return (await response.json()) as ILotteryResponse;
    },
    createNewLottery: async () => {
      const address = `${BACKEND_URL}/${BACKEND_ENDPOINT_CREATE_LOTTERY}`;
      const response = await fetch(address);

      return (await response.json()) as ILotteryResponse;
    },
  };
};

export default backendFacadeClientFunctions;
