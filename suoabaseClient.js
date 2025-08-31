// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqYWtybG5uZmxvb3RzZ2R6d3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTcwMjYsImV4cCI6MjA2ODgzMzAyNn0.97AFydLJk3NgsHk2Q6cOndlAIMMw4LtQHaB7H9yIoAM'

export const supabase = createClient(supabaseUrl, supabaseKey)
