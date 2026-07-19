import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-ink text-lime">
              <Leaf className="size-4" />
            </span>
            <span className="font-semibold">Farmora</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A calm, modern home for growers — a live marketplace for fresh produce and an AI
            companion that spots crop disease from a single photo.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Platform</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/market" className="hover:underline">Live market</Link></li>
            <li><Link to="/scan" className="hover:underline">AI crop scan</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>hello@farmora.farm</li>
            <li>Growers Guild, EU</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Farmora Cooperative</span>
          <span>Grown with care.</span>
        </div>
      </div>
    </footer>
  );
}
