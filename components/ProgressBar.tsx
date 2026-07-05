interface ProgressBarProps {
  currentNumber: number;
  total: number;
  percent: number;
}

export default function ProgressBar({
  currentNumber,
  total,
  percent,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs font-bold tracking-widest text-slate-400">
        <span>IT 부캐 진단 중</span>
        <span className="text-cyan-300">
          [ {currentNumber} / {total} ]
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
