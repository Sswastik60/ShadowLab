import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { CheckCircle2, AlertTriangle, Info, X, Zap, ShieldCheck } from 'lucide-react';

export default function ToastNotification() {
  const { notification, showNotification } = useProject();

  if (!notification) return null;

  const getStyle = () => {
    switch (notification.type) {
      case 'success':
        return {
          bg: 'bg-neutral-950/90 border-emerald-500/40 glow-emerald',
          badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          icon: CheckCircle2,
          iconColor: 'text-emerald-400',
          title: 'Success',
        };
      case 'warning':
      case 'chaos':
        return {
          bg: 'bg-neutral-950/90 border-amber-500/40 glow-rose',
          badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          icon: AlertTriangle,
          iconColor: 'text-amber-400',
          title: 'Chaos Warning',
        };
      case 'error':
        return {
          bg: 'bg-neutral-950/90 border-rose-500/40',
          badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
          icon: AlertTriangle,
          iconColor: 'text-rose-400',
          title: 'Error',
        };
      default:
        return {
          bg: 'bg-neutral-950/90 border-emerald-500/30',
          badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          icon: Info,
          iconColor: 'text-emerald-400',
          title: 'Notification',
        };
    }
  };

  const style = getStyle();
  const IconComponent = style.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className={`glass-panel max-w-md p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-start gap-3.5 ${style.bg}`}>
        <div className={`p-2 rounded-xl border ${style.badge} shrink-0 mt-0.5`}>
          <IconComponent className="h-5 w-5" />
        </div>

        <div className="flex-1 pr-2">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-300 font-mono">
              {style.title}
            </span>
            <span className="text-[9px] text-neutral-500 font-mono">JUST NOW</span>
          </div>
          <p className="text-xs font-medium text-white leading-snug">
            {notification.message}
          </p>
        </div>

        <button
          onClick={() => showNotification(null)}
          className="text-neutral-500 hover:text-neutral-300 p-1 rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
