import { useEffect, useState } from "react";
import { getClubPage } from "../api/publicApi";

const Club = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "세종투자연구회 | 동아리 소개";
  }, []);

  useEffect(() => {
    let ignore = false;

    getClubPage()
      .then((data) => {
        if (!ignore) {
          setPage(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
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
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-8 md:py-12">
          {loading ? (
            <div className="max-w-[960px] mx-auto">
              <div className="h-8 w-48 bg-gray-100 rounded mb-8 animate-pulse" />
              <div className="space-y-4">
                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ) : page ? (
            <article className="max-w-[960px] mx-auto">
              <h3 className="text-[#1a1a1a] text-2xl md:text-4xl font-bold mb-6 md:mb-8">
                {page.title}
              </h3>
              {page.contentHtml ? (
                <div
                  className="public-content text-gray-700"
                  dangerouslySetInnerHTML={{ __html: page.contentHtml }}
                />
              ) : (
                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                  {page.contentText}
                </p>
              )}
            </article>
          ) : (
            <div className="max-w-[960px] mx-auto border border-gray-100 rounded px-6 py-12 text-center">
              <p className="text-gray-500 text-sm">
                동아리 소개 콘텐츠가 아직 준비되지 않았습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Club;
