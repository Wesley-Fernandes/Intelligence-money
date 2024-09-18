import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.DB_PASS as string;

export function validateToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {id: string};
    return { valid: true, decoded }
  } catch (err) {
    return { valid: false, error: "Token invalido." };
  }
}
