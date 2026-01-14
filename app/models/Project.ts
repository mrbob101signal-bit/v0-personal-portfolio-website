import mongoose, { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    technologies: [String],
    github: String,
    demo: String,
  },
  { timestamps: true }
);

export default models.Project || model("Project", ProjectSchema);
