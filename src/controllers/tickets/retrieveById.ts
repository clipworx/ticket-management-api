import { Response } from "express";
import { AuthRequest } from "#middleware/auth";
import { TicketModel } from "#models/Ticket";

export const getTicketById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await TicketModel.findById(id);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Non-admins can only see their own tickets
    if (ticket.created_by !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json(ticket);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
