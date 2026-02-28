import { Request, Response, NextFunction } from "express";
import ApiError from "../../errors/ApiError";
import JWTOperation from "../../util/jwtOperation";
import config from "../../config";
import User from "../modules/users/user.model";

const auth =
  (...rules: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token =
        req.header("x-auth-token") ||
        req.header("Authorization") ||
        req.cookies?.accessToken;
      if (!token) {
        throw new ApiError(401, "Access Denied. No token provided");
      }

      if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }
      const jwt = new JWTOperation(
        config.jwt_secret as string,
        config.jwt_expire_in as string,
      );
      const decoded = jwt.verifyToken(token) as { role: string; email: string };

      //here check banned or not in database
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        throw new ApiError(401, "User not found");
      }
      // console.log(decoded, rules);
      if (rules.length > 0 && !rules.includes(decoded.role)) {
        throw new ApiError(403, "Forbidden Access");
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
