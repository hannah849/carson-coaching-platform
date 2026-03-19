"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  email: string;
  fullName: string;
  userId: string;
};

export default function AccountSettingsForm({ email, fullName, userId }: Props) {
  const [name, setName] = useState(fullName);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setStatus("saving");
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: name })
        .eq("id", userId);
      setStatus(error ? "error" : "saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-10">
      {/* Email — read only */}
      <div className="border-t border-[var(--border)] pt-8">
        <label className="block text-xs uppercase tracking-widest text-[var(--foreground)] mb-2">
          Email
        </label>
        <p className="text-[var(--foreground)] text-sm">{email || "—"}</p>
        <p className="text-xs text-[var(--foreground)] mt-1">
          Email address cannot be changed here. Contact support if needed.
        </p>
      </div>

      {/* Display name */}
      <div className="border-t border-[var(--border)] pt-8">
        <label
          htmlFor="full-name"
          className="block text-xs uppercase tracking-widest text-[var(--foreground)] mb-2"
        >
          Display Name
        </label>
        <input
          id="full-name"
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setStatus("idle"); }}
          placeholder="Your name"
          className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--heading)] transition-colors"
        />
      </div>

      {/* Save */}
      <div className="border-t border-[var(--border)] pt-8 flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "saving" || !userId}
          className="px-6 py-3 bg-accent text-white text-base rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "saving" ? "Saving…" : "Save changes"}
        </button>
        {status === "saved" && (
          <p className="text-sm text-[var(--foreground)]">Saved.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">Could not save. Please try again.</p>
        )}
      </div>
    </form>
  );
}
