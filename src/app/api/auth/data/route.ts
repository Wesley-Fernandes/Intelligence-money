import { supabase } from "@/lib/supabase";
import { getUserByToken } from "@/repository/user";
import { RecordSchema } from "@/schema/record";
import {  calculateTimeDifference, getMonthTimestamps, TimeDiference } from "@/util/time";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request){
    try {

        const token = cookies().get('token')?.value;

        if(!token){
            return NextResponse.json({message: "Token não encontrado."}, {status: 401})
        }
    
        const body = RecordSchema.parse(await request.json());
        const user = await getUserByToken(token);

        const quantity = calculateTimeDifference(body.start, body.end)
        const {hours, minutes} = TimeDiference(body.start, body.end);
        const price = (hours  + (minutes / 60)) * 14.12;
        

        const {error} = await supabase.from("record").insert({
            startTime: body.start,
            endTime: body.end,
            operator: body.operator,
            type: body.type,
            creator: user?.id,
            price,
            quantity
        })

        if(error){
            console.error(error);
            return NextResponse.json({message: error.message}, {status: 401})
        }

        
        return NextResponse.json({message: "Data registrada com sucesso!"}, {status: 201})
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

export async function GET(){
    try {


        const token = cookies().get('token')?.value;

        if(!token){
            return NextResponse.json({message: "Token não encontrado."}, {status: 401})
        }

    
        const user = await getUserByToken(token)

        const {endOfMonthDate, startOfMonthDate} = getMonthTimestamps();

        const {data} = await supabase.from("record").select("*").gte("startTime", startOfMonthDate).lte("endTime", endOfMonthDate).eq("creator", user?.id)

        console.log(data)
        
        return NextResponse.json(data, {status: 201})
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