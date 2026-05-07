import { useEffect, useState } from "react";
import profile from "../assets/profile.svg";

const allItems = [
  {
    id: 1,
    author: "운영진",
    time: "2분전",
    title: "자산 배분 전략 및 성과 보고서",
  },
  {
    id: 2,
    author: "운영진",
    time: "2분전",
    title: "미래를 디자인하는 투자 여정",
  },
  {
    id: 3,
    author: "운영진",
    time: "2분전",
    title: "목표 수익를 달성을 위한 핵심 자산 포트폴리오",
  },
  {
    id: 4,
    author: "운영진",
    time: "2분전",
    title: "리스크 대비 성장형 포트폴리오 분석",
  },
  {
    id: 5,
    author: "운영진",
    time: "5분전",
    title: "글로벌 분산 투자 전략의 이해",
  },
  {
    id: 6,
    author: "운영진",
    time: "10분전",
    title: "주식 가치 평가 기초 분석",
  },
  {
    id: 7,
    author: "운영진",
    time: "12분전",
    title: "ETF 포트폴리오 구성 방법론",
  },
  {
    id: 8,
    author: "운영진",
    time: "15분전",
    title: "채권 투자 전략과 금리 리스크",
  },
  {
    id: 9,
    author: "운영진",
    time: "20분전",
    title: "퀀트 기반 모멘텀 전략 실증 분석",
  },
  {
    id: 10,
    author: "운영진",
    time: "25분전",
    title: "대안 투자 자산 편입 효과 연구",
  },
  {
    id: 11,
    author: "운영진",
    time: "30분전",
    title: "섹터 로테이션 전략 백테스트",
  },
  {
    id: 12,
    author: "운영진",
    time: "35분전",
    title: "배당 성장주 장기 포트폴리오 분석",
  },
  {
    id: 13,
    author: "운영진",
    time: "40분전",
    title: "벤치마크 대비 초과 수익률 분석",
  },
  {
    id: 14,
    author: "운영진",
    time: "45분전",
    title: "리스크 패리티 전략 실전 적용",
  },
  {
    id: 15,
    author: "운영진",
    time: "1시간전",
    title: "성장주 vs 가치주 성과 비교 분석",
  },
  {
    id: 16,
    author: "운영진",
    time: "1시간전",
    title: "매크로 지표 기반 자산 배분 모델",
  },
];

const ITEMS_PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(allItems.length / ITEMS_PER_PAGE);

const getPaginationItems = (current, total) => {
  const items = [];
  const range = 2;

  items.push(1);
  if (current - range > 2) items.push("—");

  for (
    let i = Math.max(2, current - range);
    i <= Math.min(total - 1, current + range);
    i++
  ) {
    items.push(i);
  }

  if (current + range < total - 1) items.push("…");
  if (total > 1) items.push(total);

  return items;
};

const Portfolio = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "SISC | 운용 포트폴리오";
  }, []);

  const filtered = allItems.filter(
    (item) => item.title.includes(query) || item.author.includes(query),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero */}
      <div className="flex items-end justify-center min-h-[200px] md:min-h-[260px] pb-10 pt-20 md:pt-0">
        <div className="text-center">
          <h2 className="text-white text-[32px] font-bold mb-4">
            운용 포트폴리오
          </h2>
          <div className="w-48 border-b-2 border-white mx-auto" />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white flex-1 min-h-screen">
        <div className="max-w-[680px] mx-auto px-4 md:px-6 py-8 md:py-10">
          {/* Search */}
          <div className="flex items-center border border-gray-200 rounded-full px-5 py-3 mb-8">
            <input
              type="text"
              placeholder="검색어를 입력하는 중"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 outline-none text-gray-500 text-sm bg-transparent placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm shrink-0"
            >
              →
            </button>
          </div>

          {/* List */}
          <div>
            {paginated.map((item, i) => (
              <div key={item.id}>
                <div className="flex items-center gap-4 py-5 cursor-pointer hover:bg-gray-50 transition-colors rounded px-2 -mx-2">
                  <img
                    src={profile}
                    alt="profile"
                    className="w-10 h-10 rounded-full shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-800">
                        {item.author}
                      </span>
                      <span className="text-xs text-gray-400">{item.time}</span>
                    </div>
                    <p className="text-gray-800 text-sm font-medium">
                      {item.title}
                    </p>
                  </div>
                </div>
                {i < paginated.length - 1 && <hr className="border-gray-100" />}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {paginationItems.map((item, i) =>
                item === "—" || item === "…" ? (
                  <span key={i} className="text-gray-400 text-sm px-1">
                    {item}
                  </span>
                ) : (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(item)}
                    className={`w-7 h-7 flex items-center justify-center text-sm rounded transition-colors ${
                      currentPage === item
                        ? "bg-gray-800 text-white"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
