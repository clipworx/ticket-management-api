import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ACCESS_TOKEN!;
console.log("Using Supabase URL:", supabaseUrl);
console.log("Using Supabase Service Role Key:", supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
