"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PERSONAS } from "@/lib/personas";

export default function ResultView() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const typeParam = (searchParams.get("type") ?? "").toUpperCase();
  const persona = PERSONAS[typeParam];

  if (!persona) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-xl shadow-black/40 backdrop-blur-sm">
        <p className="text-lg font-bold text-white">결과를 찾을 수 없어요</p>
        <p className="mt-2 text-sm text-slate-400">
          링크가 잘못되었거나 만료된 것 같아요. 테스트를 다시 진행해주세요.
        </p>
        <Link
          href="/quiz"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-600/40 transition-all hover:scale-105 hover:bg-indigo-500 active:scale-95"
        >
          테스트 시작하러 가기
        </Link>
      </div>
    );
  }

  async function handleCopyLink() {
    const url = `${window.location.origin}/result?type=${persona.mbti}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-slide-in rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/40 backdrop-blur-sm">
      <p className="text-center text-sm font-semibold uppercase tracking-widest text-cyan-400">
        나의 IT 부캐는
      </p>

      <h1 className="mt-3 text-center text-2xl font-black leading-snug text-white sm:text-3xl">
        {persona.title}
      </h1>

      <div className="mt-4 flex justify-center">
        <span className="inline-flex rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-1.5 text-lg font-black tracking-widest text-white shadow-lg shadow-indigo-600/30">
          {persona.mbti}
        </span>
      </div>

      <p className="mt-4 text-center text-sm leading-relaxed text-slate-300">
        &ldquo;{persona.tagline}&rdquo;
      </p>

      <div className="mt-8">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          일상 속 나의 모습
        </p>
        <ul className="mt-3 flex flex-col gap-2.5">
          {persona.traits.map((trait) => (
            <li
              key={trait}
              className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-slate-200"
            >
              <span className="mt-0.5 text-cyan-400">✓</span>
              <span>{trait}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid gap-3">
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
            💚 찰떡궁합 파트너 · {persona.bestMatch.mbti}
          </p>
          <p className="mt-1 text-sm font-bold text-white">
            {persona.bestMatch.title}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
            {persona.bestMatch.reason}
          </p>
        </div>

        <div className="rounded-xl border border-rose-400/20 bg-rose-500/10 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-300">
            ⚡ 케미 주의 파트너 · {persona.worstMatch.mbti}
          </p>
          <p className="mt-1 text-sm font-bold text-white">
            {persona.worstMatch.title}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
            {persona.worstMatch.reason}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-600/40 transition-all hover:scale-105 hover:bg-indigo-500 active:scale-95"
        >
          {copied ? "링크가 복사되었어요! ✅" : "결과 링크 복사하기"}
        </button>
        <Link
          href="/quiz"
          className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-base font-bold text-slate-200 transition-all hover:scale-105 hover:bg-white/10 active:scale-95"
        >
          테스트 다시 하기
        </Link>
      </div>
    </div>
  );
}
