import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Footer from "@/components/layout/Footer";
import SignOutButton from "@/components/dashboard/SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    redirect("/");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware handles the redirect, but this is a safety net for direct renders.
  if (!user) redirect("/login");

  return (
    <>
      <header className="w-full border-b border-[var(--border)] bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-lg tracking-wide text-[var(--foreground)]"
          >
            Carson Dougherty
          </Link>
          <div className="flex items-center gap-6 text-sm text-[var(--foreground)]">
            <Link
              href="/dashboard"
              className="hover:text-[var(--heading)] transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/settings"
              className="hover:text-[var(--heading)] transition-colors"
            >
              Settings
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
