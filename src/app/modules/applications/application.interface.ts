import { Model } from "mongoose";

export type IApplication = {
  jobId: string;
  applicationId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  status: "pending" | "reviewed";
};

export type ApplicationModel = Model<IApplication>;
