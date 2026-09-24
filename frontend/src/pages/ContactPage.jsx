import { useState } from "react";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { toast } from "sonner";
import { usePageMeta } from "@/lib/seo";
import Reveal from "@/components/Reveal";

const REASONS = ["Recruitment", "Collaboration", "Technical discussion", "Other"];
const EMAIL = "minhazalam365@gmail.com";
const AUDIENCES = [
  { t: "Recruiters", d: "Interested in Data Engineering / Data Platform opportunities? Pick Recruitment and I'll respond fast." },
  { t: "Engineers", d: "Want to discuss data systems or distributed processing? Pick Technical discussion." },
  { t: "Builders", d: "Working on an interesting product? Pick Collaboration and let's compare notes." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "", reason: "Recruitment" });
  usePageMeta({
    title: "Contact — Minhaz Alam",
    description: "Get in touch with Minhaz Alam about data engineering opportunities, collaboration or technical discussion.",
    path: "/contact",
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const subject = `[${form.reason}] Message from ${form.name || "portfolio visitor"}`;
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your email app — your message is pre-filled.");
  };

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8">
      <Reveal>
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-accent">/// CONTACT</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Let's build something <span className="text-accent">interesting.</span>
        </h1>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="space-y-5">
            {AUDIENCES.map((a) => (
              <div key={a.t} className="rounded-xl border border-border bg-panel p-6" data-testid={`contact-audience-${a.t.toLowerCase()}`}>
                <p className="font-mono text-[10px] tracking-[0.22em] text-accent">{a.t.toUpperCase()}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-mute">{a.d}</p>
              </div>
            ))}
            <div className="rounded-xl border border-border bg-panel p-6">
              <p className="mb-4 font-mono text-[10px] tracking-[0.22em] text-accent">DIRECT</p>
              <div className="space-y-3">
                <a href={`mailto:${EMAIL}`} data-testid="direct-email" className="flex items-center gap-3 text-sm text-mute transition-colors hover:text-accent">
                  <Mail size={15} className="text-accent" /> {EMAIL}
                </a>
                <a href="https://www.linkedin.com/in/alam" target="_blank" rel="noreferrer" data-testid="direct-linkedin" className="flex items-center gap-3 text-sm text-mute transition-colors hover:text-accent">
                  <Linkedin size={15} className="text-accent" /> linkedin.com/in/alam
                </a>
                <a href="https://github.com/minhazalam" target="_blank" rel="noreferrer" data-testid="direct-github" className="flex items-center gap-3 text-sm text-mute transition-colors hover:text-accent">
                  <Github size={15} className="text-accent" /> github.com/minhazalam
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="rounded-xl border border-border bg-panel p-7" data-testid="contact-form">
            <p className="mb-6 font-mono text-[10px] tracking-[0.22em] text-accent">SEND A MESSAGE</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="cf-name" className="mb-1.5 block font-mono text-[10px] tracking-wider text-mute">NAME</label>
                <input
                  id="cf-name"
                  required
                  value={form.name}
                  onChange={set("name")}
                  data-testid="contact-name"
                  className="w-full rounded-md border border-border bg-[#0b0e14] px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="cf-email" className="mb-1.5 block font-mono text-[10px] tracking-wider text-mute">EMAIL</label>
                <input
                  id="cf-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  data-testid="contact-email"
                  className="w-full rounded-md border border-border bg-[#0b0e14] px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent/50"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="cf-reason" className="mb-1.5 block font-mono text-[10px] tracking-wider text-mute">REASON FOR CONTACTING</label>
                <select
                  id="cf-reason"
                  value={form.reason}
                  onChange={set("reason")}
                  data-testid="contact-reason"
                  className="w-full rounded-md border border-border bg-[#0b0e14] px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent/50"
                >
                  {REASONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cf-message" className="mb-1.5 block font-mono text-[10px] tracking-wider text-mute">MESSAGE</label>
                <textarea
                  id="cf-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  data-testid="contact-message"
                  className="w-full resize-y rounded-md border border-border bg-[#0b0e14] px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent/50"
                  placeholder="What would you like to discuss?"
                />
              </div>
              <button
                type="submit"
                data-testid="contact-submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 font-mono text-xs font-medium tracking-wider text-[#06121f] transition-all hover:brightness-110"
              >
                SEND MESSAGE <Send size={13} />
              </button>
              <p className="text-center font-mono text-[10px] leading-relaxed text-mute/60">
                OPENS YOUR EMAIL APP WITH THE MESSAGE PRE-FILLED — OR WRITE DIRECTLY TO {EMAIL.toUpperCase()}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
