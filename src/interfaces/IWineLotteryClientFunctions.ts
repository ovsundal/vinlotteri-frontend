import { ILotteryDetails } from "./ILotteryDetails";

export interface IWineLotteryClientFunctions {
  createNewLottery: () => Promise<ILotteryDetails>;
  getLotteryById: (lotteryId: number) => Promise<ILotteryDetails>;
}
