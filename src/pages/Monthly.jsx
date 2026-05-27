import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicPosts } from "../api/publicApi";
import smallLogo from "../assets/smallLogo.svg";
import monthlyBg from "../assets/monthly.svg";

const Monthly = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    document.title = "세종투자연구회 | 월간 세투연";
  }, []);

  useEffect(() => {
    let ignore = false;

    getPublicPosts({ page: 0, size: 8 })
      .then((data) => {
        if (ignore) return;
        setLoadError(false);
        setPosts(data.content ?? []);
        setTotalElements(data.totalElements ?? data.content?.length ?? 0);
      })
      .catch(() => {
        if (ignore) return;
        setLoadError(true);
        setPosts([]);
        setTotalElements(0);
      })
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
            <span className="font-bold text-[#1e3a8a]">{totalElements}개</span>의
            게시물
          </p>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  <div className="bg-gray-800 w-full aspect-[3/4] rounded mb-3 animate-pulse" />
                  <div className="h-4 bg-gray-800 rounded mb-2 animate-pulse" />
                  <div className="h-3 w-20 bg-gray-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : loadError ? (
            <div className="border border-white/10 rounded bg-white/[0.03] px-6 py-12 text-center">
              <p className="text-sm text-gray-400">
                공개 게시물을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
              </p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {posts.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => navigate(`/monthly/${post.id}`)}
                  className="cursor-pointer group text-left"
                >
                  {post.thumbnailUrl ? (
                    <img
                      src={post.thumbnailUrl}
                      alt=""
                      loading="lazy"
                      className="bg-gray-200 w-full aspect-[3/4] rounded mb-3 object-cover group-hover:opacity-75 transition-opacity"
                    />
                  ) : (
                    <div className="bg-gray-200 w-full aspect-[3/4] rounded mb-3 group-hover:opacity-75 transition-opacity" />
                  )}
                  <p className="text-sm font-medium text-white leading-snug mb-1 line-clamp-2">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-400">{post.relativeTime}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="border border-white/10 rounded bg-white/[0.03] px-6 py-12 text-center">
              <p className="text-sm text-gray-400">공개된 월간 세투연 게시물이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Monthly;
