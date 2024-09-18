import { supabase } from "@/lib/supabase";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(){
    try {

        const JWT_SECRET = process.env.JWT_SECRET as string;

        const token = cookies().get('token')?.value;

        if(!token||!verify(token, JWT_SECRET)){
            return NextResponse.json({message: "Token inválido."}, {status: 401})
        }

        const { data: { user } } = await supabase.auth.getUser(token)


        if(!user){
            return NextResponse.json({message: "Usuário não encontrado."}, {status: 404})
        }
        
        const data = {
            id: user.id,
            name: user.user_metadata.username||""
        }
        return NextResponse.json(data, {status: 200})
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
