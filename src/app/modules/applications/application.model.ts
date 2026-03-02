import { Schema, model } from "mongoose";
import { IApplication, ApplicationModel } from "./application.interface";

const applicationSchema = new Schema<IApplication, ApplicationModel>(
  {
    jobId: {
      type: String,
      required: true,
    },
    applicationId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    resumeLink: {
      type: String,
      required: true,
    },
    coverNote: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

// Compound index to ensure one application per job per email
applicationSchema.index({ jobId: 1, email: 1 }, { unique: true });

const Application = model<IApplication, ApplicationModel>(
  "Application",
  applicationSchema,
);

export default Application;
