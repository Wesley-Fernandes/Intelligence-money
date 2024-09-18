import { z } from "zod";

export const RegistrationSchema = z.object({
    username: z.string({message: "Username deve ser uma string."}),
    password: z.string({message: "Password deve ser uma string."}).min(8),
    email: z.string({message: "E-mail deve ser uma string."}).email({message: "O e-mail é invalido."}),
})


export const LoginSchema = z.object({
    email: z.string({message: "E-mail deve ser uma string."}).email({message: "O e-mail é invalido."}),
    password: z.string({message: "Password deve ser uma string."}).min(8),
})

