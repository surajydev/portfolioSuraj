'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { NODES, getUniqueConnections, NodeData } from '@/lib/nodes';

interface NeuralNetworkProps {
  onNodeClick: (nodeId: string, x: number, y: number) => void;
  visible: boolean;
}

interface NodePosition {
  x: number;
  y: number;
}

export default function NeuralNetwork({ onNodeClick, visible }: NeuralNetworkProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dims, setDims] = useState({ w: 1200, h: 800 });
  const [positions, setPositions] = useState<Record<string, NodePosition>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const dragMoved = useRef(false);
  const connections = getUniqueConnections();

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setDims({ w, h });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Initialize positions from percentage-based data
  useEffect(() => {
    const pos: Record<string, NodePosition> = {};
    NODES.forEach((node) => {
      pos[node.id] = {
        x: (node.x / 100) * dims.w,
        y: (node.y / 100) * dims.h,
      };
    });
    setPositions(pos);
  }, [dims]);

  const getPos = useCallback(
    (id: string) => positions[id] || { x: 0, y: 0 },
    [positions]
  );

  const handlePointerDown = (e: React.PointerEvent, nodeId: string) => {
    e.preventDefault();
    setDragging(nodeId);
    setDragStart({ x: e.clientX, y: e.clientY });
    dragMoved.current = false;
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    if (dragStart) {
      const dx = Math.abs(e.clientX - dragStart.x);
      const dy = Math.abs(e.clientY - dragStart.y);
      if (dx > 5 || dy > 5) dragMoved.current = true;
    }
    const margin = 40;
    const nx = Math.max(margin, Math.min(dims.w - margin, e.clientX));
    const ny = Math.max(margin, Math.min(dims.h - margin, e.clientY));
    setPositions((prev) => ({ ...prev, [dragging]: { x: nx, y: ny } }));
  };

  const handlePointerUp = (nodeId: string) => {
    if (!dragMoved.current) {
      const pos = getPos(nodeId);
      onNodeClick(nodeId, pos.x, pos.y);
    }
    setDragging(null);
    setDragStart(null);
  };

  const getCurvePath = (from: NodePosition, to: NodePosition) => {
    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const offset = len * 0.1;
    const nx = -dy / len;
    const ny = dx / len;
    const cx = mx + nx * offset;
    const cy = my + ny * offset;
    return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
  };

  // Generate satellite positions for a node
  const getSatellites = (node: NodeData, pos: NodePosition) => {
    const sats = [];
    for (let i = 0; i < node.satellites; i++) {
      const angle = (i / node.satellites) * Math.PI * 2 + (node.size * 0.01);
      const dist = node.size * 0.7 + 15;
      sats.push({
        x: pos.x + Math.cos(angle) * dist,
        y: pos.y + Math.sin(angle) * dist,
        parentX: pos.x,
        parentY: pos.y,
      });
    }
    return sats;
  };

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: 1,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      viewBox={`0 0 ${dims.w} ${dims.h}`}
      onPointerMove={handlePointerMove}
    >
      <defs>
        {NODES.map((node) => (
          <filter key={`glow-${node.id}`} id={`glow-${node.id}`}>
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
        {/* Traveling pulse gradient */}
        {connections.map((conn, i) => (
          <linearGradient key={`pulse-grad-${i}`} id={`pulse-grad-${i}`}>
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor={NODES.find(n => n.id === conn.from)?.color || '#00d4ff'} stopOpacity="0.8" />
            <stop offset="60%" stopColor={NODES.find(n => n.id === conn.from)?.color || '#00d4ff'} stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        ))}
      </defs>

      {/* Connection lines */}
      {connections.map((conn, i) => {
        const from = getPos(conn.from);
        const to = getPos(conn.to);
        const path = getCurvePath(from, to);
        const speed = 2 + (i % 4) * 0.8;
        const delay = i * 0.4;

        return (
          <g key={`conn-${i}`}>
            {/* Base line */}
            <path
              d={path}
              fill="none"
              stroke="rgba(0, 212, 255, 0.08)"
              strokeWidth="0.8"
            />
            {/* Traveling pulse */}
            <path
              d={path}
              fill="none"
              stroke={NODES.find(n => n.id === conn.from)?.color || '#00d4ff'}
              strokeWidth="1.5"
              strokeOpacity="0.6"
              strokeDasharray="12 80"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-92"
                dur={`${speed}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </path>
            {/* Reverse pulse on some connections */}
            {i % 2 === 0 && (
              <path
                d={path}
                fill="none"
                stroke={NODES.find(n => n.id === conn.to)?.color || '#00d4ff'}
                strokeWidth="1"
                strokeOpacity="0.3"
                strokeDasharray="8 100"
                strokeLinecap="round"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="-108"
                  to="0"
                  dur={`${speed + 1}s`}
                  begin={`${delay + 0.5}s`}
                  repeatCount="indefinite"
                />
              </path>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {NODES.map((node, idx) => {
        const pos = getPos(node.id);
        const r = node.size / 2;
        const isHovered = hoveredNode === node.id;
        const breatheDelay = idx * 0.5;

        return (
          <g
            key={node.id}
            style={{ cursor: 'none' }}
            onPointerDown={(e) => handlePointerDown(e, node.id)}
            onPointerUp={() => handlePointerUp(node.id)}
            onPointerEnter={() => setHoveredNode(node.id)}
            onPointerLeave={() => setHoveredNode(null)}
          >
            {/* Satellites */}
            {getSatellites(node, pos).map((sat, si) => (
              <g key={`sat-${si}`}>
                <line
                  x1={sat.parentX}
                  y1={sat.parentY}
                  x2={sat.x}
                  y2={sat.y}
                  stroke={node.color}
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={sat.x}
                  cy={sat.y}
                  r={6}
                  fill={node.color}
                  opacity={0.4}
                >
                  <animate
                    attributeName="opacity"
                    values="0.2;0.5;0.2"
                    dur={`${3 + si * 0.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}

            {/* Outer halo */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={r * 2.5}
              fill={node.color}
              opacity={0.04}
            />

            {/* Breathing animation group */}
            <g>
              <animateTransform
                attributeName="transform"
                type="scale"
                values={`1;${isHovered ? 1.12 : 1.08};1`}
                dur="4s"
                begin={`${breatheDelay}s`}
                repeatCount="indefinite"
                additive="sum"
              />

              {/* Outer rotating dashed ring */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={r + 10}
                fill="none"
                stroke={node.color}
                strokeWidth="1"
                strokeOpacity={0.35}
                strokeDasharray="8 6"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${pos.x} ${pos.y}`}
                  to={`360 ${pos.x} ${pos.y}`}
                  dur={isHovered ? '3s' : '8s'}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Inner rotating dashed ring (counter) */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={r + 5}
                fill="none"
                stroke={node.color}
                strokeWidth="0.8"
                strokeOpacity={0.5}
                strokeDasharray="4 8"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`360 ${pos.x} ${pos.y}`}
                  to={`0 ${pos.x} ${pos.y}`}
                  dur={isHovered ? '5s' : '12s'}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Main sphere with radial gradient */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={r}
                fill={`url(#sphere-${node.id})`}
                filter={`url(#glow-${node.id})`}
              />

              {/* Inner highlight */}
              <circle
                cx={pos.x - r * 0.25}
                cy={pos.y - r * 0.25}
                r={r * 0.3}
                fill="white"
                opacity={0.15}
              />
            </g>

            {/* Sphere gradient definition */}
            <defs>
              <radialGradient
                id={`sphere-${node.id}`}
                cx="35%"
                cy="35%"
                r="65%"
              >
                <stop offset="0%" stopColor={node.color} stopOpacity="0.9" />
                <stop offset="60%" stopColor={node.color} stopOpacity="0.5" />
                <stop offset="100%" stopColor="#020817" stopOpacity="0.9" />
              </radialGradient>
            </defs>

            {/* Node label */}
            <text
              x={pos.x}
              y={pos.y + r + 22}
              textAnchor="middle"
              fill={node.color}
              fontSize="10"
              fontFamily="Orbitron, sans-serif"
              fontWeight="500"
              letterSpacing="2"
              style={{
                textTransform: 'uppercase' as const,
                filter: `drop-shadow(0 0 6px ${node.color})`,
              }}
            >
              {node.label}
            </text>

            {/* Tooltip on hover */}
            {isHovered && (
              <g>
                <rect
                  x={pos.x - 90}
                  y={pos.y - r - 40}
                  width={180}
                  height={26}
                  rx={13}
                  fill="rgba(2, 8, 23, 0.85)"
                  stroke={node.color}
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />
                <text
                  x={pos.x}
                  y={pos.y - r - 23}
                  textAnchor="middle"
                  fill="#e2e8f0"
                  fontSize="10"
                  fontFamily="Exo 2, sans-serif"
                >
                  {node.tooltip}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
