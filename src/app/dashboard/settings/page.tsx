import { createClient } from "@/lib/supabase/server";
import AccountSettingsForm from "@/components/dashboard/AccountSettingsForm";

export default async function AccountSettingsPage() {
  let email = "";
  let fullName = "";
  let userId = "";

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    email = user?.email ?? "";
    userId = user?.id ?? "";

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();
      fullName = profile?.full_name ?? "";
    }
  } catch {
    // Supabase error — render with empty defaults
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
      <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-3">Account</p>
      <h1 className="font-serif text-4xl text-[var(--foreground)] mb-12">Settings</h1>

      <AccountSettingsForm email={email} fullName={fullName} userId={userId} />
    </div>
  );
}
