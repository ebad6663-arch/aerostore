import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
}: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30">

      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-500/5 blur-3xl transition group-hover:bg-orange-500/10" />

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-neutral-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-white">
            {value}
          </h2>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400 transition-all group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
          {icon}
        </div>

      </div>

    </div>
  );
}