import jwt from "jsonwebtoken";

export async function validateTokenAndGetUserId(request) {
  const token = request.cookies.get("token")?.value;
  console.log(token,'toijhbhhjyhghjhdsjgsdhj')
  try {
    if (!token) {
      throw new Error("No token found");
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.jwt_secret);
    console.log(decodedToken,'tokenejewjnewhewjhewhn')
    const userId = decodedToken.iat
    console.log(userId,'yesttsfvstbyusreds usd')
    return userId;
  } catch (error) {
    return error;
  }
}
