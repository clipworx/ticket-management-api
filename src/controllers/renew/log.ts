import { Response } from "express";
import { AuthRequest } from "#middleware/auth";
import { RenewalModel, Renewal } from "#models/Renewal";
import { TicketModel } from "#models/Ticket"; // assuming you have a TicketModel

export const renewTicket = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params; // ticket ID
    const userId = req.user?.id;

    // 1. Get the ticket
    const ticket = await TicketModel.findById(id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // 2. Calculate new expiration date (+15 days)
    const oldExpiration = ticket.expiration_date
      ? new Date(ticket.expiration_date)
      : new Date();
    const newExpiration = new Date(oldExpiration);
    newExpiration.setDate(newExpiration.getDate() + 15);

    // 3. Update ticket expiration
    const updatedTicket = await TicketModel.update(id, {
      expiration_date: newExpiration.toISOString().split("T")[0], // keep as YYYY-MM-DD
    });

    // 4. Log the renewal
    const renewalData: Omit<Renewal, "id" | "renewed_at"> = {
      ticket_id: id,
      renewed_by: userId,
      old_expiration: oldExpiration.toISOString().split("T")[0],
      new_expiration: newExpiration.toISOString().split("T")[0],
    };

    await RenewalModel.logRenewal(renewalData);

    res.json({
      message: "Ticket renewed successfully",
      ticket: updatedTicket,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
