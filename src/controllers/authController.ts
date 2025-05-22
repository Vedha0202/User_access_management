import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppDataSource } from "../ormconfig";
import { User } from "../entities/User";
import { hashPassword, comparePasswords } from "../utils/hash";


const userRepo = AppDataSource.getRepository(User);

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const existing = await userRepo.findOneBy({ username });
    if (existing){
      res.status(400).json({ message: "User exists" });
      return ;
    }

    const hashed = await hashPassword(password);
    const user = userRepo.create({ username, password: hashed, role: "Employee" });
    await userRepo.save(user);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await userRepo.findOneBy( { username } );
    if (!user) {
     res.status(400).json({ message: "Invalid credentials" });
     return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match){
      res.status(400).json({ message: "Invalid credentials" });
      return ;
    } 

    const token = jwt.sign({ id: user.id, role: user.role },process.env.JWT_SECRET as string,{expiresIn: "1h"});
    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
