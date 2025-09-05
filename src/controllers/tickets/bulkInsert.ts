import { Request, Response } from "express";
import { Ticket, TicketModel } from "#models/Ticket";
import fs from "fs";
import path from "path";
import { AuthRequest } from "#middleware/auth";

/**
 * Bulk insert tickets from uploaded .json file
 * Expects a file upload with field name 'file' containing a JSON array of tickets
 */
export const bulkInsertTickets = async (req: AuthRequest & { file?: Express.Multer.File }, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.resolve(req.file.path);
    try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        let tickets = JSON.parse(fileContent);
        if (!Array.isArray(tickets) || tickets.length === 0) {
        return res.status(400).json({ error: "Uploaded file does not contain a valid array of tickets" });
        }
        // Auto-generate ticket_number if not provided
        tickets = tickets.map((ticket, idx) => ({
        ...ticket,
        ticket_number: ticket.ticket_number || `TCK-${Date.now()}-${Math.floor(Math.random() * 10000)}-${idx+1}`,
        created_by: req.user?.id,
        }));
        // Adjust this to match your ORM's bulk insert method
        const createdTickets = await Promise.all(tickets.map((ticket: Ticket) => TicketModel.create(ticket)));
        return res.status(201).json({ tickets: createdTickets });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    } finally {
        // Clean up uploaded file
        fs.unlink(filePath, () => {});
    }
};
