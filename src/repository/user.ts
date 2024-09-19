import { supabase } from "@/lib/supabase"


export const getUserByToken = async(token:string) =>{
    const { data: { user } } = await supabase.auth.getUser(token);
    return user;
}