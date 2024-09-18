
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ThrowError(error: unknown) {
    if (error instanceof ZodError) {
      if (error.errors.length > 0) {
        const firstError = error.errors[0];
        return {
          message: firstError.message,
          key: firstError.path.join('.')
        };
      }
    }
    return NextResponse.json({ message: "Erro interno" }, {status: 500});
  }