import dotenv from "dotenv";
dotenv.config();
import "module-alias/register";
import express from "express";
import cors from "cors";
import supabase from "#config/db";
import { Router } from "express";
import { startTicketExpirationJob } from "#jobs/expiryChecker";

const app = express();
const PORT = process.env.PORT || 5000;


const corsAllowedOrigins = [
  "http://localhost:3000",
  "https://ticket-management-seven.vercel.app/",
  "https://ticket-management-seven.vercel.app"
];
// Middleware
app.use(cors({
  origin: corsAllowedOrigins,
}));

app.use(express.json());

import authRoutes from "#routes/auth";
import ticketsRoutes from "#routes/tickets";
import checkRoutes from "#routes/check";
// Root route
app.get("/", async (req, res) => {
  res.send("🚀 811 Tickets Backend is running...");
});


const apiRouter = Router();
apiRouter.use("/auth", authRoutes);
apiRouter.use("/tickets", ticketsRoutes);
apiRouter.use("/check", checkRoutes);

app.use("/api", apiRouter);

// Start server
app.listen(PORT, async () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  startTicketExpirationJob();
  try {
    await supabase.from('users').select('*').limit(1);  
    console.log("✅ Database connection valid");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
});
