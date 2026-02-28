import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import User from "./user.model";
import JWTOperation from "../../../util/jwtOperation";
import config from "../../../config";

class UserService {
  user: typeof User;
  jwt: JWTOperation;
  constructor(user: typeof User) {
    this.user = user;
    this.jwt = new JWTOperation(
      config?.jwt_secret as string,
      config?.jwt_expire_in as string,
    );
  }

  async getMe(email: string): Promise<IUser | null> {
    const isExistUser = await this.user.findOne({ email });
    if (!isExistUser) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return isExistUser;
  }
}

const userService = new UserService(User);
export default userService;
