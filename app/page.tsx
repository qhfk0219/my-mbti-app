import Link from "next/link";
import CounterBanner from "@/components/CounterBanner";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md animate-fade-slide-in rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-xl shadow-black/40 backdrop-blur-sm">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">
          MY IT ALTER-EGO
        </p>

        <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl">
          출근길 내 모습으로 알아보는
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
            &lsquo;IT 부캐&rsquo;
          </span>{" "}
          테스트
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
          협업 스타일부터 위기 대처법까지,
          <br />
          내 MBTI 유형에 맞는 IT 직무 페르소나는?
        </p>

        <div className="mt-6 flex justify-center">
          <CounterBanner />
        </div>

        <Link
          href="/quiz"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-600/40 transition-all hover:scale-105 hover:bg-indigo-500 active:scale-95"
        >
          내 IT 부캐 확인하러 가기
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            ➔
          </span>
        </Link>

        <p className="mt-4 text-xs text-slate-500">
          약 8개의 질문 · 1분이면 충분해요
        </p>
      </div>
    </main>
  );
}
