import { ITicket } from "./ITicket";
import { IWine } from "./IWine";

export interface ILotteryDetails {
  id: number;
  availableTicketsInfo: string;
  lotteryIncomeInfo: string;
  spentOnPrizesInfo: string;
  ticketPriceInfo: string;
  totalBalanceInfo: string;
  tickets: ITicket[];
  wines: IWine[];
  nextWineToAward?: IWine;
}
