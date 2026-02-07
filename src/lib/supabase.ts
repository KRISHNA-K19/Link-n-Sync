import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getSupabaseClient() {
    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL and Anon Key are required');
    }
    return createClient(supabaseUrl, supabaseKey);
}

export const supabase = typeof window !== 'undefined' ? getSupabaseClient() : null as any;
