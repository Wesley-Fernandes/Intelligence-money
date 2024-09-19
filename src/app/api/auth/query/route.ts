
import { NextResponse } from "next/server";
import { getMonthRangeFromLocalDate } from "@/util/time";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { getUserByToken } from "@/repository/user";

export async function GET(request: Request) {
	try {
        const token = cookies().get('token')?.value;

        if(!token){
            return NextResponse.json({message: "Token não encontrado."}, {status: 401})
        }
        const user = await getUserByToken(token);
        
		const url = new URL(request.url as string);
		const date = url.searchParams.get("date");

		if (!date){
			return NextResponse.json({ message: "O parametro de pesquisa é obrigatorio." },{ status: 400 });
        }

        
        const {firstDay, lastDay} = getMonthRangeFromLocalDate(date)

		const {error, data} = await supabase.from("record").select("*").gte("startTime", firstDay).lte("endTime", lastDay).eq("creator", user?.id)

        if(error){
            console.error(error);
            return NextResponse.json({message: error.message}, {status: 401})
        }

		return NextResponse.json(data, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ message: "Erro interno. Tente novamente" },
			{ status: 500 },
		);
	}
}
