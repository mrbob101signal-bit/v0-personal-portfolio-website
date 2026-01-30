// models/About.ts
import mongoose from "mongoose"

const AboutSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  detailedBio: String,
  additionalInfo: String,
  email: String,
  phone: String,
  location: String,
  image: String,
})

export default mongoose.models.About ||
  mongoose.model("About", AboutSchema)
