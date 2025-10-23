import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "#models/User";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, full_name, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    // Create user
    const user = await UserModel.create({
      email,
      password: hashed,
      full_name,
      role: role || "contractor",
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
