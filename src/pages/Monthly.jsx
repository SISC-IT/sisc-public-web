import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import smallLogo from "../assets/smallLogo.svg";
import monthlyBg from "../assets/monthly.svg";

const posts = [
  {
    id: 1,
    title: "한국전력, 에너지 시장의 균형을 다시 세우다",
    date: "1일 전",
  },
  { id: 2, title: "초보 투자자를 위한 개념·전략 이해 가이드", date: "1일 전" },
  { id: 3, title: "세투연 포트폴리오 변화와 핵심 전략 리뷰", date: "1일 전" },
  { id: 4, title: "세투연의 한 달 활동 기록과 주요 성과 요약", date: "1일 전" },
  { id: 5, title: "글로벌 매크로 환경 분석 리포트", date: "2일 전" },
  { id: 6, title: "월간 세투연 2025년 10월호", date: "2일 전" },
  { id: 7, title: "금융 IT 팀 기술 스택 업데이트 보고서", date: "3일 전" },
  { id: 8, title: "증권 분석 종합 보고서 모음", date: "3일 전" },
];

const Monthly = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "SISC | 월간 세투연";
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero */}
      <div
        className="relative flex flex-col items-center justify-center min-h-[380px] text-center px-6 pointer-events-none"
        style={{
          backgroundImage: `url(${monthlyBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 pt-20 md:pt-24 pointer-events-auto">
          <div className="inline-flex items-center gap-2 bg-[#339FFF]/10 rounded-full px-5 py-2 mb-6 md:mb-8">
            <img src={smallLogo} alt="" className="w-5 h-5" />
            <span className="text-white text-sm font-medium">월간 세투연</span>
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-snug mb-4 md:mb-5 px-4 md:px-0">
            매월 업데이트되는{" "}
            <span className="text-blue-400">세투연 콘텐츠</span>를<br />한 곳에
            모았습니다.
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            지난 한 달의 활동과 자료들을 아카이브 형식으로 정리했어요.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-black flex-1 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-10 py-10">
          <p className="text-sm text-[#7E7E7E] mb-6">
            <span className="font-bold text-[#1e3a8a]">{posts.length}개</span>의
            게시물
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => navigate(`/monthly/${post.id}`)}
                className="cursor-pointer group"
              >
                <div className="bg-gray-200 w-full aspect-[3/4] rounded mb-3 group-hover:opacity-75 transition-opacity" />
                <p className="text-sm font-medium text-white leading-snug mb-1 line-clamp-2">
                  {post.title}
                </p>
                <p className="text-xs text-gray-400">{post.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monthly;
