import { Response } from "express";
import { AuthRequest } from "#middleware/auth";
import { TicketModel } from "#models/Ticket";

export const updateTicket = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await TicketModel.findById(id);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (req.user?.role !== "admin" && ticket.created_by !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { organization, expiration_date, location, notes, status } = req.body;

    const updated = await TicketModel.update(id, {
      organization,
      expiration_date,
      location,
      notes,
      status,
    });

    res.json(updated);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
