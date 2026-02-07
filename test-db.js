// Quick database verification script
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://riiuxrcjuugfiuinnrkm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaXV4cmNqdXVnZml1aW5ucmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTQ5MTIsImV4cCI6MjA4NTg3MDkxMn0.5B2buYrJMmPfw7mKK7G7Kt2pIl4Yg-uBelkVEnhrkfQ";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log("🔍 Checking database state...\n");

  // Check profiles
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, email");

  if (profilesError) {
    console.error("❌ Error fetching profiles:", profilesError);
  } else {
    console.log("✓ Profiles in database:", profiles?.length ?? 0);
    profiles?.forEach((p) => {
      console.log(`  - ${p.email} (${p.id})`);
    });
  }

  // Check session
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("❌ Error getting session:", error);
  } else {
    if (data.session) {
      console.log("\n✓ Current session user:", data.session.user.email);
      console.log("  ID:", data.session.user.id);
    } else {
      console.log("\n⚠️ No active session");
    }
  }
}

checkDatabase().catch(console.error);
