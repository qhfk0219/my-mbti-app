"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import AnalyzingScreen from "@/components/AnalyzingScreen";
import { supabase, RESULTS_TABLE } from "@/lib/supabase";
import {
  QUESTIONS,
  TOTAL_QUESTIONS,
  calculateMBTI,
  type AnsweredChoice,
  type QuizOption,
} from "@/lib/mbti";

const MIN_ANALYZING_MS = 1500;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function QuizPage() {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnsweredChoice[]>([]);
  const [isFading, setIsFading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const question = QUESTIONS[questionIndex];
  const isLastQuestion = questionIndex === TOTAL_QUESTIONS - 1;
  const progressPercent =
    ((questionIndex + (isFading ? 1 : 0)) / TOTAL_QUESTIONS) * 100;

  async function finalizeQuiz(finalAnswers: AnsweredChoice[]) {
    const mbtiType = calculateMBTI(finalAnswers);

    const insertPromise = (async () => {
      try {
        const { error } = await supabase
          .from(RESULTS_TABLE)
          .insert({ mbti_type: mbtiType, answers: finalAnswers });
        if (error) console.error("결과 저장 실패:", error.message);
      } catch (err) {
        console.error("결과 저장 실패:", err);
      }
    })();

    await Promise.all([insertPromise, wait(MIN_ANALYZING_MS)]);
    router.push(`/result?type=${mbtiType}`);
  }

  function handleSelect(option: QuizOption) {
    if (isFading) return;
    setIsFading(true);

    setTimeout(() => {
      const nextAnswers: AnsweredChoice[] = [
        ...answers,
        {
          questionId: question.id,
          dimension: question.dimension,
          letter: option.letter,
        },
      ];
      setAnswers(nextAnswers);

      if (isLastQuestion) {
        setIsAnalyzing(true);
        finalizeQuiz(nextAnswers);
      } else {
        setQuestionIndex((prev) => prev + 1);
        setIsFading(false);
      }
    }, 250);
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/40 backdrop-blur-sm">
        {isAnalyzing ? (
          <AnalyzingScreen />
        ) : (
          <>
            <ProgressBar
              currentNumber={questionIndex + 1}
              total={TOTAL_QUESTIONS}
              percent={progressPercent}
            />

            <div
              className={`mt-8 transition-all duration-250 ${
                isFading
                  ? "-translate-y-1 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <p className="min-h-24 text-center text-lg font-bold leading-relaxed text-white sm:text-xl">
                {question.question}
              </p>

              <div className="mt-8 flex flex-col gap-3">
                {question.options.map((option, i) => (
                  <button
                    key={option.letter}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-left text-sm leading-relaxed text-slate-200 transition-all hover:scale-105 hover:border-indigo-400/50 hover:bg-indigo-500/10 active:scale-95"
                  >
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600/80 text-xs font-bold text-white group-hover:bg-cyan-500">
                      {i === 0 ? "A" : "B"}
                    </span>
                    <span>{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
