import { Model } from "mongoose";

export type IApplication = {
  jobId: string;
  jobTitle?: string;
  jobCompany?: string;
  applicationId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  status: "new" | "reviewed" | "interviewing" | "rejected" | "hired";
};

export type ApplicationModel = Model<IApplication>;
