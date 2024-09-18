import { supabase } from "@/lib/supabase";
import { RegistrationSchema } from "@/schema/user";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
export async function POST(request: Request){
    try {
        const body = RegistrationSchema.parse(await request.json());
        const registration = await supabase.auth.signUp({
            email: body.email,
            password: body.password,
            options:{
                data: {
                    username: body.username
                }
            }
        })

        if(registration.error){
            return NextResponse.json({message: registration.error.message}, {status: registration.error.status})
        }

        return NextResponse.json({message: "Usuario criado com sucesso."}, {status: 201})
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