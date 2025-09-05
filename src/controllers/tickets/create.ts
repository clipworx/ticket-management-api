import { Request, Response } from "express";
import { AuthRequest } from "#middleware/auth";
import { TicketModel } from "#models/Ticket";

export const createTicket = async (req: AuthRequest, res: Response) => {
  try {
    const { organization, expiration_date, location, notes } = req.body;

    const ticket_number = `TCK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    console.log("Creating ticket with number:", ticket_number);

    if (!ticket_number || !organization) {
      return res.status(400).json({ error: "ticket_number and organization are required" });
    }

    const ticket = await TicketModel.create({
      ticket_number,
      organization,
      expiration_date,
      location,
      notes,
      status: "active",
      created_by: req.user.id,
    });

    res.status(201).json(ticket);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
