// models/Education.ts
import mongoose from "mongoose"

const EducationSchema = new mongoose.Schema(
  {
    institution: String,
    program: String,
    specialization: String,
    period: String,
    status: String,
  },
  { timestamps: true }
)

if (mongoose.models.Education) {
  delete mongoose.models.Education
}

export default mongoose.model("Education", EducationSchema)
