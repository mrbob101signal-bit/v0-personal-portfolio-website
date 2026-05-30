// models/Skill.ts
import mongoose from "mongoose"

const SkillSchema = new mongoose.Schema({
  name: String,
  category: String,
  level: { type: Number, min: 0, max: 100 },
}, { timestamps: true })

if (mongoose.models.Skill) {
  delete mongoose.models.Skill
}

export default mongoose.model("Skill", SkillSchema)
