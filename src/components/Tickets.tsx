import { Button, Input, Table } from "@equinor/eds-core-react";
import React, { useEffect, useState } from "react";
import {
  BUTTON_BUY_TICKET,
  TABLE_HEADER_NAME,
  TABLE_HEADER_TICKET_NUMBER,
} from "../shared/constants";
import { ITicket } from "../interfaces/ITicket";
import { ILotteryOutletContext } from "../interfaces/ILotteryOutletContext";
import { useOutletContext } from "react-router-dom";
import { cloneDeep } from "lodash";

const Tickets = () => {
  const [ticketList, setTicketList] = useState([] as ITicket[]);
  const { lotteryInstance, newBuyTicketClickHandler }: ILotteryOutletContext =
    useOutletContext();

  // use this object to keep track of input changes in each row
  const ticketListCopy = cloneDeep(ticketList);

  useSetupTicketList(lotteryInstance.tickets, setTicketList);

  const handleInputChange = (e: any, number: number) => {
    ticketListCopy[number - 1].owner = e.target.value;
  };

  return (
    <div>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>{TABLE_HEADER_TICKET_NUMBER}</Table.Cell>
            <Table.Cell>{TABLE_HEADER_NAME}</Table.Cell>
            <Table.Cell />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {ticketList.map(({ number, owner }) => (
            <Table.Row key={number}>
              <Table.Cell>{number}</Table.Cell>
              {/*if ticket is already bought, show text field and do not render a buy button */}
              {owner ? (
                <Table.Cell>{owner}</Table.Cell>
              ) : (
                <Table.Cell>
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, number)
                    }
                  />
                </Table.Cell>
              )}
              <Table.Cell>
                {!owner && (
                  <Button
                    variant="outlined"
                    onClick={() =>
                      newBuyTicketClickHandler(ticketListCopy[number - 1])
                    }
                  >
                    {BUTTON_BUY_TICKET}
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const useSetupTicketList = (
  boughtTickets: ITicket[],
  setTicketList: React.Dispatch<React.SetStateAction<ITicket[]>>
) => {
  useEffect(() => {
    if (boughtTickets == null) {
      return;
    }
    const tickets: ITicket[] = [];
    // generate list of 100 available tickets
    for (let i = 1; i <= 100; i++) {
      const boughtTicket = boughtTickets.find((ticket) => ticket.number === i);

      // if ticket has been bought, insert that. Otherwise, insert new ticket
      if (boughtTicket) {
        tickets.push(boughtTicket);
      } else {
        tickets.push({
          number: i,
          owner: "",
          hasWon: false,
        } as ITicket);
      }
    }
    setTicketList(tickets);
  }, [setTicketList, boughtTickets]);
};

export default Tickets;
