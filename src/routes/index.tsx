import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ScanLine, Store, Leaf, ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-farm.jpg";
import produceImg from "@/assets/produce.jpg";
import leafImg from "@/assets/leaf.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Farmora — Fresh Growth for Modern Agriculture" },
      { name: "description", content: "A live farmer marketplace and AI crop disease scanner. Buy and sell produce and diagnose plant issues from a single leaf photo." },
      { property: "og:title", content: "Farmora — Fresh Growth for Modern Agriculture" },
      { property: "og:description", content: "Live marketplace for farm produce and AI-powered crop disease detection." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="pt-6">
      <Hero />
      <Stats />
      <Marquee />
      <FeatureSplit />
      <HowItWorks />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6">
      <div className="hero-grain absolute inset-x-0 -top-16 h-[520px] -z-10" />

      <div className="relative text-center">
        <span className="glass pill inline-flex items-center gap-2 px-3 py-1.5 text-xs">
          <span className="size-1.5 rounded-full bg-lime" />
          Live farmer platform · v1.0
        </span>

        <h1 className="mx-auto mt-6 max-w-4xl font-sans text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
          Bring Fresh Growth
          <br />
          <span className="italic font-normal font-display text-[1.15em]">To Agriculture.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          A live marketplace for growers, buyers and cooperatives — paired with an
          AI companion that reads your crop's leaves and diagnoses disease in seconds.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/market"
            className="pill group inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-cream shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Open the market
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/scan"
            className="glass pill inline-flex items-center gap-2 px-6 py-3 text-sm font-medium"
          >
            <ScanLine className="size-4" /> Scan a leaf
          </Link>
        </div>
      </div>

      <div className="relative mt-14 overflow-hidden rounded-[2rem] shadow-soft">
        <img
          src={heroImg}
          alt="Rolling green farmland at sunrise"
          width={1920}
          height={1200}
          className="h-[480px] w-full object-cover md:h-[560px]"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
          <div className="max-w-md">
            <p className="font-display text-4xl italic text-white drop-shadow">
              The Journey to a
              <br />
              Perfection.
            </p>
          </div>
          <div className="glass pill flex items-center gap-3 self-start px-4 py-2 text-sm sm:self-end">
            <span className="size-2 rounded-full bg-lime" />
            Book a Free Field Consult
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        {/* decorative sparkles */}
        <Sparkles className="absolute left-8 top-8 size-4 text-white/70" />
        <Sparkles className="absolute right-10 top-24 size-3 text-white/60" />
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { k: "50+", v: "Years of Expertise" },
    { k: "200+", v: "Fields in Progress" },
    { k: "120,000+", v: "Farmers Worldwide" },
    { k: "$15B+", v: "Agricultural Value" },
  ];
  return (
    <section className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-2 gap-y-8 border-y border-border/60 px-6 py-10 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.v} className="text-center md:text-left">
          <div className="font-sans text-3xl font-semibold tracking-tight md:text-4xl">{s.k}</div>
          <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
        </div>
      ))}
    </section>
  );
}

function Marquee() {
  const items = ["Organic farm", "Automation farm", "Bio-medical farm", "Vertical growers", "Cooperatives", "Restaurants"];
  return (
    <section className="mx-auto mt-14 w-full max-w-6xl px-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
        <span className="pill bg-lime px-3 py-1 font-medium text-lime-foreground">Organic farm</span>
        {items.slice(1).map((t) => (
          <span key={t} className="pill border border-border/70 px-3 py-1">{t}</span>
        ))}
      </div>
    </section>
  );
}

function FeatureSplit() {
  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-6">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">2025 · Field intelligence</p>
          <h2 className="mt-4 font-sans text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Despite advances in agri-tech, farmers still lose crops to
            <span className="font-display italic"> silent disease</span>.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Farmora pairs a live buyer-seller network with an on-device style AI
            that reads leaves the way an agronomist would — spotting mildew, blight
            and nutrient stress before they spread.
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="grid gap-4 md:grid-cols-2">
            <FeatureCard
              image={produceImg}
              title="Live Market"
              stat="240+"
              statLabel="Active listings today"
              href="/market"
              iconBg="bg-white/70"
              icon={<Store className="size-4" />}
            />
            <FeatureCard
              image={leafImg}
              title="AI Crop Scan"
              stat="98%"
              statLabel="Diagnostic recall"
              href="/scan"
              accent
              iconBg="bg-lime"
              icon={<ScanLine className="size-4" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  image, title, stat, statLabel, href, accent, iconBg, icon,
}: { image: string; title: string; stat: string; statLabel: string; href: "/market" | "/scan"; accent?: boolean; iconBg: string; icon: React.ReactNode; }) {
  return (
    <Link
      to={href}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 ${accent ? "bg-lime" : "bg-card"} p-2 shadow-glass transition-transform hover:-translate-y-1`}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img src={image} alt="" width={1200} height={900} loading="lazy" className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className={`absolute right-3 top-3 grid size-9 place-items-center rounded-full ${iconBg} shadow`}>
          <ArrowUpRight className="size-4" />
        </div>
      </div>
      <div className="flex items-end justify-between p-4">
        <div>
          <p className="font-sans text-3xl font-semibold tracking-tight">{stat}</p>
          <p className="mt-0.5 text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{statLabel}</p>
        </div>
        <span className={`pill inline-flex items-center gap-1 px-2.5 py-1 text-xs ${accent ? "bg-ink text-cream" : "bg-muted"}`}>
          {icon} Open
        </span>
      </div>
    </Link>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "List or discover", d: "Farmers post produce with price, stock and location. Buyers browse in real time." },
    { n: "02", t: "Scan the field", d: "Snap a leaf, upload it, and get a disease diagnosis with treatment steps in seconds." },
    { n: "03", t: "Grow, sell, repeat", d: "Fewer crop losses. Fairer prices. A calmer season for everyone in the chain." },
  ];
  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-6">
      <div className="flex items-end justify-between gap-6">
        <h2 className="max-w-xl font-sans text-3xl font-semibold tracking-tight md:text-4xl">
          A quieter workflow, from <span className="font-display italic">seed to sale</span>.
        </h2>
        <Link to="/about" className="hidden text-sm text-muted-foreground underline underline-offset-4 md:inline">Read the story</Link>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <span className="font-sans text-sm text-muted-foreground">{s.n}</span>
              <Leaf className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-8 font-sans text-xl font-semibold tracking-tight">{s.t}</p>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-6">
      <div className="glass-dark relative overflow-hidden rounded-[2rem] p-10 md:p-14">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-lime/30 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-xs uppercase tracking-widest text-cream/60">Join the field</p>
            <h3 className="mt-3 font-sans text-4xl font-semibold tracking-tight text-cream md:text-5xl">
              Start selling — or scan your <span className="font-display italic">first leaf</span> tonight.
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/market" className="pill inline-flex items-center gap-2 bg-lime px-6 py-3 text-sm font-medium text-lime-foreground">
              <Store className="size-4" /> Enter market
            </Link>
            <Link to="/scan" className="pill inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm font-medium text-cream">
              <ScanLine className="size-4" /> Try AI scan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
