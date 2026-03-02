import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

class JWTOperation {
  secret: string;
  expiresIn: string;

  constructor(secret: string, expiresIn: string) {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  createToken(payload: Record<string, unknown>, time?: string): string {
    const options: SignOptions = {
      expiresIn: (time || this.expiresIn) as SignOptions["expiresIn"],
    };
    const token = jwt.sign(payload, this.secret, options);
    return token;
  }

  verifyToken(token: string): JwtPayload | string {
    const payload = jwt.verify(token, this.secret);
    return payload;
  }
}

export default JWTOperation;
