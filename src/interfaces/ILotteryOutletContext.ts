import { ILotteryDetails } from "./ILotteryDetails";

export interface ILotteryOutletContext {
  lotteryInstance: ILotteryDetails;
  newLotteryClickHandler: () => void;
}
