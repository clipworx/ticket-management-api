import { Router } from "express";
import multer from "multer";
import { bulkInsertTickets } from "#controllers/tickets/bulkInsert";
import { authMiddleware } from "#middleware/auth";
import { createTicket } from "#controllers/tickets/create";
import { getTickets } from "#controllers/tickets/retrieve";
import { updateTicket } from "#controllers/tickets/update";
import { closeTicket } from "#controllers/tickets/close";
import { renewTicket } from "#controllers/tickets/renew";
import { getTicketById } from "#controllers/tickets/retrieveById";


const router = Router();
const upload = multer({
	dest: "uploads/",
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "application/json" || file.originalname.endsWith(".json")) {
			cb(null, true);
		} else {
			cb(new Error("Only .json files are allowed!"));
		}
	}
});

router.post("/", authMiddleware, createTicket);
router.post("/bulk-insert",authMiddleware, upload.single("file"), bulkInsertTickets);
router.get("/", authMiddleware, getTickets);
router.get("/:id", authMiddleware, getTicketById);
router.patch("/:id", authMiddleware, updateTicket);
router.patch("/:id/renew", authMiddleware, renewTicket);
router.patch("/:id/close", authMiddleware, closeTicket);


export default router;
