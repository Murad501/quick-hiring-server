import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import userService from "./user.service";
import responseReturn from "../../../helpers/responseReturn";
import config from "../../../config";
import JWTOperation from "../../../util/jwtOperation";

class UserController {
  userService: typeof userService;
  jwt: JWTOperation;
  constructor() {
    this.userService = userService;
    this.jwt = new JWTOperation(
      config?.jwt_secret as string,
      config?.jwt_expire_in as string,
    );
  }

  getMe = catchAsync(async (req: Request, res: Response) => {
    const email: string = req?.user?.email as string;
    const result = await this.userService.getMe(email);
    responseReturn(res, {
      success: true,
      message: "My profile retrieved successfully",
      data: result,
    });
  });
}

const userController = new UserController();

export default userController;
