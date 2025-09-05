import { Response } from "express";
import { AuthRequest } from "#middleware/auth";
import { TicketModel } from "#models/Ticket";
export const getExpiringTickets = async (req: AuthRequest, res: Response) => {
  try {
    let tickets;

    if (req.user.role === "admin") {
      tickets = await TicketModel.findAll();
    } else {
      tickets = await TicketModel.findByUser(req.user.id);
    }
    const now = new Date();
    let expiringTickets = [];
    for (const ticket of tickets) {
        if (!ticket.expiration_date) continue;

        const expiration = new Date(ticket.expiration_date);
        const diffHours = (expiration.getTime() - now.getTime()) / 1000 / 3600;

        if (diffHours <= 48 && ticket.status == "active" ) {
          expiringTickets.push(ticket);
        }
      }

    res.status(200).json(expiringTickets);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
