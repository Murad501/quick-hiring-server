import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../../../errors/ApiError";
import Application from "../applications/application.model";
import { IJob } from "./job.interface";
import Job from "./job.model";
import { getUniqueKey } from "../../../helpers/getUniqueKey";
import { queryMaker } from "../../../helpers/queryMaker";

class JobService {
  private job: typeof Job;

  constructor(job: typeof Job) {
    this.job = job;
  }

  async createJob(payload: IJob): Promise<IJob> {
    payload.jobId = getUniqueKey("JOB");
    const result = await this.job.create(payload);
    return result;
  }

  async getAllJobs(query: Record<string, string>): Promise<{
    data: IJob[];
    meta: { page: number; limit: number; total: number };
  }> {
    const { filter, searchQuery, ...options } = queryMaker(query);
    const { sortQuery, skipQuery, limitQuery, pageQuery } = options as any;

    const searchableFields = [
      "title",
      "company",
      "location",
      "category",
      "description",
    ];
    const finalFilters: any = { ...filter };

    if (searchQuery) {
      finalFilters.$and = finalFilters.$and || [];
      finalFilters.$and.push({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchQuery, $options: "i" },
        })),
      });
    }

    const data = await this.job
      .find(finalFilters)
      .sort(sortQuery)
      .skip(skipQuery)
      .limit(limitQuery);
    const total = await this.job.countDocuments(finalFilters);
    return {
      data,
      meta: {
        page: pageQuery,
        limit: limitQuery,
        total,
      },
    };
  }

  async getSingleJob(jobId: string): Promise<IJob | null> {
    const result = await this.job.findOne({ jobId });
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "Job not found");
    }
    return result;
  }

  async deleteJob(jobId: string): Promise<IJob | null> {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const result = await this.job.findOneAndDelete({ jobId }, { session });
      if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Job not found");
      }

      await Application.deleteMany({ jobId }, { session });

      await session.commitTransaction();
      await session.endSession();
      return result;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }
}

const jobService = new JobService(Job);

export default jobService;
