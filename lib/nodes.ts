export interface NodeData {
  id: string;
  label: string;
  tooltip: string;
  x: number; // percentage of viewport
  y: number;
  size: number; // diameter in px
  color: string;
  satellites: number;
  connections: string[];
}

export const NODES: NodeData[] = [
  {
    id: 'home',
    label: 'Suraj Yadav',
    tooltip: 'Full Stack Developer & UI/UX Designer',
    x: 50,
    y: 50,
    size: 80,
    color: '#00d4ff',
    satellites: 3,
    connections: ['about', 'skills', 'projects', 'education', 'training', 'certificates', 'contact'],
  },
  {
    id: 'about',
    label: 'About Me',
    tooltip: 'Who I am and what drives me',
    x: 25,
    y: 30,
    size: 55,
    color: '#00d4ff',
    satellites: 2,
    connections: ['home', 'skills', 'education'],
  },
  {
    id: 'skills',
    label: 'Skills',
    tooltip: 'Languages, frameworks, and tools I use',
    x: 72,
    y: 28,
    size: 55,
    color: '#00ff9d',
    satellites: 3,
    connections: ['home', 'projects', 'about'],
  },
  {
    id: 'projects',
    label: 'Projects',
    tooltip: 'Things I have built and designed',
    x: 78,
    y: 58,
    size: 65,
    color: '#0066ff',
    satellites: 3,
    connections: ['home', 'skills', 'certificates'],
  },
  {
    id: 'education',
    label: 'Education',
    tooltip: 'Academic background and qualifications',
    x: 30,
    y: 68,
    size: 55,
    color: '#00b4d8',
    satellites: 2,
    connections: ['home', 'about', 'training'],
  },
  {
    id: 'training',
    label: 'Training',
    tooltip: 'Specialized courses and certifications',
    x: 18,
    y: 52,
    size: 48,
    color: '#00ff9d',
    satellites: 2,
    connections: ['home', 'education', 'certificates'],
  },
  {
    id: 'certificates',
    label: 'Certificates',
    tooltip: 'Professional credentials and achievements',
    x: 62,
    y: 78,
    size: 48,
    color: '#00b4d8',
    satellites: 2,
    connections: ['home', 'projects', 'training'],
  },
  {
    id: 'contact',
    label: 'Contact',
    tooltip: 'Get in touch with me',
    x: 45,
    y: 20,
    size: 55,
    color: '#00d4ff',
    satellites: 2,
    connections: ['home', 'about', 'projects'],
  },
];

export interface Connection {
  from: string;
  to: string;
}

export function getUniqueConnections(): Connection[] {
  const seen = new Set<string>();
  const connections: Connection[] = [];
  NODES.forEach((node) => {
    node.connections.forEach((targetId) => {
      const key = [node.id, targetId].sort().join('-');
      if (!seen.has(key)) {
        seen.add(key);
        connections.push({ from: node.id, to: targetId });
      }
    });
  });
  return connections;
}
