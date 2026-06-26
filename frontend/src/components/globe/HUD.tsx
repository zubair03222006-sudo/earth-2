import { AlertTriangle, Flame, Shield, Plane, Plus, Minus, RotateCw, Navigation } from "lucide-react";

const legend = [
  { icon: <span className="h-2.5 w-2.5 rounded-full bg-[#ff3344] shadow-[0_0_10px_#ff3344]" />, label: "CRITICAL ALERT" },
  { icon: <Flame className="h-3 w-3 text-[#ff7a3a]" />, label: "HIGH RISK" },
  { icon: <AlertTriangle className="h-3 w-3 text-[#ffb347]" />, label: "WARNING" },
  { icon: <Shield className="h-3 w-3 text-[#3dffa5]" />, label: "SAFE ZONE" },
];

const routes = [
  { color: "#3dffa5", label: "ROUTE — RESCUE" },
  { color: "#ff3344", label: "ROUTE — EVACUATION" },
  { color: "#3ab6ff", label: "ROUTE — SUPPLY" },
  { color: "#cbd5e1", label: "ROUTE — AIR SUPPORT" },
];

export function HUD() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 font-mono text-[10px] tracking-[0.18em] text-foreground/90">
      {/* Top bar */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#3dffa5] shadow-[0_0_12px_#3dffa5]" />
          <span className="text-foreground/70">ORBITAL COMMAND // LIVE</span>
        </div>
        <div className="flex items-center gap-6 text-foreground/60">
          <span>SECTOR 07-A</span>
          <span>LAT 00.000 · LNG 00.000</span>
          <span>SYS NOMINAL</span>
        </div>
      </div>

      {/* Corner brackets */}
      {[
        "left-4 top-12 border-l border-t",
        "right-4 top-12 border-r border-t",
        "left-4 bottom-12 border-l border-b",
        "right-4 bottom-12 border-r border-b",
      ].map((c, i) => (
        <div key={i} className={`absolute h-6 w-6 border-foreground/30 ${c}`} />
      ))}

      {/* Right controls */}
      <div className="pointer-events-auto absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 bg-background/40 backdrop-blur">
          <Navigation className="h-5 w-5 text-[#3dffa5]" />
        </div>
        <div className="flex flex-col overflow-hidden rounded-md border border-foreground/15 bg-background/40 backdrop-blur">
          <button className="p-2 hover:bg-foreground/5"><Plus className="h-3.5 w-3.5" /></button>
          <div className="h-px bg-foreground/15" />
          <button className="p-2 hover:bg-foreground/5"><Minus className="h-3.5 w-3.5" /></button>
          <div className="h-px bg-foreground/15" />
          <button className="p-2 hover:bg-foreground/5"><RotateCw className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      {/* Left telemetry */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 space-y-3 text-foreground/60">
        {[
          { l: "ACTIVE ALERTS", v: "07" },
          { l: "SAFE CORRIDORS", v: "12" },
          { l: "ASSETS IN FLIGHT", v: "34" },
          { l: "POPULATIONS", v: "2.4M" },
        ].map((s) => (
          <div key={s.l} className="border-l border-[#3dffa5]/60 pl-3">
            <div className="text-[9px] text-foreground/40">{s.l}</div>
            <div className="text-base font-light tracking-widest text-foreground/90">{s.v}</div>
          </div>
        ))}
      </div>

      {/* Bottom legend + timeline */}
      <div className="absolute inset-x-6 bottom-6 space-y-3">
        <div className="flex flex-wrap items-center gap-6 rounded-md border border-foreground/15 bg-background/40 px-5 py-3 backdrop-blur-md">
          <span className="text-foreground/50">LEGEND</span>
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-2 text-foreground/80">
              {l.icon}
              <span>{l.label}</span>
            </div>
          ))}
          <div className="mx-2 h-4 w-px bg-foreground/15" />
          {routes.map((r) => (
            <div key={r.label} className="flex items-center gap-2 text-foreground/80">
              <span className="h-0.5 w-6 rounded-full" style={{ background: r.color, boxShadow: `0 0 8px ${r.color}` }} />
              <span>{r.label}</span>
            </div>
          ))}
        </div>
        <div className="relative h-1 rounded-full bg-foreground/10">
          <div className="absolute inset-y-0 left-0 w-[62%] rounded-full bg-gradient-to-r from-[#3dffa5]/30 to-[#3dffa5]" />
          <div className="absolute left-[62%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#3dffa5] shadow-[0_0_12px_#3dffa5]" />
        </div>
        <div className="flex justify-between text-[9px] text-foreground/40">
          {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
