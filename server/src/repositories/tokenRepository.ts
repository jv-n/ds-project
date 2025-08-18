import jwt from 'jsonwebtoken';


class TokenRepository {
  
  generateAccessToken(id: string) {
    const generatedToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET as string,);

    return generatedToken;
  }

  generateRefreshToken(id: string) {
    const generatedToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string);

    return generatedToken;
  }

  verifyAccessToken(token: string): jwt.JwtPayload {
    const verifiedToken = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
    ) as jwt.JwtPayload;

    return verifiedToken;
  }

  verifyRefreshToken(token: string): jwt.JwtPayload {
    const verifiedToken = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
    ) as jwt.JwtPayload;

    return verifiedToken;
  }
}

export default new TokenRepository();
