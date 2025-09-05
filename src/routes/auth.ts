import { Router } from "express";
import { register } from "#controllers/auth/register";
import { login } from "#controllers/auth/login";
import { logout } from "#controllers/auth/logout";
import { authMiddleware } from "#middleware/auth";
import { me } from "#controllers/users/me";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", authMiddleware, me);

export default router;