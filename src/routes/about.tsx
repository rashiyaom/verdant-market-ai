import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-farm.jpg";
import produce from "@/assets/produce.jpg";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Farmora" },
      { name: "description", content: "Farmora is a cooperative platform for growers — combining a live farm marketplace with AI-powered crop diagnostics." },
      { property: "og:title", content: "About · Farmora" },
      { property: "og:description", content: "Meet the growers cooperative behind Farmora's marketplace and AI crop scan." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="pill bg-lime px-3 py-1 text-xs font-medium text-lime-foreground">About us</span>
        <span className="pill border border-border/70 px-3 py-1 text-xs">Journey</span>
        <span className="pill border border-border/70 px-3 py-1 text-xs">Vision</span>
        <span className="pill border border-border/70 px-3 py-1 text-xs">Mission</span>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-1.5 rounded-full bg-ink" /> Who we are at Farmora
          </p>
        </div>
        <div className="md:col-span-9">
          <h1 className="font-sans text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            With years of expertise in both farming and technology, we help growers cultivate
            smarter, harvest better yields, and shape a more <span className="font-display italic">sustainable</span> future together.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            By combining a live marketplace with agronomist-grade AI, we empower farmers to
            move produce fairly, reduce crop loss, and spend more time in the field and less
            in the paperwork.
          </p>
          <div className="mt-6">
            <Link to="/market" className="pill inline-flex items-center gap-2 border border-border/70 px-5 py-2.5 text-sm">Learn more <ArrowUpRight className="size-4" /></Link>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-4">
        <img src={heroImg} alt="" className="col-span-2 h-56 w-full rounded-3xl object-cover" loading="lazy" />
        <div className="rounded-3xl bg-muted p-6">
          <p className="font-sans text-4xl font-semibold">10+</p>
          <p className="mt-2 text-sm font-medium">Years of Agricultural Innovation</p>
          <p className="mt-2 text-xs text-muted-foreground">A decade of building tools that make precision agriculture accessible to smallholders and cooperatives alike.</p>
        </div>
        <div className="rounded-3xl bg-lime p-6 text-lime-foreground">
          <p className="font-sans text-4xl font-semibold">85%</p>
          <p className="mt-2 text-sm font-medium">Farmer Satisfaction Rate</p>
          <p className="mt-2 text-xs">Growers using Farmora report faster sales, fewer disease losses, and calmer seasons.</p>
        </div>
        <img src={produce} alt="" className="col-span-1 h-56 w-full rounded-3xl object-cover md:col-span-4" loading="lazy" />
      </div>
    </div>
  );
}
