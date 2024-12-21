import { createClient } from '@supabase/supabase-js'

// https://supabase.com/docs/reference/javascript/introduction

export const supabaseUrl = 'https://zbqxefvvgeadxzhisdvl.supabase.co'
// row level security prevent anyone to access using this key to client
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicXhlZnZ2Z2VhZHh6aGlzZHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyMjQyMzIsImV4cCI6MjAzOTgwMDIzMn0.34_Bq5jz7alGryIRzhC8xbICbxQUUpWJf2MqfL2uROo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;