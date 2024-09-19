import { supabase } from "@/lib/supabase";
import type { NextApiResponse, NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req:NextApiRequest, res:NextApiResponse){
    try {
      
        await supabase.auth.signOut({scope: "global"});
        res.setHeader('Set-Cookie', 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
        cookies().delete('token');
        cookies().set('token', '');
        
        return NextResponse.json({message: "Desconectado com suceso!"}, {status: 200})
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
