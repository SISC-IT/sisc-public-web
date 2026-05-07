import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const posts = [
  {
    id: 1,
    title: "한국전력, 에너지 시장의 균형을 다시 세우다",
    date: "2025.11.10",
    month: "November 2025",
  },
  {
    id: 2,
    title: "초보 투자자를 위한 개념·전략 이해 가이드",
    date: "2025.11.10",
    month: "November 2025",
  },
  {
    id: 3,
    title: "세투연 포트폴리오 변화와 핵심 전략 리뷰",
    date: "2025.11.10",
    month: "November 2025",
  },
  {
    id: 4,
    title: "세투연의 한 달 활동 기록과 주요 성과 요약",
    date: "2025.11.10",
    month: "November 2025",
  },
  {
    id: 5,
    title: "글로벌 매크로 환경 분석 리포트",
    date: "2025.10.10",
    month: "October 2025",
  },
  {
    id: 6,
    title: "월간 세투연 2025년 10월호",
    date: "2025.10.10",
    month: "October 2025",
  },
  {
    id: 7,
    title: "금융 IT 팀 기술 스택 업데이트 보고서",
    date: "2025.10.10",
    month: "October 2025",
  },
  {
    id: 8,
    title: "증권 분석 종합 보고서 모음",
    date: "2025.10.10",
    month: "October 2025",
  },
];

const TOTAL_SPREADS = 6;

const MonthlyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spread, setSpread] = useState(1);

  const post = posts.find((p) => p.id === Number(id)) ?? posts[0];

  useEffect(() => {
    document.title = "SISC | 월간 세투연";
    setSpread(1);
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      {/* Header */}
      <div className="px-10 bg-black pt-6 pb-0">
        <Link
          to="/monthly"
          className="inline-flex items-center gap-2 mb-2 hover:opacity-70 transition-opacity"
        >
          <img src={logo} alt="" className="w-5 h-5" />
          <span className="font-bold text-white text-m">월간 세투연</span>
        </Link>
      </div>
      <div className="h-[8px] w-[361px] bg-gradient-to-r from-[#194A8F] via-[#1469E1] to-[#1D80F4]" />

      {/* Viewer */}
      <div className="flex-1 flex items-center justify-center relative px-10 md:px-20 py-8">
        {/* Prev */}
        <button
          onClick={() => {
            if (spread > 1) setSpread((s) => s - 1);
            else navigate("/monthly");
          }}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 text-xl transition-colors"
        >
          ‹
        </button>

        {/* Document pages — two-page on desktop, single on mobile */}
        <div className="flex gap-1 w-full max-w-[860px] shadow-lg">
          <div className="flex-1 bg-gray-300 aspect-[1/1.41] rounded-l md:rounded-l" />
          <div className="hidden md:block flex-1 bg-gray-100 aspect-[1/1.41] rounded-r" />
        </div>

        {/* Next */}
        <button
          onClick={() => {
            if (spread < TOTAL_SPREADS) setSpread((s) => s + 1);
          }}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 text-xl transition-colors"
        >
          ›
        </button>
      </div>

      {/* Page indicator */}
      <div className="text-center text-xs text-gray-400 pb-6">
        {spread * 2 - 1} – {spread * 2} / {TOTAL_SPREADS * 2}
      </div>
    </div>
  );
};

export default MonthlyDetail;
