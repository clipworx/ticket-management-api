import { Router } from "express";
import { authMiddleware } from "#middleware/auth";
import { getExpiringTickets } from "#controllers/tickets/expiring";

const router = Router();


router.get("/expiring-tickets", authMiddleware, getExpiringTickets);

export default router;
