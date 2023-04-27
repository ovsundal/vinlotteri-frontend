import { ILotteryDetails } from "./ILotteryDetails";
import { ITicket } from "./ITicket";

export interface IWineLotteryClientFunctions {
  createNewLottery: () => Promise<ILotteryDetails>;
  getLotteryById: (lotteryId: number) => Promise<ILotteryDetails>;
  buyTicket: (lotteryId: number, ticket: ITicket) => Promise<ILotteryDetails>;
  drawWinner: (lotteryId: number, wineId: number) => Promise<ILotteryDetails>;
}
