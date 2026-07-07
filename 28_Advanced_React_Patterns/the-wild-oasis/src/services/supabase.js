import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://gdjcoeibetqiyhlufyfx.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkamNvZWliZXRxaXlobHVmeWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NTM4OTIsImV4cCI6MjA4MzQyOTg5Mn0.FBi99OxU98uR8HBtjeh8SkVwoCIflzUWOMDOHpAAUEo";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;