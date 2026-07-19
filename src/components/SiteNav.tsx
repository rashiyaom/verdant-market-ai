import { Link, useRouterState } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/market", label: "Market" },
  { to: "/scan", label: "AI Scan" },
  { to: "/about", label: "About" },
] as const;

export function SiteNav() {
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <header className="sticky top-4 z-50 mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6">
      <Link to="/" className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-xl bg-ink text-lime">
          <Leaf className="size-4" />
        </span>
        <span className="text-lg font-semibold tracking-tight">Farmora</span>
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
          className="pill hidden border border-border/70 bg-white/60 px-4 py-2 text-sm backdrop-blur sm:inline-flex"
        >
          Scan a leaf
        </Link>
        <Link
          to="/market"
          className="pill inline-flex items-center gap-1.5 bg-lime px-4 py-2 text-sm font-medium text-lime-foreground shadow-glass"
        >
          Open market
        </Link>
      </div>
    </header>
  );
}
