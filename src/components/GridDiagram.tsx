import { AlertTriangle, Radio, Zap } from "lucide-react";

export type GridNode = {
  id: string;
  label: string;
  status: "stable" | "watch" | "risk";
  x: number;
  y: number;
};

const defaultNodes: GridNode[] = [
  { id: "S01", label: "North intake", status: "stable", x: 9, y: 34 },
  { id: "S02", label: "West substation", status: "stable", x: 31, y: 66 },
  { id: "S03", label: "Central bus", status: "watch", x: 52, y: 34 },
  { id: "S04", label: "Segment 04", status: "risk", x: 73, y: 65 },
  { id: "S05", label: "East feeder", status: "stable", x: 92, y: 35 },
];

export function GridDiagram({
  nodes = defaultNodes,
  selected,
  onSelect,
  compact = false,
}: {
  nodes?: GridNode[];
  selected?: string;
  onSelect?: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={`grid-map relative overflow-hidden ${compact ? "h-64" : "h-[360px] md:h-[440px]"}`}>
      <div className="absolute left-[9%] top-[34%] h-px w-[22%] power-line -rotate-[8deg]" />
      <div className="absolute left-[31%] top-[50%] h-px w-[23%] power-line rotate-[8deg]" />
      <div className="absolute left-[52%] top-[50%] h-px w-[23%] power-line -rotate-[8deg]" />
      <div className="absolute left-[73%] top-[50%] h-px w-[20%] power-line rotate-[8deg]" />
      {nodes.map((node) => {
        const isSelected = selected === node.id;
        return (
          <button
            key={node.id}
            type="button"
            aria-label={`${node.label}: ${node.status}`}
            onClick={() => onSelect?.(node.id)}
            className={`grid-node absolute -translate-x-1/2 -translate-y-1/2 text-left ${isSelected ? "is-selected" : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <span className={`node-core node-${node.status}`}>
              {node.status === "risk" ? <AlertTriangle /> : node.status === "watch" ? <Radio /> : <Zap />}
            </span>
            <span className="mt-2 hidden whitespace-nowrap text-[10px] font-medium sm:block">{node.label}</span>
            <span className="hidden text-[9px] uppercase text-muted-foreground sm:block">{node.id}</span>
          </button>
        );
      })}
      <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 text-[10px] uppercase text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-signal" />Stable</span>
        <span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-warning" />Watch</span>
        <span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-danger" />Elevated risk</span>
      </div>
    </div>
  );
}