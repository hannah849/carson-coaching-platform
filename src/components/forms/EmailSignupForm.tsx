"use client";

import { useState } from "react";

interface EmailSignupFormProps {
  showName?: boolean;
}

type FormState = "idle" | "submitting" | "success" | "error";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function EmailSignupForm({ showName = false }: EmailSignupFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ firstName?: string; email?: string }>({});

  function validate() {
    const errors: { firstName?: string; email?: string } = {};
    if (showName && !firstName.trim()) errors.firstName = "First name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!validateEmail(email)) errors.email = "Please enter a valid email address.";
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/email-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: showName ? firstName : undefined, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setFormState("error");
      } else {
        setFormState("success");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="py-6 text-center">
        <p className="font-serif text-xl text-[var(--foreground)] mb-2">You&rsquo;re on the list.</p>
        <p className="text-sm text-[var(--foreground)]">Check your inbox — the meditation is on its way.</p>
      </div>
    );
  }

  const isSubmitting = formState === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      {showName && (
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value); setFieldErrors((p) => ({ ...p, firstName: undefined })); }}
            disabled={isSubmitting}
            className="w-full border border-[var(--border)] px-4 py-3 text-sm bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--heading)] disabled:opacity-50"
          />
          {fieldErrors.firstName && (
            <p className="text-xs text-red-600">{fieldErrors.firstName}</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: undefined })); }}
          disabled={isSubmitting}
          className="w-full border border-[var(--border)] px-4 py-3 text-sm bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--heading)] disabled:opacity-50"
        />
        {fieldErrors.email && (
          <p className="text-xs text-red-600">{fieldErrors.email}</p>
        )}
      </div>

      {errorMessage && (
        <p className="text-xs text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-white px-6 py-3 text-base rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : "Send Me the Meditation"}
      </button>
    </form>
  );
}
