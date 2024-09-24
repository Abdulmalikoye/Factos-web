import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://wrsyiqthjrlxhnkccylx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indyc3lpcXRoanJseGhua2NjeWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwNTU2OTEsImV4cCI6MjA0MDYzMTY5MX0.uLWAHJ7n-HTx1Vdke9Hztwn6fuiDJDfsjUBFWDSgNUE";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
