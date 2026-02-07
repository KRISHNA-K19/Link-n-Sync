import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://riiuxrcjuugfiuinnrkm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaXV4cmNqdXVnZml1aW5ucmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTQ5MTIsImV4cCI6MjA4NTg3MDkxMn0.5B2buYrJMmPfw7mKK7G7Kt2pIl4Yg-uBelkVEnhrkfQ";

export const supabase = createClient(supabaseUrl, supabaseKey);
