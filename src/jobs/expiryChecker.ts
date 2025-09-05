import cron from "node-cron";
import { TicketModel } from "#models/Ticket";


export const startTicketExpirationJob = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("⏰ Checking for expired tickets...");
    try {
      const tickets = await TicketModel.findAll();

      const now = new Date();

      for (const ticket of tickets) {
        if (!ticket.expiration_date) continue;

        const expiration = new Date(ticket.expiration_date);
        const diffHours = (expiration.getTime() - now.getTime()) / 1000 / 3600;

        if (diffHours <= 48 && ticket.status !== "expired") {
          console.log(`⚠️ Ticket ${ticket.ticket_number} will expire in less than 48 hours!`);
        }

        if (expiration < now && ticket.status !== "expired") {
          await TicketModel.update(ticket.id!, { status: "expired" });
          console.log(`❌ Ticket ${ticket.ticket_number} has expired and status updated.`);
        }
      }
    } catch (err: any) {
      console.error("Error checking ticket expirations:", err.message);
    }
  });
};
