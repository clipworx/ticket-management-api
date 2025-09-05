import { Response } from "express";

export const logout = async (res: Response) => {
    try {
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
