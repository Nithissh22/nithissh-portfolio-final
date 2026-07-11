"use client";

import { Send } from "lucide-react";
import * as React from "react";

export function ContactForm() {
  const [target, setTarget] = React.useState<"professional" | "personal">("professional");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    
    const email = target === "professional" ? "nithisshcodemeshflow@gmail.com" : "24nithissh@gmail.com";
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(message);
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <div className="relative">
        <label className="mb-4 block font-mono text-xs font-bold uppercase tracking-widest text-[var(--fg)]" htmlFor="name">
          Name
        </label>
        <input
          className="w-full border-b border-[var(--border)] bg-transparent pb-3 text-lg text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[#0a0a0a]"
          id="name"
          name="name"
          placeholder="Your name"
          required
          type="text"
        />
      </div>
      <div className="relative">
        <label className="mb-4 block font-mono text-xs font-bold uppercase tracking-widest text-[var(--fg)]" htmlFor="email">
          Email
        </label>
        <input
          className="w-full border-b border-[var(--border)] bg-transparent pb-3 text-lg text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[#0a0a0a]"
          id="email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </div>
      <div className="relative">
        <label className="mb-4 block font-mono text-xs font-bold uppercase tracking-widest text-[var(--fg)]" htmlFor="message">
          Message
        </label>
        <textarea
          className="min-h-32 w-full resize-y border-b border-[var(--border)] bg-transparent pb-3 text-lg text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[#0a0a0a]"
          id="message"
          name="message"
          placeholder="Tell me about the role, product, or idea."
          required
        />
      </div>
      
      <div className="flex flex-col gap-4 pt-4">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            SEND TO
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTarget("professional")}
              className={`px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors ${
                target === "professional" 
                  ? "bg-[#0a0a0a] text-[#f5f2ec] border border-[#0a0a0a]" 
                  : "bg-transparent border border-[#0a0a0a] text-[#0a0a0a] hover:bg-black/5"
              }`}
            >
              PROFESSIONAL
            </button>
            <button
              type="button"
              onClick={() => setTarget("personal")}
              className={`px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors ${
                target === "personal" 
                  ? "bg-[#0a0a0a] text-[#f5f2ec] border border-[#0a0a0a]" 
                  : "bg-transparent border border-[#0a0a0a] text-[#0a0a0a] hover:bg-black/5"
              }`}
            >
              PERSONAL
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="flex h-14 w-full items-center justify-center gap-3 bg-[#0a0a0a] font-mono text-sm font-bold uppercase tracking-widest text-[#f5f2ec] transition-colors hover:bg-[var(--accent)]"
        >
          <Send size={18} aria-hidden="true" />
          SEND MESSAGE
        </button>
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
          Typically responds within 24 hours
        </p>
      </div>
    </form>
  );
}
