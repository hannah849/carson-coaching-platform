"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

interface Fields {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { firstName: "", lastName: "", email: "", subject: "", message: "" };

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (!fields.firstName.trim()) errors.firstName = "First name is required.";
  if (!fields.lastName.trim()) errors.lastName = "Last name is required.";
  if (!fields.email.trim()) errors.email = "Email is required.";
  else if (!validateEmail(fields.email)) errors.email = "Please enter a valid email address.";
  if (!fields.subject.trim()) errors.subject = "Subject is required.";
  if (!fields.message.trim()) errors.message = "Message is required.";
  else if (fields.message.trim().length < 10) errors.message = "Please enter a message (at least 10 characters).";
  return errors;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-600 mt-1">{message}</p>;
}

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function update(key: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate(fields);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
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
      <div className="border border-[var(--border)] p-8">
        <p className="font-serif text-2xl text-[var(--foreground)] mb-3">Message received.</p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Thank you for reaching out. Carson will be in touch within 1–2 business days.
        </p>
      </div>
    );
  }

  const isSubmitting = formState === "submitting";

  const inputClass = (hasError: boolean) =>
    `border ${hasError ? "border-red-400" : "border-[var(--border)]"} px-4 py-3 text-sm bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--heading)] disabled:opacity-50 w-full`;

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-[var(--border)] p-8">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-[var(--foreground)]">First name</label>
            <input type="text" value={fields.firstName} onChange={update("firstName")} disabled={isSubmitting} className={inputClass(!!fieldErrors.firstName)} />
            <FieldError message={fieldErrors.firstName} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-[var(--foreground)]">Last name</label>
            <input type="text" value={fields.lastName} onChange={update("lastName")} disabled={isSubmitting} className={inputClass(!!fieldErrors.lastName)} />
            <FieldError message={fieldErrors.lastName} />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-[var(--foreground)]">Email</label>
          <input type="email" value={fields.email} onChange={update("email")} disabled={isSubmitting} className={inputClass(!!fieldErrors.email)} />
          <FieldError message={fieldErrors.email} />
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-[var(--foreground)]">Subject</label>
          <input type="text" value={fields.subject} onChange={update("subject")} disabled={isSubmitting} className={inputClass(!!fieldErrors.subject)} />
          <FieldError message={fieldErrors.subject} />
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-[var(--foreground)]">Message</label>
          <textarea rows={5} value={fields.message} onChange={update("message")} disabled={isSubmitting} className={`${inputClass(!!fieldErrors.message)} resize-none`} />
          <FieldError message={fieldErrors.message} />
        </div>

        {errorMessage && (
          <p className="text-xs text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-white px-6 py-3 text-base rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isSubmitting ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
