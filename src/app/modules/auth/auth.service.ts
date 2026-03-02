import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import JWTOperation from "../../../util/jwtOperation";
import config from "../../../config";
import User from "../users/user.model";
const bcrypt = require("bcryptjs");

class AuthService {
  jwtSecret: string;
  jwtExpiresIn: string;
  jwt: JWTOperation;

  constructor(jwtSecret: string, jwtExpiresIn: string) {
    this.jwtSecret = jwtSecret;
    this.jwtExpiresIn = jwtExpiresIn;
    this.jwt = new JWTOperation(this.jwtSecret, this.jwtExpiresIn);
  }

  async login(payload: { email: string; password: string }) {
    const user = await User.findOne({ email: payload.email }).select(
      "+password",
    );

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const isPasswordMatch = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }

    const accessToken = this.jwt.createToken({
      role: user.role,
      email: user.email,
    });

    const refreshToken = this.jwt.createToken(
      {
        role: user.role,
        email: user.email,
      },
      config.jwt_refresh_expire_in as string,
    );

    // Remove password before returning
    user.password = undefined as any;

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}

const authService = new AuthService(
  config.jwt_secret as string,
  config.jwt_expire_in as string,
);
export { AuthService };
export default authService;
