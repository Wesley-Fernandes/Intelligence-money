import { z } from "zod";

//const mongoIdRegex = /^[a-fA-F0-9]{24}$/;

export const RecordSchema = z.object({
    start: z.string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/, {
        message: "Start deve ser uma data e hora válidas no formato ISO 8601.",
      }),
    end: z.string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/, {
        message: "End deve ser uma data e hora válidas no formato ISO 8601.",
      })
      .min(8, { message: "End deve ter pelo menos 8 caracteres." }),
    operator: z.string({ message: "Operator é obrigatorio." }),
    type: z.enum(["LUCRO", "PREJUIZO"])
  });

/*
  operator: z.string()
      .regex(mongoIdRegex, { message: "OperatorId é inválido." }),
      type: z.enum(["LUCRO", "PREJUIZO"])

*/