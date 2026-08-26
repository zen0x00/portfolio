export interface Project {
  title: string;
  description: string;
  tags: string[];
  status: 'in progress' | 'planned' | 'shipped';
}

export const projects = [
  {
    title: 'TOMORO — rehabilitation platform',
    description: 'A motion-controlled rehabilitation platform for clinics and hospitals, combining a locked-down NixOS appliance, Unity therapy games, Rust services, and connected controllers and sensors. An Android-based home rehabilitation experience is also being explored.',
    tags: ['rust', 'nixos', 'unity', 'healthtech'],
    status: 'in progress',
  },
] satisfies Project[];

export const stack = [
  ['LANGUAGE', 'Rust'], ['OS', 'Linux'], ['CONCURRENCY', 'Tokio / async'], ['SYSTEMS', 'eBPF'],
  ['PAST LIFE', 'C# / Unity'], ['TOOLING', 'CLI / TUI'], ['NETWORKING', 'TCP/UDP internals'], ['VERSION CTRL', 'Git'],
] as const;
