import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { scanCrop, type ScanResult } from "@/lib/scan.functions";
import { toast } from "sonner";
import { Upload, Sparkles, Loader2, CheckCircle2, AlertTriangle, X, Camera, Leaf } from "lucide-react";
import leafImg from "@/assets/leaf.jpg";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "AI Crop Scan · Farmora" },
      { name: "description", content: "Upload a photo of a leaf and Farmora's AI diagnoses diseases, severity and treatment steps in seconds." },
      { property: "og:title", content: "AI Crop Scan · Farmora" },
      { property: "og:description", content: "Instant plant disease diagnosis from a single leaf photo." },
    ],
  }),
  component: ScanPage,
});

function ScanPage() {
  const call = useServerFn(scanCrop);
  const [image, setImage] = useState<string | null>(null);
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return toast.error("Please upload an image file.");
    if (file.size > 8 * 1024 * 1024) return toast.error("Image is larger than 8MB.");
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
    setResult(null);
  }, []);

  async function analyze() {
    if (!image) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await call({ data: { imageDataUrl: image, cropHint: hint || undefined } });
      setResult(res);
      toast.success(res.healthy ? "Plant looks healthy." : `Detected: ${res.disease}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6">
      <div className="grid gap-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">AI Crop Scan · Beta</p>
        <h1 className="max-w-2xl font-sans text-4xl font-semibold tracking-tight md:text-5xl">
          Show us a leaf. We'll tell you what's <span className="font-display italic">wrong</span>.
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Upload a clear photo of a single leaf or affected area. Farmora's vision model
          identifies the crop, diagnoses common diseases, and returns treatment and prevention steps.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-5">
        {/* Uploader */}
        <div className="md:col-span-2">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) onFile(f); }}
            className="glass relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-3xl p-4 text-center"
          >
            {image ? (
              <>
                <img src={image} alt="Uploaded leaf" className="absolute inset-0 h-full w-full object-cover" />
                <button
                  onClick={() => { setImage(null); setResult(null); }}
                  className="pill absolute right-3 top-3 z-10 inline-flex items-center gap-1 bg-white/90 px-3 py-1.5 text-xs"
                >
                  <X className="size-3" /> Remove
                </button>
              </>
            ) : (
              <>
                <div className="grid size-14 place-items-center rounded-2xl bg-lime/60">
                  <Camera className="size-6" />
                </div>
                <p className="mt-4 font-sans text-lg font-semibold">Drop a leaf photo</p>
                <p className="mt-1 max-w-[220px] text-xs text-muted-foreground">
                  JPG or PNG · up to 8MB · single clear leaf, natural light
                </p>
                <button onClick={() => inputRef.current?.click()} className="pill mt-5 inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-sm text-cream">
                  <Upload className="size-4" /> Choose photo
                </button>
                <button
                  onClick={async () => {
                    const res = await fetch(leafImg);
                    const blob = await res.blob();
                    const reader = new FileReader();
                    reader.onload = () => setImage(String(reader.result));
                    reader.readAsDataURL(blob);
                  }}
                  className="mt-3 text-xs text-muted-foreground underline underline-offset-4"
                >
                  or try a sample leaf
                </button>
              </>
            )}
            <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
          </div>

          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs text-muted-foreground">Crop hint (optional)</span>
              <input
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="e.g. tomato, grapevine, wheat"
                className="input"
              />
            </label>
            <button
              onClick={analyze}
              disabled={!image || loading}
              className="pill inline-flex w-full items-center justify-center gap-2 bg-lime px-5 py-3 text-sm font-medium text-lime-foreground disabled:opacity-60"
            >
              {loading ? <><Loader2 className="size-4 animate-spin" /> Analyzing…</> : <><Sparkles className="size-4" /> Diagnose plant</>}
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="md:col-span-3">
          {!result && !loading && <EmptyState />}
          {loading && <SkeletonResult />}
          {result && <ResultCard result={result} />}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  const tips = [
    "Frame a single leaf against a neutral background.",
    "Use natural daylight when possible.",
    "Include any spots, curls or discoloration in focus.",
  ];
  return (
    <div className="glass grid h-full min-h-[420px] place-items-center rounded-3xl p-10 text-center">
      <div>
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-white/70">
          <Leaf className="size-6" />
        </div>
        <p className="mt-4 font-sans text-xl font-semibold">Waiting for a photo</p>
        <p className="mt-1 text-sm text-muted-foreground">Your diagnosis appears here.</p>
        <ul className="mx-auto mt-6 max-w-xs space-y-2 text-left text-xs text-muted-foreground">
          {tips.map((t) => <li key={t} className="flex gap-2"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-lime" />{t}</li>)}
        </ul>
      </div>
    </div>
  );
}

function SkeletonResult() {
  return (
    <div className="glass rounded-3xl p-8">
      <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      <div className="mt-4 h-8 w-2/3 animate-pulse rounded bg-muted" />
      <div className="mt-8 grid gap-3">
        {[...Array(4)].map((_, i) => <div key={i} className="h-4 w-full animate-pulse rounded bg-muted" />)}
      </div>
    </div>
  );
}

function ResultCard({ result }: { result: ScanResult }) {
  const good = result.healthy;
  const sevColor = { None: "bg-lime text-lime-foreground", Mild: "bg-amber-100 text-amber-900", Moderate: "bg-orange-200 text-orange-900", Severe: "bg-red-200 text-red-900" }[result.severity] ?? "bg-muted";

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className={`flex items-center justify-between gap-4 border-b border-white/40 p-6 ${good ? "bg-lime/30" : "bg-white/40"}`}>
        <div className="flex items-center gap-3">
          <div className={`grid size-11 place-items-center rounded-2xl ${good ? "bg-lime" : "bg-ink text-cream"}`}>
            {good ? <CheckCircle2 className="size-5" /> : <AlertTriangle className="size-5" />}
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{result.crop || "Plant"}</p>
            <p className="font-sans text-2xl font-semibold tracking-tight">{good ? "Healthy" : result.disease}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`pill inline-block px-3 py-1 text-xs font-medium ${sevColor}`}>{result.severity}</span>
          <p className="mt-2 text-xs text-muted-foreground">{Math.round(result.confidence)}% confidence</p>
        </div>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        <section className="md:col-span-2">
          <p className="text-sm leading-relaxed">{result.summary}</p>
        </section>
        <Section title="Symptoms" items={result.symptoms} />
        <Section title="Likely causes" items={result.causes} />
        <Section title="Treatment" items={result.treatment} accent />
        <Section title="Prevention" items={result.prevention} />
      </div>
    </div>
  );
}

function Section({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  if (!items?.length) return null;
  return (
    <div className={`rounded-2xl border border-border/60 p-5 ${accent ? "bg-lime/25" : "bg-white/60"}`}>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
