
export async function GET(){
    const response = JSON.stringify({message: "is working"})
    return new Response(response)
}