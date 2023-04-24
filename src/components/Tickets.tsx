import { Button, Input, Table } from "@equinor/eds-core-react";
import React, { useEffect, useState } from "react";
import {
  BUTTON_BUY_TICKET,
  TABLE_HEADER_NAME,
  TABLE_HEADER_TICKET_NUMBER,
} from "../shared/constants";
import { ITicket } from "../interfaces/ITicket";

const Tickets = () => {
  const [ticketList, setTicketList] = useState([] as ITicket[]);

  useSetupTicketList(setTicketList);

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
          {ticketList.map(({ ticketNumber, owner }) => (
            <Table.Row>
              <Table.Cell>{ticketNumber}</Table.Cell>
              {/*if ticket is already bought, show text field and do not render a buy button */}
              {owner ? (
                <Table.Cell>{owner}</Table.Cell>
              ) : (
                <Table.Cell>
                  <Input />
                </Table.Cell>
              )}
              <Table.Cell>
                {!owner && (
                  <Button variant="outlined">{BUTTON_BUY_TICKET}</Button>
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
  setTicketList: React.Dispatch<React.SetStateAction<ITicket[]>>
) => {
  useEffect(() => {
    const tickets: ITicket[] = [];

    for (let i = 1; i <= 100; i++) {
      const ticket = {
        ticketNumber: i,
        owner: "",
      };

      tickets.push(ticket);
    }
    setTicketList(tickets);
  }, [setTicketList]);
};

export default Tickets;
