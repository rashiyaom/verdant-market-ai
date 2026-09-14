import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Zap } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/market", label: "Live Grid" },
  { to: "/scan", label: "Prediction" },
  { to: "/about", label: "Technology" },
] as const;

export function SiteNav() {
  const { location } = useRouterState();
  const path = location.pathname;
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-3 z-50 mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6">
      <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
        <span className="grid size-9 place-items-center rounded-xl bg-ink text-signal shadow-glow">
          <Zap className="size-4 fill-current" />
        </span>
        <span className="text-lg font-semibold">VOLTRA</span>
      </Link>

      <nav className="glass pill hidden items-center gap-1 px-2 py-1.5 md:flex">
        {links.map((l) => {
          const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
          return (
            <Link
              key={l.to}
              to={l.to}
              className={`pill px-4 py-2 text-sm transition-colors ${
                active ? "bg-ink text-cream" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <Link
          to="/scan"
          className="pill hidden border border-border/70 bg-surface/60 px-4 py-2 text-sm backdrop-blur sm:inline-flex"
        >
          Run prediction
        </Link>
        <Link
          to="/market"
          className="pill hidden items-center gap-1.5 bg-signal px-4 py-2 text-sm font-medium text-signal-foreground shadow-glass sm:inline-flex"
        >
          Open live grid
        </Link>
        <button type="button" aria-label="Toggle navigation" onClick={() => setOpen((v) => !v)} className="glass grid size-10 place-items-center rounded-full md:hidden"><Menu className="size-4" /></button>
      </div>
      {open && <nav className="glass absolute inset-x-4 top-12 grid gap-1 rounded-2xl p-2 md:hidden">{links.map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm hover:bg-muted">{l.label}</Link>)}</nav>}
    </header>
  );
}
