import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import jobService from "./job.service";
import responseReturn from "../../../helpers/responseReturn";
import httpStatus from "http-status";

class JobController {
  private jobService: typeof jobService;

  constructor() {
    this.jobService = jobService;
  }

  createJob = catchAsync(async (req: Request, res: Response) => {
    const result = await this.jobService.createJob(req.body);
    responseReturn(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Job created successfully",
      data: result,
    });
  });

  getAllJobs = catchAsync(async (req: Request, res: Response) => {
    // Only return open jobs for public UI
    const query = { ...req.query, status: "open" };
    const { data, meta } = await this.jobService.getAllJobs(
      query as Record<string, string>,
    );

    responseReturn(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Jobs retrieved successfully",
      meta,
      data: data,
    });
  });

  adminGetAllJobs = catchAsync(async (req: Request, res: Response) => {
    // Return all jobs for admin
    const { data, meta } = await this.jobService.getAllJobs(
      req.query as Record<string, string>,
    );

    responseReturn(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Jobs retrieved successfully",
      meta,
      data: data,
    });
  });

  getSingleJob = catchAsync(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const result = await this.jobService.getSingleJob(jobId);
    responseReturn(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Job retrieval successful",
      data: result,
    });
  });

  deleteJob = catchAsync(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const result = await this.jobService.deleteJob(jobId);
    responseReturn(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Job deleted successfully",
      data: result,
    });
  });

  updateJobStatus = catchAsync(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const { status } = req.body;
    const result = await this.jobService.updateJobStatus(jobId, status);
    responseReturn(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Job status updated successfully",
      data: result,
    });
  });
}

const jobController = new JobController();

export default jobController;
