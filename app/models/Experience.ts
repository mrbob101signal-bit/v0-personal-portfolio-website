// models/Experience.ts
import mongoose from "mongoose"

const ExperienceSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    location: String,
    duration: String,
    description: [String],
  },
  { timestamps: true }
)

if (mongoose.models.Experience) {
  delete mongoose.models.Experience
}

export default mongoose.model("Experience", ExperienceSchema)
