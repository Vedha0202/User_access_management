import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Software } from "../entities/Software";

const softwareRepo = AppDataSource.getRepository(Software);

export const createSoftware = async (req: Request, res: Response) => {
  const { name, description, accessLevels } = req.body;
  try {
    const newSoftware = softwareRepo.create({ name, description, accessLevels });
    await softwareRepo.save(newSoftware);
    res.status(201).json(newSoftware);
  } catch (err) {
    res.status(500).json({ message: "Failed to create software" });
  }
};

export const getAllSoftware = async (req: Request, res: Response) => {
  try {
    const softwares = await softwareRepo.find();
    res.json(softwares);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch software list" });
  }
};
