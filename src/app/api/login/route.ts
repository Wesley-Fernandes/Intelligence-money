
import prisma from "@/lib/prisma";
import { LoginSchema } from "@/schema/user";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request){
    try {
        const body = LoginSchema.parse(await request.json());

        const user = await prisma.user.findUnique({where: {email: body.email}})

        if(!user){
            return NextResponse.json({message: "Usuario não existe."}, {status: 404})
        }

        const validPassword = await compare(body.password, user.password);

        if(!validPassword){
            return NextResponse.json({message: "Email ou senha inválidos."}, {status: 401})
        }
    
        const token = sign({id: user.id}, process.env.DB_PASS as string);
        const expires = new Date(Date.now() * 1000000)
        cookies().set('token', token, {expires, httpOnly: true});
        
        return NextResponse.json({message: "Logado com suceso!", token}, {status: 200})
    } catch (error) {
        if (error instanceof ZodError) {
            if (error.errors.length > 0) {
              const firstError = error.errors[0];
              return NextResponse.json({
                message: firstError.message,
                key: firstError.path.join('.')
              }, {status: 400});
            }
        }
        console.error(error);
        return NextResponse.json({message: "Erro interno."}, {status: 500})
    }

}
