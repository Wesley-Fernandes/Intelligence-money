
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vvjyhzkmnpjpzqjcerbk.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey)