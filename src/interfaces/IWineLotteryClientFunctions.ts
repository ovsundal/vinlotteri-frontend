import { ILotteryDetails } from "./ILotteryDetails";

export interface IWineLotteryClientFunctions {
  createNewLottery: () => Promise<ILotteryDetails>;
}
