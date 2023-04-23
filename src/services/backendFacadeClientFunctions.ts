import { IWineLotteryClientFunctions } from "../interfaces/IWineLotteryClientFunctions";
import {
  BACKEND_ENDPOINT_CREATE_LOTTERY,
  BACKEND_URL,
} from "../shared/constants";
import { ILotteryDetails } from "../interfaces/ILotteryDetails";

const backendFacadeClientFunctions = (): IWineLotteryClientFunctions => {
  return {
    createNewLottery: async () => {
      const address = `${BACKEND_URL}/${BACKEND_ENDPOINT_CREATE_LOTTERY}`;
      const response = await fetch(address);

      return (await response.json()) as ILotteryDetails;
    },
  };
};

export default backendFacadeClientFunctions;
