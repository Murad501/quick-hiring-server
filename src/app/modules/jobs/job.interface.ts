import { Model } from "mongoose";

export type IJob = {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  type: string;
  tags: string[];
  sections: {
    title: string;
    values: string[];
  }[];
  jobId: string;
};

export type JobModel = Model<IJob>;
