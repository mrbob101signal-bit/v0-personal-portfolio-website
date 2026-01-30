import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/mongodb";
import Project from "../../models/Project";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    const projects = await Project.find();
    return res.status(200).json(projects);
  }

  if (req.method === "POST") {
    const newProject = await Project.create(req.body);
    return res.status(201).json(newProject);
  }

  res.status(405).json({ message: "Method not allowed" });
}
