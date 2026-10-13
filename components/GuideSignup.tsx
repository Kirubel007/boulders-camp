"use client";

import { useState } from "react";
import { home } from "@/lib/content";
import { buttonClass } from "./ui/Button";

// Lead magnet: journey guide in exchange for an email. Front-end only, nothing is sent.
export default function GuideSignup() {
  const { guide } = home;
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="grid gap-6 border-y border-line py-10 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-12">
      <div>
        <h2 className="text-h3">{guide.title}</h2>
        <p className="text-body text-soft mt-2">{guide.body}</p>
      </div>
      {done ? (
        <p className="text-body" role="status">
          {guide.success}
        </p>
      ) : (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email address.");
            setError("");
            setDone(true);
          }}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                autoComplete="email"
                aria-invalid={!!error}
                aria-describedby={error ? "guide-error" : undefined}
                className="text-body min-h-11 w-full border border-line bg-transparent px-4 py-3 placeholder:text-ash focus:border-sand focus:outline-none"
              />
            </label>
            <button type="submit" className={buttonClass("gold")}>
              {guide.cta}
            </button>
          </div>
          {error && (
            <p id="guide-error" className="text-fine mt-2">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
