import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ACCESS_TOKEN!;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
