export default function AnalyzingScreen() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 text-center animate-fade-slide-in">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-cyan-400 border-r-indigo-400" />
      </div>
      <div>
        <p className="text-lg font-bold text-white">
          나만의 IT 부캐를 분석하는 중...
        </p>
        <p className="mt-1 text-sm text-slate-400">
          8가지 답변을 조합하고 있어요
        </p>
      </div>
    </div>
  );
}
