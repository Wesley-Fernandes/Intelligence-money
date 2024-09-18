
import { NextResponse } from "next/server";
import { getMonthRangeFromLocalDate } from "@/util/time";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verify } from "jsonwebtoken";

export async function GET(request: Request) {
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
        
		const url = new URL(request.url as string);
		const date = url.searchParams.get("date");

		if (!date){
			return NextResponse.json({ message: "O parametro de pesquisa é obrigatorio." },{ status: 400 });
        }




        const {firstDay, lastDay} = getMonthRangeFromLocalDate(date)

		const datas = await prisma.record.findMany({ where: {
            start: {
                gte: firstDay,
                lte: lastDay
            },
            creatorId: decoded.id,
        }});

		return NextResponse.json(datas, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ message: "Erro interno. Tente novamente" },
			{ status: 500 },
		);
	}
}
