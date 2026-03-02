import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IApplication } from "./application.interface";
import Application from "./application.model";
import { getUniqueKey } from "../../../helpers/getUniqueKey";
import { queryMaker } from "../../../helpers/queryMaker";

import Job from "../jobs/job.model";

class ApplicationService {
  private application: typeof Application;

  constructor(application: typeof Application) {
    this.application = application;
  }

  async applyForJob(payload: IApplication): Promise<IApplication> {
    const isJobExist = await Job.findOne({ jobId: payload.jobId });
    if (!isJobExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "Job not found");
    }

    payload.applicationId = getUniqueKey("APP");

    const result = await this.application.create(payload);
    return result;
  }

  async getAllApplications(query: Record<string, string>): Promise<{
    data: IApplication[];
    meta: { page: number; limit: number; total: number };
  }> {
    const { filter, searchQuery, ...options } = queryMaker(query);
    const { sortQuery, skipQuery, limitQuery, pageQuery } = options as any;

    const searchableFields = ["name", "email", "coverNote"];
    const finalFilters: any = { ...filter };

    if (searchQuery) {
      finalFilters.$and = finalFilters.$and || [];
      finalFilters.$and.push({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchQuery, $options: "i" },
        })),
      });
    }

    const countPipeline = [{ $match: finalFilters }, { $count: "total" }];

    const pipeline = [
      { $match: finalFilters },
      { $sort: sortQuery },
      { $skip: skipQuery },
      { $limit: limitQuery },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "jobId",
          as: "jobDetails",
        },
      },
      {
        $unwind: {
          path: "$jobDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          jobTitle: "$jobDetails.title",
          jobCompany: "$jobDetails.company",
        },
      },
      {
        $project: {
          jobDetails: 0,
        },
      },
    ];

    const data = await this.application.aggregate(pipeline);

    // Fallback since aggregate doesn't automatically map Mongoose virtuals like createdAt
    const formattedData = data.map((item) => {
      item.id = item._id;
      return item;
    });

    const totalRes = await this.application.aggregate(countPipeline);
    const total = totalRes.length > 0 ? totalRes[0].total : 0;

    return {
      data: formattedData as unknown as IApplication[],
      meta: {
        page: pageQuery,
        limit: limitQuery,
        total,
      },
    };
  }

  async updateApplicationStatus(
    applicationId: string,
    status: string,
  ): Promise<IApplication | null> {
    const result = await this.application.findOneAndUpdate(
      { applicationId },
      { status },
      { new: true },
    );

    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "Application not found");
    }

    return result;
  }
}

const applicationService = new ApplicationService(Application);

export default applicationService;
