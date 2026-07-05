"use client";

import { useEffect, useState } from "react";
import { supabase, RESULTS_TABLE } from "@/lib/supabase";

export default function CounterBanner() {
  const [count, setCount] = useState<number | null>(null);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchCount() {
      const { count: rowCount, error } = await supabase
        .from(RESULTS_TABLE)
        .select("*", { count: "exact", head: true });

      if (!error && isMounted) {
        setCount(rowCount ?? 0);
      } else if (isMounted) {
        setCount(0);
      }
    }

    fetchCount();

    const channel = supabase
      .channel("mbti_results_count")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: RESULTS_TABLE },
        () => {
          if (!isMounted) return;
          setCount((prev) => (prev ?? 0) + 1);
          setBump(true);
          setTimeout(() => setBump(false), 400);
        },
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-4 py-2 text-sm font-medium text-indigo-100 backdrop-blur-sm animate-pulse-glow">
      <span aria-hidden>👥</span>
      <span>
        이미{" "}
        <span
          className={`font-bold text-cyan-300 tabular-nums ${bump ? "animate-count-pop" : ""}`}
        >
          {count === null ? "···" : count.toLocaleString("ko-KR")}
        </span>
        명의 동료들이 자신의 부캐를 확인했어요!
      </span>
    </div>
  );
}
