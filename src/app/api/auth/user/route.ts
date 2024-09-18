import prisma from "@/lib/prisma";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(){
    try {

        const JWT_SECRET = process.env.DB_PASS as string;

        const token = cookies().get('token')?.value;

        if(!token){
            return NextResponse.json({message: "Token não encontrado."}, {status: 401})
        }

        const decoded = verify(token, JWT_SECRET) as {id: string};

        if(!decoded){
            return NextResponse.json({message: "Token inválido."}, {status: 401})
        }

        const users = await prisma.user.findMany({
            where: {
                id:{
                    not: decoded.id
                }
            },
            select:{
                id: true,
                email: true,
                username: true,
            }
        })
        
        return NextResponse.json(users, {status: 200})
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
