import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "IT 부캐 찾기 | 출근길 내 모습으로 알아보는 MBTI 테스트",
  description:
    "8개의 질문으로 알아보는 나의 IT 직장인 페르소나. 협업 스타일부터 위기 대처법까지, 내 MBTI 유형에 맞는 IT 부캐를 확인해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col relative bg-[#05060f] text-slate-100">
        <div className="fixed inset-0 -z-10 overflow-hidden bg-grid">
          <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl animate-blob" />
          <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-blob-delayed" />
          <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl animate-blob" />
        </div>
        {children}
      </body>
    </html>
  );
}
