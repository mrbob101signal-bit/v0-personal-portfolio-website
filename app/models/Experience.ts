// models/Experience.ts
import mongoose from "mongoose"

const ExperienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    startDate: String,
    endDate: String,
    description: String,
    technologies: [String],
  },
  { timestamps: true }
)

export default mongoose.models.Experience ||
  mongoose.model("Experience", ExperienceSchema)
