import prisma from "@/lib/prisma";
import { RegistrationSchema } from "@/schema/user";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
export async function POST(request: Request){
    try {
        const requester = RegistrationSchema.parse(await request.json());
            
        const user_exist = await prisma.user.findUnique({where: {email: requester.email}})

        if(user_exist){
            return NextResponse.json({message: "Úsuario já existe."}, {status: 401})
        }

        const hashedPassword = await hash(requester.password, 10);

        await prisma.user.create({data: {
            email: requester.email,
            password: hashedPassword,
            username: requester.username
        }});

        return NextResponse.json({message: "Úsuario foi criado."}, {status: 201})
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
        return NextResponse.json({message: "Erro interno."}, {status: 500})
    }
    
}