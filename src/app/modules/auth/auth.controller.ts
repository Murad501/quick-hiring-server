import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import authService from "./auth.service";
import responseReturn from "../../../helpers/responseReturn";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

class AuthController {
  private cookieOptions: {
    secure: boolean;
    httpOnly: boolean;
    sameSite: "none";
  };

  constructor() {
    this.cookieOptions = {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    };
  }

  logOut = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    responseReturn(res, {
      success: true,
      message: "Logout Successfully",
      data: null,
    });
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Email and password are required",
      );
    }

    const result = await authService.login({ email, password });
    const { accessToken, refreshToken, ...restData } = result;

    res.cookie("accessToken", accessToken, this.cookieOptions);
    res.cookie("refreshToken", refreshToken, this.cookieOptions);

    responseReturn(res, {
      success: true,
      message: "Login successful",
      data: { ...restData, token: accessToken },
    });
  });
}

const authController = new AuthController();
export default authController;
