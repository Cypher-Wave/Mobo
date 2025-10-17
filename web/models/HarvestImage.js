import mongoose from "mongoose";

const HarvestImageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageName: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const HarvestImage = mongoose.model("HarvestImage", HarvestImageSchema);

export default HarvestImage;
