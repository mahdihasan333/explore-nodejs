import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import { string, z } from "zod";
import bcrypt from 'bcryptjs';

export const userRoutes = express.Router();

const CrateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const zodBody = await CrateUserZodSchema.parseAsync(req.body)
    const body = req.body;

    // const password = await bcrypt.hash(body.password, 10);

    // body.password = password

    const user = new User(body)

    const password = await user.hashPassword(body.password)
    user.password = password

    await user.save()
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    message: "All User Retrieved Successfully",
    users,
  });
});

userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  res.status(201).json({
    success: true,
    message: "Single User Retrieved Successfully",
    user,
  });
});

userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedUser = req.body;
  const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });

  res.status(201).json({
    success: true,
    message: "User Updated is Successfully",
    user,
  });
});

userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);

  res.status(201).json({
    success: true,
    message: "User Deleted Successfully",
    user,
  });
});
