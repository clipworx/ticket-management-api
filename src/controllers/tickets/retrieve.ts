import { Response } from "express";
import { AuthRequest } from "#middleware/auth";
import { TicketModel } from "#models/Ticket";
import { UserModel } from "#models/User";
export const getTickets = async (req: AuthRequest, res: Response) => {
  try {
    let tickets;

    if (req.user.role === "admin") {
      tickets = await TicketModel.findAll();
    } else {
      tickets = await TicketModel.findByUser(req.user.id);
    }

    // Attach fullname of created_by for each ticket
    const ticketsWithFullname = await Promise.all(
      tickets.map(async (ticket: any) => {
        const user = await UserModel.findById(ticket.created_by); 
        return {
          ...ticket,
          created_by_full_name: user ? user.full_name : null
        };
      })
    );

    res.status(200).json(ticketsWithFullname);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
