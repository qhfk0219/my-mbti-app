import { Suspense } from "react";
import type { Metadata } from "next";
import ResultView from "@/components/ResultView";

export const metadata: Metadata = {
  title: "내 IT 부캐 결과 | IT 부캐 찾기",
  description: "나의 MBTI 유형에 맞는 IT 직장인 페르소나 결과를 확인해보세요.",
};

function ResultFallback() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-400 shadow-xl shadow-black/40 backdrop-blur-sm">
      결과를 불러오는 중...
    </div>
  );
}

export default function ResultPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <Suspense fallback={<ResultFallback />}>
        <ResultView />
      </Suspense>
    </main>
  );
}
