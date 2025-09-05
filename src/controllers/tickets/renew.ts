import { Response } from "express";
import { AuthRequest } from "#middleware/auth";
import { TicketModel } from "#models/Ticket";
import { RenewalModel, Renewal } from "#models/Renewal";

export const renewTicket = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { notes } = req.body;


    const ticket = await TicketModel.findById(id);

    const oldExpiration = ticket.expiration_date
      ? new Date(ticket.expiration_date)
      : new Date();

    const newExpiration = new Date(oldExpiration);
    newExpiration.setDate(newExpiration.getDate() + 15);

    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    if (req.user.role !== "admin" && ticket.created_by !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updated = await TicketModel.update(id, { expiration_date: newExpiration.toISOString() });

    const renewalData: Omit<Renewal, "id" > = {
      ticket_id: id,
      renewed_by: userId,
      renewed_at: new Date().toISOString(),
      old_expiration: oldExpiration.toISOString(),
      new_expiration: newExpiration.toISOString(),
      notes: notes,
    };
    
    await RenewalModel.logRenewal(renewalData);

    res.json({ message: "Ticket renewed", ticket: updated });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
