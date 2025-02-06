import mongoose from "mongoose";
import slugify from "slugify";

const socialMediaSchema = new mongoose.Schema(
  {
    twitter: { type: String, required: false },
    facebook: { type: String, required: false },
    telegram: { type: String, required: false },
    discord: { type: String, required: false },
    medium: { type: String, required: false },
    github: { type: String, required: false },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  project_url: String,
  slug: { type: String, unique: true },
  logo: String,
  stage: String,
  launchpad: String,
  votes: { type: Number, default: 0 },
  end_in: String,
  tokensForSale: String,
  target: String,
  timestamp: { type: Date, default: Date.now },
  network: String,
  contract_address: String,
  whitepaper: String,
  website: String,
  socialMedia: socialMediaSchema,
  description: String,
  total_supply: String,
  supply_percentage: String,
  fundraising_goal: String,
  tokens_for_sale: String,
  ico_price: String,
  usdt_rate: String,
  soft_cap: String,
  hard_cap: String,
  personal_cap: String,
  project_category: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

projectSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export const Project = mongoose.model("Project", projectSchema);
