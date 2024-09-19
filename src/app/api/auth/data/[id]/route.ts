import { supabase } from "@/lib/supabase";
import { getUserByToken } from "@/repository/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request, { params }: { params: { id: string } }){
    try {
        const token = cookies().get('token')?.value;

        if(!token){
            return NextResponse.json({message: "Token não encontrado."}, {status: 401})
        }
        const user = await getUserByToken(token);

        const {error, data} = await supabase.from("record").select("*").eq("id", params.id).eq("creator", user?.id);

        if(error){
            console.error(error);
            return NextResponse.json({message: error.message}, {status: 401})
        }
        
        const response = data[0];
        return NextResponse.json(response, {status: 201});

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

export async function DELETE(request: Request, { params }: { params: { id: string } }){
    try {
        const token = cookies().get('token')?.value;

        if(!token){
            return NextResponse.json({message: "Token não encontrado."}, {status: 401})
        }
        const user = await getUserByToken(token);

        const {error} = await supabase.from("record").delete().eq("id", params.id).eq("creator", user?.id);

        if(error){
            console.error(error);
            return NextResponse.json({message: error.message}, {status: 401})
        }
        
        return NextResponse.json({message: "Data deletada com sucesso!"}, {status: 201})
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