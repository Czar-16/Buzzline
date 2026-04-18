import jwt from "jsonwebtoken";

export const getUserFromToken = (req: Request) => {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return null;
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN

    //   "Bearer TOKEN"
    //    ↓ split(" ")
    // ["Bearer", "TOKEN"]

    // Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    return error;
  }
};
