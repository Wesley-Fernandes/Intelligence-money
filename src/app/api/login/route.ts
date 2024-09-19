import { supabase } from "@/lib/supabase";
import { LoginSchema } from "@/schema/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";


export async function POST(request: Request){
    try {
        const body = LoginSchema.parse(await request.json());

        const {data, error} = await supabase.auth.signInWithPassword({
            email: body.email,
            password: body.password
        })

        if(error){
            return NextResponse.json({message: error.message}, {status: error.status})
        }

        const now = new Date();
        const response = NextResponse.json({message: "Login succefuly!"}, {status: 200});
        
        response.cookies.set('token', data.session?.access_token as string, {
            expires: new Date(now.getTime() + 3600 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });

        return response
        
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
