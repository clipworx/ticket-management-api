import { Response } from "express";
import { AuthRequest } from "#middleware/auth";
import { TicketModel } from "#models/Ticket";

export const closeTicket = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await TicketModel.findById(id);

    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    if (req.user.role !== "admin" && ticket.created_by !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updated = await TicketModel.update(id, { status: "closed" });

    res.json({ message: "Ticket closed", ticket: updated });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
