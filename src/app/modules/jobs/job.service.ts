import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IJob } from "./job.interface";
import Job from "./job.model";

class JobService {
  private job: typeof Job;

  constructor(job: typeof Job) {
    this.job = job;
  }

  async createJob(payload: IJob): Promise<IJob> {
    const result = await this.job.create(payload);
    return result;
  }

  async getAllJobs(): Promise<IJob[]> {
    const result = await this.job.find({});
    return result;
  }

  async getSingleJob(jobId: string): Promise<IJob | null> {
    const result = await this.job.findOne({ jobId });
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "Job not found");
    }
    return result;
  }

  async deleteJob(jobId: string): Promise<IJob | null> {
    const result = await this.job.findOneAndDelete({ jobId });
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "Job not found");
    }
    return result;
  }
}

const jobService = new JobService(Job);

export default jobService;
