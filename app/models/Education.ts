// models/Education.ts
import mongoose from "mongoose"

const EducationSchema = new mongoose.Schema(
  {
    school: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    description: String,
  },
  { timestamps: true }
)

export default mongoose.models.Education ||
  mongoose.model("Education", EducationSchema)
