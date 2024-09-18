import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.DB_PASS as string;


interface Sucess{
  valid: boolean,
  decoded: {id: string}
}

interface Error{
  valid: boolean,
  error: string
}


// Função para validar o JWT
export function validateToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {id: string};
    return { valid: true, decoded }
  } catch (err) {
    return { valid: false, error: "Token invalido." };
  }
}
