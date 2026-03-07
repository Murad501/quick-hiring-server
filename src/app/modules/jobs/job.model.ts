import { Schema, model } from "mongoose";
import { IJob, JobModel } from "./job.interface";

const jobSchema = new Schema<IJob, JobModel>(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    sections: [
      {
        title: {
          type: String,
          required: true,
        },
        values: {
          type: [String],
          required: true,
          default: [],
        },
      },
    ],
    jobId: {
      type: String,
      required: true,
      unique: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Job = model<IJob, JobModel>("Job", jobSchema);

export default Job;
