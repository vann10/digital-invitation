import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

/**
 * Public client for client-side queries (anonymous key).
 * Sensitive operator queries and service-role operations must be kept server-side per 07-TECHNICAL-ARCHITECTURE.md.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
