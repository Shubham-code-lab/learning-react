
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://gdjcoeibetqiyhlufyfx.supabase.co'
// Using the public (anon) key is safe because Row Level Security (RLS) policies
// control what users can access. Even with this key, users can only perform
// operations that are explicitly allowed by the RLS policies we define in Supabase.
// we only enabled read access to the public key
// then for curd operation what we do ?
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkamNvZWliZXRxaXlobHVmeWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NTM4OTIsImV4cCI6MjA4MzQyOTg5Mn0.FBi99OxU98uR8HBtjeh8SkVwoCIflzUWOMDOHpAAUEo";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;