import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/dashboard/SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Verify admin flag on the profiles table
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-serif text-[var(--foreground)]">
            Carson Dougherty
          </Link>
          <span className="text-xs uppercase tracking-widest text-[var(--foreground)]">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-[var(--foreground)]">
          <Link
            href="/admin"
            className="hover:text-[var(--heading)] transition-colors"
          >
            Products
          </Link>
          <SignOutButton />
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-12">{children}</main>
    </div>
  );
}
