import jwt from "jsonwebtoken";

export const AdminAuth = (token: string) => {
  try {
    const decoded = jwt.verify(token, "mytimeisnaw");

    if (!token) {
      throw new Error("Invalid token");
    }
    return decoded;
  } catch (e: any) {
    throw new Error("Something went wrong with token");
  }
};
