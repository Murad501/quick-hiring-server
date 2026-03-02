import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import applicationService from "./application.service";
import responseReturn from "../../../helpers/responseReturn";
import httpStatus from "http-status";

class ApplicationController {
  private applicationService: typeof applicationService;

  constructor() {
    this.applicationService = applicationService;
  }

  applyForJob = catchAsync(async (req: Request, res: Response) => {
    const result = await this.applicationService.applyForJob(req.body);
    responseReturn(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Application submitted successfully",
      data: result,
    });
  });

  getAllApplications = catchAsync(async (req: Request, res: Response) => {
    const { data, meta } = await this.applicationService.getAllApplications(
      req.query as Record<string, string>,
    );

    responseReturn(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Applications retrieved successfully",
      meta,
      data: data,
    });
  });

  updateApplicationStatus = catchAsync(async (req: Request, res: Response) => {
    const { applicationId } = req.params;
    const { status } = req.body;
    const result = await this.applicationService.updateApplicationStatus(
      applicationId,
      status,
    );
    responseReturn(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Application status updated successfully",
      data: result,
    });
  });
}

const applicationController = new ApplicationController();

export default applicationController;
