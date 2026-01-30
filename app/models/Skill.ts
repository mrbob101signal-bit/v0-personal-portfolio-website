// models/Skill.ts
import mongoose from "mongoose"

const SkillSchema = new mongoose.Schema({
  name: String,
  level: String, // e.g., Beginner, Intermediate, Expert
}, { timestamps: true })

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema)
