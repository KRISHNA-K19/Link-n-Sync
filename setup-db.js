// Setup script to create test users and profiles
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://riiuxrcjuugfiuinnrkm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaXV4cmNqdXVnZml1aW5ucmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTQ5MTIsImV4cCI6MjA4NTg3MDkxMn0.5B2buYrJMmPfw7mKK7G7Kt2pIl4Yg-uBelkVEnhrkfQ";

const supabase = createClient(supabaseUrl, supabaseKey);

// Known user IDs from Supabase auth
const USERS = [
  { id: "b9706fa3-0307-406e-8344-8ae3865c492f", email: "krishnamoorthyk.cse@gmail.com" },
  { id: "c533d0ee-1b0e-4138-9460-4b550ce82a38", email: "2416082@saec.ac.in" },
];

async function setupDatabase() {
  console.log("🚀 Setting up database...\n");

  // Check if profiles exist
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .limit(1);

  if (existing && existing.length > 0) {
    console.log("✓ Profiles table already has data");
    return;
  }

  // Insert profiles
  console.log("📝 Creating profiles...");
  for (const user of USERS) {
    const { error } = await supabase
      .from("profiles")
      .insert([{ id: user.id, email: user.email }]);

    if (error) {
      console.error(`❌ Error creating profile for ${user.email}:`, error);
    } else {
      console.log(`✓ Created profile for ${user.email}`);
    }
  }

  // Verify
  console.log("\n✅ Verification:");
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email");

  console.log(`Found ${profiles?.length ?? 0} profiles:`);
  profiles?.forEach((p) => {
    console.log(`  - ${p.email}`);
  });
}

setupDatabase().catch(console.error);
