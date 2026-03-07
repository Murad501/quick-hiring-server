import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";
import httpStatus from "http-status";
import { adminService } from "./admin.service";

class AdminController {
  private service: typeof adminService;

  constructor() {
    this.service = adminService;
  }

  getOverviewStats = catchAsync(async (req: Request, res: Response) => {
    const result = await this.service.getOverviewStats();
    responseReturn(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Admin overview stats retrieved successfully",
      data: result,
    });
  });
}

const adminController = new AdminController();
export default adminController;
