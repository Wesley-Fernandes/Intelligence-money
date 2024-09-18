import type { NextApiRequest, NextApiResponse } from 'next'


export async function GET(request: Request){
    const response = JSON.stringify({message: "is working"})
    return new Response(response)
}