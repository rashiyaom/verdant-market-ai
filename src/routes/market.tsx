import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { seedListings, type Listing } from "@/lib/marketData";
import { Search, MapPin, Plus, ArrowUpRight, Star, ShoppingBag, Leaf, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Live Market · Farmora" },
      { name: "description", content: "Buy and sell fresh farm produce in real time. Browse organic vegetables, fruits, grains, dairy and herbs from growers worldwide." },
      { property: "og:title", content: "Live Market · Farmora" },
      { property: "og:description", content: "Buy and sell fresh farm produce in real time on Farmora." },
    ],
  }),
  component: MarketPage,
});

const CATEGORIES = ["All", "Vegetables", "Fruits", "Grains", "Dairy", "Herbs"] as const;
const TYPES = ["All", "Sell", "Buy"] as const;

function MarketPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [organicOnly, setOrganicOnly] = useState(false);
  const [items, setItems] = useState<Listing[]>(seedListings);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [openSell, setOpenSell] = useState(false);
  const [detail, setDetail] = useState<Listing | null>(null);

  const filtered = useMemo(() => {
    return items.filter((l) => {
      if (cat !== "All" && l.category !== cat) return false;
      if (type !== "All" && l.type !== type.toLowerCase()) return false;
      if (organicOnly && !l.organic) return false;
      if (query && !`${l.title} ${l.farmer} ${l.location}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [items, cat, type, organicOnly, query]);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const it = items.find((x) => x.id === id);
    return sum + (it ? it.price * qty : 0);
  }, 0);

  return (
    <div className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Live market · updated every minute</p>
          <h1 className="mt-3 font-sans text-4xl font-semibold tracking-tight md:text-5xl">
            The farmer's <span className="font-display italic">open floor</span>.
          </h1>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Buy from growers, or list what you're harvesting this week. Prices set by
            the farmer, no middlemen, no auction hall.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenSell(true)}
            className="pill inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-sm font-medium text-cream shadow-soft"
          >
            <Plus className="size-4" /> List produce
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass mt-8 flex flex-col gap-3 rounded-2xl p-3 md:flex-row md:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-xl bg-white/70 px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search produce, farmer, region…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
        <div className="flex flex-wrap items-center gap-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`pill px-3 py-1.5 text-xs transition-colors ${cat === c ? "bg-ink text-cream" : "hover:bg-muted"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`pill px-3 py-1.5 text-xs transition-colors ${type === t ? "bg-lime text-lime-foreground" : "border border-border/70"}`}
            >
              {t}
            </button>
          ))}
          <label className="pill ml-2 inline-flex cursor-pointer items-center gap-2 border border-border/70 px-3 py-1.5 text-xs">
            <input type="checkbox" checked={organicOnly} onChange={(e) => setOrganicOnly(e.target.checked)} className="accent-current" />
            Organic
          </label>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l) => (
          <article
            key={l.id}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-2 transition-transform hover:-translate-y-1 hover:shadow-soft"
          >
            <button onClick={() => setDetail(l)} className="relative block overflow-hidden rounded-2xl">
              <img src={l.image} alt={l.title} loading="lazy" className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className={`pill absolute left-3 top-3 px-2.5 py-1 text-[11px] font-medium ${l.type === "sell" ? "bg-white/85 text-ink" : "bg-ink text-cream"}`}>
                {l.type === "sell" ? "For sale" : "Wanted"}
              </span>
              {l.organic && (
                <span className="pill absolute right-3 top-3 inline-flex items-center gap-1 bg-lime/95 px-2.5 py-1 text-[11px] font-medium text-lime-foreground">
                  <Leaf className="size-3" /> Organic
                </span>
              )}
            </button>
            <div className="flex flex-1 flex-col p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-sans text-[15px] font-semibold leading-tight">{l.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{l.farmer}</p>
                </div>
                <div className="text-right">
                  <p className="font-sans text-lg font-semibold leading-none">€{l.price.toFixed(2)}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">/{l.unit}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{l.location}</span>
                <span className="inline-flex items-center gap-1"><Star className="size-3 fill-current text-amber-500" />{l.rating}</span>
                <span>{l.stock} {l.unit} left</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => {
                    setCart((c) => ({ ...c, [l.id]: (c[l.id] ?? 0) + 1 }));
                    toast.success(`${l.title} added to cart`);
                  }}
                  className="pill flex-1 bg-ink px-3 py-2 text-xs font-medium text-cream"
                >
                  {l.type === "sell" ? "Add to cart" : "Make offer"}
                </button>
                <button onClick={() => setDetail(l)} className="pill inline-flex items-center gap-1 border border-border/70 px-3 py-2 text-xs">
                  Details <ArrowUpRight className="size-3" />
                </button>
              </div>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full glass rounded-3xl p-12 text-center text-sm text-muted-foreground">
            No listings match those filters. Try clearing them or listing your own produce.
          </div>
        )}
      </div>

      {/* Floating cart */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
          <div className="glass-dark pill flex items-center gap-4 px-5 py-3 text-sm shadow-soft">
            <span className="inline-flex items-center gap-2">
              <ShoppingBag className="size-4 text-lime" />
              {cartCount} items · €{cartTotal.toFixed(2)}
            </span>
            <button
              onClick={() => { setCart({}); toast.success("Order placed — the farmers have been notified."); }}
              className="pill bg-lime px-4 py-1.5 text-xs font-medium text-lime-foreground"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {openSell && <SellDialog onClose={() => setOpenSell(false)} onCreate={(l) => { setItems((prev) => [l, ...prev]); setOpenSell(false); toast.success("Listing published to the market."); }} />}
      {detail && <DetailDialog listing={detail} onClose={() => setDetail(null)} onAdd={(id) => { setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 })); toast.success("Added to cart"); }} />}
    </div>
  );
}

function SellDialog({ onClose, onCreate }: { onClose: () => void; onCreate: (l: Listing) => void }) {
  const [form, setForm] = useState({
    title: "", farmer: "", location: "", category: "Vegetables" as Listing["category"],
    price: 3, unit: "kg", stock: 50, organic: true, type: "sell" as Listing["type"],
  });
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm md:items-center" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h3 className="font-sans text-xl font-semibold tracking-tight">List your produce</h3>
          <button onClick={onClose} className="grid size-8 place-items-center rounded-full hover:bg-muted"><X className="size-4" /></button>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Buyers see new listings in the live feed instantly.</p>

        <div className="mt-6 grid gap-3">
          <Field label="Product title"><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" placeholder="Heirloom tomatoes" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Your farm"><input value={form.farmer} onChange={(e) => setForm({ ...form, farmer: e.target.value })} className="input" placeholder="Green Ridge Farm" /></Field>
            <Field label="Location"><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input" placeholder="Kent, UK" /></Field>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Category">
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Listing["category"] })} className="input">
                {["Vegetables","Fruits","Grains","Dairy","Herbs"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Price (€)"><input type="number" step="0.1" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="input" /></Field>
            <Field label="Unit">
              <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="input">
                {["kg","L","bunch","jar","crate"].map((u) => <option key={u}>{u}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Stock"><input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} className="input" /></Field>
            <Field label="Listing type">
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Listing["type"] })} className="input">
                <option value="sell">For sale</option>
                <option value="buy">Wanted</option>
              </select>
            </Field>
          </div>
          <label className="mt-1 inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.organic} onChange={(e) => setForm({ ...form, organic: e.target.checked })} /> Certified organic
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="pill border border-border/70 px-4 py-2 text-sm">Cancel</button>
          <button
            onClick={() => {
              if (!form.title || !form.farmer) { toast.error("Please add a title and your farm name."); return; }
              onCreate({
                id: `u_${Date.now()}`, title: form.title, farmer: form.farmer, location: form.location || "—",
                category: form.category, price: form.price, unit: form.unit, stock: form.stock, organic: form.organic,
                rating: 5.0, image: "/favicon.ico", type: form.type,
              });
            }}
            className="pill bg-lime px-5 py-2 text-sm font-medium text-lime-foreground"
          >
            Publish listing
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailDialog({ listing, onClose, onAdd }: { listing: Listing; onClose: () => void; onAdd: (id: string) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft">
        <img src={listing.image} alt={listing.title} className="h-64 w-full object-cover" />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">{listing.farmer} · {listing.location}</p>
              <h3 className="mt-1 font-sans text-2xl font-semibold tracking-tight">{listing.title}</h3>
            </div>
            <button onClick={onClose} className="grid size-8 place-items-center rounded-full hover:bg-muted"><X className="size-4" /></button>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-sans text-3xl font-semibold">€{listing.price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">/ {listing.unit}</span>
            <span className="ml-auto text-xs text-muted-foreground">{listing.stock} {listing.unit} available</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Harvested this week and stored at cellar temperature. Ships within 24 hours from the
            farm gate. Message the grower directly to arrange bulk orders or pickup.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <button onClick={() => { onAdd(listing.id); onClose(); }} className="pill flex-1 bg-ink px-5 py-3 text-sm font-medium text-cream">
              Add to cart · €{listing.price.toFixed(2)}
            </button>
            <button onClick={onClose} className="pill border border-border/70 px-5 py-3 text-sm">Message grower</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
