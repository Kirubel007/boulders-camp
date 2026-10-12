"use client";

import { useState } from "react";
import { home } from "@/lib/content";
import Icon from "./Icon";

// Lead magnet: journey guide in exchange for an email. Front-end only, nothing is sent.
export default function GuideSignup() {
  const { guide } = home;
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="mx-auto grid max-w-7xl items-center gap-8 border-b border-sand/10 px-5 pb-16 md:grid-cols-2 md:px-10">
      <div>
        <p className="flex items-center gap-2 text-dusk">
          <Icon name="download" className="size-5" />
          <span className="eyebrow">Free download</span>
        </p>
        <h2 className="mt-3 font-serif text-3xl text-sand md:text-4xl">{guide.title}</h2>
        <p className="mt-2 text-sm text-sand/70">{guide.body}</p>
      </div>
      {done ? (
        <p className="text-sm text-sand" role="status">
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
          className="flex flex-col gap-3 sm:flex-row"
        >
          <label className="flex-1">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              autoComplete="email"
              className="w-full border-b border-sand/30 bg-transparent py-3 text-sand placeholder:text-sand/40 focus:border-dusk focus:outline-none"
            />
            {error && <span className="mt-2 block text-xs text-[#f0b48a]">{error}</span>}
          </label>
          <button type="submit" className="btn-primary self-start">
            {guide.cta}
          </button>
        </form>
      )}
    </div>
  );
}
