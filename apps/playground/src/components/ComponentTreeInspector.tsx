import React from "react";
import type { ArtifactInstance } from "@interactive-artifact/core";
import type { StructuredNode, MicroComponent, Port } from "@interactive-artifact/protocol";

interface ComponentTreeInspectorProps {
  artifact: ArtifactInstance | null;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export const ComponentTreeInspector: React.FC<ComponentTreeInspectorProps> = ({
  artifact,
  selectedId,
  onSelect
}) => {
  if (!artifact) {
    return <div className="p-4 text-xs text-slate-400">No active artifact loaded</div>;
  }

  const def = artifact.definition;

  const renderMicroComponent = (comp: MicroComponent, depth = 2) => {
    const isSelected = selectedId === comp.id;
    return (
      <div key={comp.id} style={{ paddingLeft: `${depth * 14}px` }} className="my-0.5">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(comp.id);
          }}
          className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs cursor-pointer transition-colors ${
            isSelected ? "bg-indigo-600 text-white font-medium" : "hover:bg-slate-800 text-slate-300"
          }`}
        >
          <span className="text-[10px] text-indigo-400 font-mono">??</span>
          <span className="font-mono text-slate-100">{comp.id}</span>
          <span className="text-[10px] opacity-60">({comp.type})</span>
          {comp.props?.label && (
            <span className="text-[10px] px-1 bg-slate-700/60 rounded text-slate-300 truncate max-w-[100px]">
              "{String(comp.props.label)}"
            </span>
          )}
        </div>
        {comp.children?.map(c => renderMicroComponent(c, depth + 1))}
      </div>
    );
  };

  const renderPort = (port: Port, depth = 2) => {
    const isSelected = selectedId === port.id;
    return (
      <div key={port.id} style={{ paddingLeft: `${depth * 14}px` }} className="my-0.5">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(port.id);
          }}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs cursor-pointer transition-colors ${
            isSelected ? "bg-emerald-600 text-white font-medium" : "hover:bg-slate-800 text-slate-400"
          }`}
        >
          <span className="text-[10px] text-emerald-400 font-mono">?</span>
          <span className="font-mono text-slate-200">{port.id}</span>
          <span className="text-[10px] text-emerald-400">({port.direction})</span>
          {port.dataType && <span className="text-[10px] opacity-60 font-mono">[{port.dataType}]</span>}
        </div>
      </div>
    );
  };

  const renderNode = (el: StructuredNode) => {
    const isSelected = selectedId === el.id;
    const hasHeader = Boolean(el.header);
    const hasBody = Boolean(el.body);
    const hasFooter = Boolean(el.footer);
    const hasPorts = Boolean(el.ports && el.ports.length > 0);

    return (
      <div key={el.id} className="mb-2">
        <div
          onClick={() => onSelect(el.id)}
          className={`flex items-center justify-between px-2.5 py-1.5 rounded text-xs cursor-pointer font-medium transition-colors ${
            isSelected ? "bg-blue-600 text-white shadow-sm" : "bg-slate-800/80 hover:bg-slate-800 text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-blue-400 font-mono">??</span>
            <span className="font-mono">{el.id}</span>
            <span className="text-[10px] opacity-70 font-normal">
              ({el.header?.title ?? el.props?.label ?? el.type})
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {el.position.x},{el.position.y}
          </span>
        </div>

        {/* Regions */}
        <div className="border-l border-slate-700/60 ml-3.5 my-1 pl-1">
          {/* Header */}
          {hasHeader && (
            <div className="pl-3 py-0.5 text-[11px] text-slate-400">
              <span className="text-amber-400 font-mono text-[10px]">header:</span> "{el.header?.title}"
              {el.header?.badge && <span className="ml-1 text-[9px] px-1 bg-amber-950/60 text-amber-300 rounded">[{el.header.badge}]</span>}
              {el.header?.actions?.map(a => renderMicroComponent(a, 1))}
            </div>
          )}

          {/* Body Sections */}
          {hasBody && (
            <div className="pl-3 py-0.5 text-[11px] text-slate-400">
              <span className="text-sky-400 font-mono text-[10px]">body:</span>
              {el.body?.sections?.map(s => renderMicroComponent(s, 1))}
            </div>
          )}

          {/* Footer */}
          {hasFooter && (
            <div className="pl-3 py-0.5 text-[11px] text-slate-400">
              <span className="text-purple-400 font-mono text-[10px]">footer:</span>
              {el.footer?.content && <span className="ml-1 text-[10px] italic">"{el.footer.content}"</span>}
              {el.footer?.actions?.map(a => renderMicroComponent(a, 1))}
            </div>
          )}

          {/* Ports */}
          {hasPorts && (
            <div className="pl-3 py-0.5 text-[11px] text-slate-400">
              <span className="text-emerald-400 font-mono text-[10px]">ports ({el.ports?.length}):</span>
              {el.ports?.map(p => renderPort(p, 1))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-3 select-none">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs font-semibold text-slate-300">
        <span>Component Hierarchy ({def.elements.length} Nodes)</span>
        <span className="text-[10px] text-slate-500 font-mono">{def.id}</span>
      </div>
      <div className="space-y-1">
        {def.elements.map(el => renderNode(el as StructuredNode))}
      </div>
    </div>
  );
};
