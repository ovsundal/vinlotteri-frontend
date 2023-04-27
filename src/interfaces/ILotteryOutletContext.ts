import { ILotteryDetails } from "./ILotteryDetails";
import { ITicket } from "./ITicket";

export interface ILotteryOutletContext {
  lotteryInstance: ILotteryDetails;
  newLotteryClickHandler: () => void;
  newBuyTicketClickHandler: (ticket: ITicket) => void;
  newDrawWinnerClickHandler: (wineId: number) => void;
}
