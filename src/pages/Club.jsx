import { useEffect, useState } from "react";
import logo from "../assets/smallLogo.svg";

const teams = {
  "금융 IT팀": "동아리 펀드 자금을 운용하는 부서 주식투자 경험자 우대 + 운용 성과 보수 지급 (벤치마크 초과수익률 비례) / 투자할 기업 재무제표에 대한 이해 & 기초 이론 바탕의 기업 실적 및 가치 분석\n(실제 펀드 자금을 운영하는 만큼 실력과 책임감 중요)\n- 자산운용부서 내 리서치팀과 리스크관리팀",
  "매크로 팀": "",
  "트레이딩 팀": "",
  "자산 운용 팀": "",
  "증권 1팀": "",
  "증권 2팀": "",
};

const teamList = ["금융 IT팀", "매크로 팀", "트레이딩 팀", "자산 운용 팀", "증권 1팀", "증권 2팀"];

const Club = () => {
  const [selected, setSelected] = useState("금융 IT팀");

  useEffect(() => {
    document.title = "SISC | 동아리 소개";
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero */}
      <div className="flex items-end justify-center min-h-[200px] md:min-h-[260px] pb-10 pt-20 md:pt-0">
        <div className="text-center">
          <h2 className="text-white text-2xl md:text-[32px] font-bold mb-4">동아리 소개</h2>
          <div className="w-48 border-b-2 border-white mx-auto" />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white flex-1 min-h-screen">
        <div className="max-w-[1200px] mx-auto flex flex-row gap-8 md:gap-16 px-6 md:px-10 py-8 md:py-12">
          {/* Sidebar */}
          <div className="w-28 md:w-52 shrink-0">
            {/* Logo + Club name — hidden on mobile */}
            <div className="hidden md:flex items-center gap-3 mb-10">
              <img src={logo} alt="SISC" className="w-12 h-12 shrink-0" />
              <span className="font-dinCondensed text-[#1e3a8a] font-bold text-[15px] leading-snug">
                Sejong Investment<br />Scholars Club
              </span>
            </div>

            {/* Filter */}
            <p className="text-gray-400 text-xs mb-3">Filter</p>
            <div className="flex flex-col border-l-2 border-gray-200 pl-4 gap-4">
              {teamList.map((team) => (
                <button
                  key={team}
                  onClick={() => setSelected(team)}
                  className={`text-left text-sm transition-colors ${
                    selected === team
                      ? "text-[#1e3a8a] font-semibold"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {team}
                </button>
              ))}
            </div>
          </div>

          {/* Team content */}
          <div className="flex-1 pt-1">
            <h3 className="text-[#1a1a1a] text-2xl md:text-4xl font-bold mb-6 md:mb-8">{selected}</h3>
            <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
              {teams[selected]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Club;
