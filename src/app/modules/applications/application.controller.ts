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
    const result = await this.applicationService.getAllApplications();
    responseReturn(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Applications retrieved successfully",
      data: result,
    });
  });
}

const applicationController = new ApplicationController();

export default applicationController;
