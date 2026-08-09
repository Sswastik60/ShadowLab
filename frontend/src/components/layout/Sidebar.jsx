import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Beaker, Flame, Settings, Server, ShieldAlert } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export default function Sidebar() {
  const { experiments } = useProject();

  const navItems = [
    {
      name: 'Production Overview',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Shadow Experiments',
      path: '/experiments',
      icon: Beaker,
      badge: experiments.length,
    },
    {
      name: 'Chaos Lab',
      path: '/chaos',
      icon: Flame,
      highlight: true,
    },
    {
      name: 'Settings & API',
      path: '/settings',
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 border-r border-neutral-900 bg-black p-4 flex flex-col justify-between hidden md:flex shrink-0">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Main Menu</p>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-950'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-bold text-neutral-300 border border-neutral-800">
                    {item.badge}
                  </span>
                )}
                {item.highlight && (
                  <span className="rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 px-1.5 py-0.5 text-[9px] font-extrabold uppercase">
                    HOT
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Zerops Environment Status Box */}
        <div className="rounded-2xl border border-neutral-900 bg-neutral-950 p-3 text-xs">
          <div className="flex items-center gap-2 mb-2 text-neutral-300 font-semibold">
            <Server className="h-4 w-4 text-emerald-400" />
            <span>Zerops Target</span>
          </div>
          <p className="text-[11px] text-neutral-400 mb-2">Connected to app cluster:</p>
          <div className="rounded-lg bg-black p-2 border border-neutral-900 font-mono text-[11px] text-emerald-400 flex items-center justify-between">
            <span>my-production-app</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          </div>
        </div>
      </div>

      {/* Footer Tag */}
      <div className="border-t border-neutral-900 pt-4 px-2 text-[11px] text-neutral-500 flex items-center justify-between">
        <span>ZeroOps Hackathon</span>
        <span className="text-neutral-400 font-mono">Prague UTC</span>
      </div>
    </aside>
  );
}
