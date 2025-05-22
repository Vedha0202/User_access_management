import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Request as AccessRequest } from "../entities/Request";
import { User } from "../entities/User";
import { Software } from "../entities/Software";

const requestRepo = AppDataSource.getRepository(AccessRequest);
const softwareRepo = AppDataSource.getRepository(Software);
const userRepo = AppDataSource.getRepository(User);

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
    role: string;
  };
}

export const submitRequest = async (req: Request, res: Response): Promise<void> =>  {
  const { softwareId, accessType, reason } = req.body;
  try {
    const software = await softwareRepo.findOneBy({ id: softwareId });
    if (!software){
       res.status(404).json({ message: "Software not found" });
       return;
    }

    const user = await userRepo.findOneBy({ id: req.user?.id });
    if (!user){ 
      res.status(404).json({ message: "User not found" });
      return;
    }

    const newRequest = requestRepo.create({
      software,
      user,
      accessType,
      reason,
      status: "Pending",
    });

    await requestRepo.save(newRequest);
    res.status(201).json(newRequest);
  } catch (err){
    console.error(err);
    res.status(500).json({ message: "Failed to submit request" });
  }
};

export const getPendingRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const requests = await requestRepo.find({
      where: { status: "Pending" },
      relations: ["user", "software"],
    });
    res.json(requests);
  } catch (err){
    console.error(err);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

export const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Approved", "Rejected"].includes(status)) {
    res.status(400).json({ message: "Invalid status" });
    return;
  }

  try {
    const request = await requestRepo.findOneBy({ id: parseInt(id) });
    if (!request){
      res.status(404).json({ message: "Request not found" });
      return;
    }

    request.status = status;
    await requestRepo.save(request);
    res.json({ message: `Request ${status.toLowerCase()}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update request" });
  }
};
