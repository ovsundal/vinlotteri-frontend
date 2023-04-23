import { ILotteryResponse } from "./ILotteryResponse";

export interface IWineLotteryClientFunctions {
  createNewLottery: () => Promise<ILotteryResponse>;
  getLotteryById: (lotteryId: number) => Promise<ILotteryResponse>;
}
