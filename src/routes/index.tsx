import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Activity, AlertTriangle, ArrowRight, BrainCircuit, Check, Clock3, CloudLightning, Database, Gauge, Radio, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridDiagram } from "@/components/GridDiagram";
import homeImage from "@/assets/voltra-home.jpg";
import gridImage from "@/assets/voltra-grid.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "VOLTRA — Predictive Grid Intelligence" },
    { name: "description", content: "VOLTRA analyzes electrical, equipment and contextual data to forecast outages before they happen." },
    { property: "og:title", content: "VOLTRA — Predictive Grid Intelligence" },
    { property: "og:description", content: "The lights have not gone out yet. VOLTRA sees that they are going to." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Home,
});

const history = [
  { time: "00:00", load: 45, voltage: 58 }, { time: "04:00", load: 40, voltage: 54 },
  { time: "08:00", load: 63, voltage: 55 }, { time: "12:00", load: 71, voltage: 49 },
  { time: "16:00", load: 86, voltage: 39 }, { time: "20:00", load: 67, voltage: 52 },
  { time: "24:00", load: 54, voltage: 57 },
];

function Home() {
  return <div className="overflow-hidden pt-5"><Hero /><Problem /><Pipeline /><CinematicGrid /><Dashboard /><FaultAnalysis /><Analytics /><Action /></div>;
}

function Hero() {
  return <section className="mx-auto mt-5 w-full max-w-6xl px-4 sm:px-6">
    <div className="relative min-h-[650px] overflow-hidden rounded-[2rem] md:min-h-[700px]">
      <img src={homeImage} alt="A powered modern home beside monitored transmission lines at dusk" width={1600} height={1050} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--ink)_42%,transparent),color-mix(in_oklab,var(--ink)_6%,transparent)_50%,color-mix(in_oklab,var(--ink)_70%,transparent))]" />
      <div className="relative flex min-h-[650px] flex-col justify-between p-6 text-cream sm:p-10 md:min-h-[700px] md:p-14">
        <div className="flex items-center justify-between text-xs">
          <span className="glass-dark pill inline-flex items-center gap-2 px-3 py-1.5"><span className="size-1.5 animate-pulse rounded-full bg-signal" />GRID ONLINE · 99.98%</span>
          <span className="hidden text-cream/70 sm:block">Predictive outage intelligence</span>
        </div>
        <div className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-cream/70">See the failure before it happens</p>
          <h1 className="text-5xl font-semibold leading-[1.02] sm:text-6xl md:text-7xl">Power shouldn't fail<br /><span className="font-display font-normal italic text-signal">before you're warned.</span></h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/80 sm:text-base">VOLTRA continuously reads the grid, detects abnormal behavior, and predicts outage risk early enough for operators to act.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="pill h-12 bg-signal px-6 text-signal-foreground hover:bg-signal/90"><Link to="/market">Explore live grid <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline" className="pill h-12 border-cream/20 bg-cream/10 px-6 text-cream backdrop-blur hover:bg-cream/20 hover:text-cream"><Link to="/scan">Run a prediction <Activity /></Link></Button>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[['94.2%','Grid health'],['03','Active anomalies'],['02','Predicted events']].map(([v,l]) => <div key={l} className="glass-dark rounded-2xl p-4"><p className="text-2xl font-semibold">{v}</p><p className="mt-1 text-xs text-cream/60">{l}</p></div>)}
        </div>
      </div>
    </div>
  </section>;
}

function Problem() {
  return <section className="mx-auto mt-24 w-full max-w-6xl px-6">
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-4"><p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">The problem</p><h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">Yesterday's grid tools respond <span className="font-display font-normal italic">after the dark.</span></h2></div>
      <div className="grid gap-4 md:col-span-8 md:grid-cols-2">
        <FlowPanel title="Traditional response" tone="muted" items={["Fault occurs","Power goes out","Fault detected","Engineers respond"]} footer="The outage has already happened." />
        <FlowPanel title="The VOLTRA approach" tone="signal" items={["Continuous monitoring","Anomaly detection","Risk prediction","Preventive action"]} footer="Downtime can be prevented." />
      </div>
    </div>
  </section>;
}

function FlowPanel({ title, tone, items, footer }: { title:string; tone:"muted"|"signal"; items:string[]; footer:string }) {
  return <div className={`rounded-3xl border border-border/60 p-6 ${tone === "signal" ? "bg-signal/20" : "glass"}`}><div className="flex items-center justify-between"><p className="text-sm font-semibold">{title}</p><span className={`size-2 rounded-full ${tone === "signal" ? "bg-signal" : "bg-muted-foreground"}`} /></div><div className="mt-8 space-y-2">{items.map((item,i)=><div key={item}><div className="flex items-center gap-3 rounded-xl bg-surface/70 px-4 py-3 text-sm"><span className="grid size-6 place-items-center rounded-full bg-ink text-[10px] text-cream">{i+1}</span>{item}</div>{i<items.length-1&&<div className="ml-7 h-3 w-px bg-border" />}</div>)}</div><p className="mt-5 text-xs text-muted-foreground">{footer}</p></div>;
}

function Pipeline() {
  const steps = [{i:Database,t:"Grid data",d:"Electrical, equipment and weather signals."},{i:Radio,t:"Monitoring",d:"Every feeder, bus and transformer in context."},{i:Activity,t:"Anomaly detection",d:"Subtle departures from normal behavior."},{i:BrainCircuit,t:"ML analysis",d:"Patterns compared with historical failure data."},{i:Gauge,t:"Risk prediction",d:"Probability, window and affected region."}];
  return <section className="mt-24 border-y border-border/60 bg-ink py-20 text-cream"><div className="mx-auto max-w-6xl px-6"><div className="max-w-2xl"><p className="text-xs uppercase tracking-[0.18em] text-signal">The intelligence layer</p><h2 className="mt-4 text-4xl font-semibold md:text-5xl">From raw signal to an <span className="font-display font-normal italic">actionable forecast.</span></h2></div><div className="mt-12 grid gap-3 md:grid-cols-5">{steps.map(({i:Icon,t,d},idx)=><div key={t} className="relative rounded-2xl border border-cream/10 bg-cream/5 p-5"><div className="flex items-center justify-between"><Icon className="size-5 text-signal"/><span className="text-[10px] text-cream/40">0{idx+1}</span></div><p className="mt-10 font-semibold">{t}</p><p className="mt-2 text-xs leading-relaxed text-cream/55">{d}</p></div>)}</div></div></section>;
}

function CinematicGrid() {
  return <section className="mx-auto mt-24 w-full max-w-6xl px-4 sm:px-6"><div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">A fault, caught upstream</p><h2 className="mt-3 text-4xl font-semibold md:text-5xl">Power is still flowing. <span className="font-display font-normal italic">VOLTRA is already watching.</span></h2></div><p className="max-w-sm text-sm text-muted-foreground">The electrical pulse approaches an unstable segment. Anomaly signals rise before downstream service is interrupted.</p></div><div className="relative overflow-hidden rounded-[2rem]"><img src={gridImage} alt="Transmission towers monitored during an approaching electrical anomaly" width={1600} height={900} loading="lazy" className="h-[520px] w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10"/><div className="absolute inset-x-[12%] top-[46%] h-0.5 power-line"/><div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3"><div className="glass-dark rounded-2xl p-4"><p className="text-[10px] uppercase text-cream/50">Signal</p><p className="mt-1 text-sm text-cream">Grid anomaly detected</p></div><div className="glass-dark rounded-2xl p-4"><p className="text-[10px] uppercase text-cream/50">Location</p><p className="mt-1 text-sm text-cream">Transmission Segment 04</p></div><div className="rounded-2xl bg-signal p-4 text-signal-foreground"><p className="text-[10px] uppercase opacity-60">Outage probability</p><p className="mt-1 text-2xl font-semibold">87%</p></div></div></div></section>;
}

function Dashboard() {
  return <section className="mx-auto mt-24 w-full max-w-6xl px-6"><div className="grid gap-8 lg:grid-cols-[.85fr_1.6fr]"><div><p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Live grid</p><h2 className="mt-4 text-4xl font-semibold">A clear view of <span className="font-display font-normal italic">what changes next.</span></h2><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Healthy components stay quiet. Emerging risk rises into view with a clear location, timeline and evidence trail.</p><div className="mt-8 grid grid-cols-2 gap-3"><Metric icon={ShieldCheck} value="94.2%" label="Overall health" status="Stable"/><Metric icon={AlertTriangle} value="12.4%" label="Grid risk" status="Low"/><Metric icon={Activity} value="03" label="Anomalies" status="Active"/><Metric icon={Clock3} value="02" label="Predictions" status="Next 24h"/></div></div><div className="glass rounded-3xl p-3"><div className="flex items-center justify-between px-3 py-2"><div><p className="text-sm font-semibold">Northern distribution network</p><p className="text-[10px] text-muted-foreground">LIVE · 08:42:19 UTC</p></div><span className="pill bg-signal/20 px-3 py-1 text-[10px] font-medium">SYNCHRONIZED</span></div><GridDiagram /></div></div></section>;
}

function Metric({icon:Icon,value,label,status}:{icon:typeof Activity;value:string;label:string;status:string}) { return <div className="rounded-2xl border border-border/70 bg-card p-4"><Icon className="size-4 text-muted-foreground"/><p className="mt-5 text-2xl font-semibold">{value}</p><p className="text-xs text-muted-foreground">{label}</p><p className="mt-3 text-[10px] uppercase text-foreground">● {status}</p></div> }

function FaultAnalysis() {
  const factors=[["Voltage instability",82],["Load anomaly",76],["Historical correlation",67],["Temperature",58]] as const;
  return <section className="mx-auto mt-24 w-full max-w-6xl px-6"><div className="glass-dark overflow-hidden rounded-[2rem] p-6 md:p-10"><div className="grid gap-10 md:grid-cols-2"><div><div className="flex items-center gap-2 text-xs text-signal"><AlertTriangle className="size-4"/> ELEVATED RISK</div><h2 className="mt-5 text-4xl font-semibold text-cream">Transmission Segment 04</h2><p className="mt-3 text-sm text-cream/55">Signals show a pattern strongly correlated with equipment failure.</p><div className="mt-8 grid grid-cols-3 gap-3"><div><p className="text-3xl font-semibold text-signal">87%</p><p className="text-[10px] text-cream/45">OUTAGE RISK</p></div><div><p className="text-3xl font-semibold text-cream">2.8h</p><p className="text-[10px] text-cream/45">PREDICTED TIME</p></div><div><p className="text-3xl font-semibold text-cream">04</p><p className="text-[10px] text-cream/45">AFFECTED FEEDERS</p></div></div><Button asChild className="pill mt-8 bg-signal text-signal-foreground hover:bg-signal/90"><Link to="/scan">Open full prediction <ArrowRight/></Link></Button></div><div className="rounded-2xl bg-cream/5 p-5"><p className="text-xs uppercase text-cream/45">Why VOLTRA predicts 87%</p><div className="mt-6 space-y-5">{factors.map(([name,v])=><div key={name}><div className="mb-2 flex justify-between text-xs text-cream/75"><span>{name}</span><span>{v}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-cream/10"><div className="h-full rounded-full bg-signal" style={{width:`${v}%`}}/></div></div>)}</div></div></div></div></section>;
}

function Analytics() {
  return <section className="mx-auto mt-24 w-full max-w-6xl px-6"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Historical intelligence</p><h2 className="mt-4 text-4xl font-semibold">Every event makes the next <span className="font-display font-normal italic">prediction sharper.</span></h2></div><p className="max-w-sm text-sm text-muted-foreground">Review how load, voltage and faults move together over time.</p></div><div className="mt-10 grid gap-4 md:grid-cols-[2fr_1fr]"><div className="rounded-3xl border border-border/60 bg-card p-5"><div className="flex items-center justify-between"><p className="text-sm font-semibold">Grid performance · 24 hours</p><span className="text-[10px] text-muted-foreground">LOAD / VOLTAGE STABILITY</span></div><div className="mt-6 h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={history}><defs><linearGradient id="load" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--color-signal)" stopOpacity={.45}/><stop offset="1" stopColor="var(--color-signal)" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="var(--color-border)" vertical={false}/><XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize:10,fill:'var(--color-muted-foreground)'}}/><Tooltip/><Area type="monotone" dataKey="load" stroke="var(--color-signal)" fill="url(#load)" strokeWidth={2}/><Area type="monotone" dataKey="voltage" stroke="var(--color-foreground)" fill="transparent" strokeWidth={1.5}/></AreaChart></ResponsiveContainer></div></div><div className="rounded-3xl bg-signal p-6 text-signal-foreground"><CloudLightning className="size-6"/><p className="mt-12 text-5xl font-semibold">−38%</p><p className="mt-2 text-sm font-medium">Unplanned downtime</p><p className="mt-4 text-xs leading-relaxed opacity-65">Early warnings turn emergency repairs into scheduled interventions.</p></div></div></section>;
}

function Action() {
  const [sent,setSent]=useState(false);
  return <section className="mx-auto mt-24 w-full max-w-6xl px-6"><div className="rounded-[2rem] border border-border/60 bg-signal p-8 text-signal-foreground md:p-14"><div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end"><div><p className="text-xs uppercase tracking-[0.18em] opacity-60">The lights are still on</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold md:text-6xl">Make sure they <span className="font-display font-normal italic">stay that way.</span></h2></div><div><p className="text-sm leading-relaxed opacity-70">Early warning gives teams time to investigate, maintain and protect service before failure.</p><Button onClick={()=>setSent(true)} className="pill mt-6 bg-ink text-cream hover:bg-ink/90">{sent?<><Check/> Demo requested</>:<>Request operator demo <ArrowRight/></>}</Button></div></div></div></section>;
}
