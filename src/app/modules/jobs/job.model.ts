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
