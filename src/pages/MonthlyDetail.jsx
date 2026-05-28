import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import { getPublicPost } from "../api/publicApi";
import logo from "../assets/logo.svg";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function PdfPageCanvas({ pdfDocument, pageNumber }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const [rendering, setRendering] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let renderTask = null;

    async function renderPage() {
      if (!pdfDocument || !canvasRef.current || !wrapperRef.current) return;

      setRendering(true);
      const page = await pdfDocument.getPage(pageNumber);
      if (cancelled) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const wrapperWidth = wrapperRef.current.clientWidth || 420;
      const scale = wrapperWidth / baseViewport.width;
      const viewport = page.getViewport({ scale });
      const outputScale = window.devicePixelRatio || 1;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      renderTask = page.render({
        canvasContext: context,
        viewport,
        transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null,
      });

      await renderTask.promise;
      if (!cancelled) {
        setRendering(false);
      }
    }

    renderPage().catch(() => {
      if (!cancelled) {
        setRendering(false);
      }
    });

    return () => {
      cancelled = true;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfDocument, pageNumber]);

  return (
    <div ref={wrapperRef} className="relative flex-1 bg-white aspect-[1/1.41] overflow-hidden">
      {rendering && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
      <canvas ref={canvasRef} className="block max-w-full bg-white" />
    </div>
  );
}

const MonthlyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [post, setPost] = useState(null);
  const [spread, setSpread] = useState(1);
  const [pdfDocument, setPdfDocument] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [pdfLoadProgress, setPdfLoadProgress] = useState(0);
  const [headerProgress, setHeaderProgress] = useState(0);
  const [postError, setPostError] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const mainPdf = post?.pdfAttachments?.[0] ?? null;
  const mainPdfUrl = mainPdf?.url?.replace(/%2F/gi, "/") ?? null;
  const pagesPerSpread = isMobile ? 1 : 2;
  const maxSpread = Math.max(1, Math.ceil((pageCount || 1) / pagesPerSpread));
  const startPage = (spread - 1) * pagesPerSpread + 1;
  const endPage = Math.min(startPage + pagesPerSpread - 1, pageCount || startPage);
  const spreadStartProgress = pageCount > 0
    ? Math.min(100, Math.max(0, ((startPage - 1) / pageCount) * 100))
    : 0;
  const spreadEndProgress = pageCount > 0
    ? Math.min(100, Math.max(0, (endPage / pageCount) * 100))
    : 0;
  const visiblePages = useMemo(() => {
    if (!pdfDocument) return [];
    return Array.from({ length: pagesPerSpread }, (_, index) => startPage + index)
      .filter((pageNumber) => pageNumber <= pageCount);
  }, [pageCount, pagesPerSpread, pdfDocument, startPage]);

  useEffect(() => {
    document.title = "세종투자연구회 | 월간 세투연";
    setSpread(1);
    setPost(null);
    setPdfDocument(null);
    setPageCount(0);
    setPdfLoadProgress(0);
    setHeaderProgress(0);
    setPostError(false);
    setPdfError(false);
    setLoadingPost(true);
    window.scrollTo(0, 0);

    let ignore = false;
    getPublicPost(id)
      .then((data) => {
        if (!ignore) {
          setPostError(false);
          setPost(data);
          document.title = `세종투자연구회 | ${data.title}`;
        }
      })
      .catch(() => {
        if (!ignore) {
          setPostError(true);
          setPost(null);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoadingPost(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  useEffect(() => {
    if (!mainPdfUrl) {
      setPdfDocument(null);
      setPageCount(0);
      setLoadingPdf(false);
      setPdfLoadProgress(0);
      setHeaderProgress(0);
      setPdfError(false);
      return undefined;
    }

    setLoadingPdf(true);
    setPdfLoadProgress(6);
    setPdfError(false);
    const loadingTask = pdfjsLib.getDocument({
      url: mainPdfUrl,
      disableRange: true,
      disableStream: true,
    });

    loadingTask.onProgress = ({ loaded, total }) => {
      if (total > 0) {
        setPdfLoadProgress(Math.min(95, Math.round((loaded / total) * 100)));
      }
    };

    loadingTask.promise
      .then((document) => {
        setPdfDocument(document);
        setPageCount(document.numPages);
        setPdfLoadProgress(100);
      })
      .catch((error) => {
        console.error("Failed to load public PDF", { url: mainPdfUrl, error });
        setPdfDocument(null);
        setPageCount(0);
        setPdfLoadProgress(0);
        setPdfError(true);
      })
      .finally(() => {
        setLoadingPdf(false);
      });

    return () => {
      loadingTask.destroy();
    };
  }, [mainPdfUrl]);

  useEffect(() => {
    setSpread((current) => Math.min(current, maxSpread));
  }, [maxSpread]);

  useEffect(() => {
    if (loadingPdf) {
      setHeaderProgress(Math.max(6, pdfLoadProgress));
      return undefined;
    }

    if (!pdfDocument || pageCount === 0) {
      setHeaderProgress(0);
      return undefined;
    }

    setHeaderProgress(spreadStartProgress);
    const frameId = window.requestAnimationFrame(() => {
      setHeaderProgress(spreadEndProgress);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [
    loadingPdf,
    pageCount,
    pdfDocument,
    pdfLoadProgress,
    spreadEndProgress,
    spreadStartProgress,
  ]);

  const goPrev = () => {
    if (spread > 1) {
      setSpread((current) => current - 1);
    } else {
      navigate("/monthly");
    }
  };

  const goNext = () => {
    if (spread < maxSpread) {
      setSpread((current) => current + 1);
    }
  };

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
      <div className="h-[8px] w-[361px] max-w-full bg-gray-900 overflow-hidden">
        <div
          className="h-full w-full origin-left bg-gradient-to-r from-[#194A8F] via-[#1469E1] to-[#1D80F4]"
          style={{
            transform: `scaleX(${headerProgress / 100})`,
            transition: "transform 640ms ease-out",
          }}
        />
      </div>

      {/* Viewer */}
      <div className="flex-1 flex items-center justify-center relative px-10 md:px-20 py-8">
        <button
          type="button"
          aria-label="이전 페이지"
          onClick={goPrev}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 text-xl transition-colors z-10"
        >
          ‹
        </button>

        {loadingPost || loadingPdf ? (
          <div className="flex gap-1 w-full max-w-[860px] shadow-lg">
            <div className="flex-1 bg-gray-100 aspect-[1/1.41] animate-pulse" />
            <div className="hidden md:block flex-1 bg-gray-100 aspect-[1/1.41] animate-pulse" />
          </div>
        ) : pdfDocument && visiblePages.length > 0 ? (
          <div className="flex gap-1 w-full max-w-[860px] shadow-lg bg-gray-200">
            {visiblePages.map((pageNumber) => (
              <PdfPageCanvas
                key={pageNumber}
                pdfDocument={pdfDocument}
                pageNumber={pageNumber}
              />
            ))}
            {!isMobile && visiblePages.length === 1 && (
              <div className="hidden md:block flex-1 bg-gray-100 aspect-[1/1.41]" />
            )}
          </div>
        ) : (
          <div className="w-full max-w-[860px] bg-white shadow-lg border border-gray-200 px-8 py-10 min-h-[420px]">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {post?.title ??
                (postError
                  ? "공개 게시물을 불러오지 못했습니다."
                  : "게시물을 찾을 수 없습니다.")}
            </h1>
            {pdfError && (
              <p className="text-sm text-gray-500 mb-4">
                PDF를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
              </p>
            )}
            {post?.contentHtml ? (
              <div
                className="public-content text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            ) : (
              <p className="text-gray-700 whitespace-pre-line">
                {post?.contentText ?? "공개된 문서가 없습니다."}
              </p>
            )}
          </div>
        )}

        <button
          type="button"
          aria-label="다음 페이지"
          onClick={goNext}
          disabled={spread >= maxSpread}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-gray-100 flex items-center justify-center text-gray-600 text-xl transition-colors z-10"
        >
          ›
        </button>
      </div>

      {/* Page indicator */}
      <div className="text-center text-xs text-gray-400 pb-6">
        {pageCount > 0
          ? `${startPage} – ${endPage} / ${pageCount}`
          : "0 / 0"}
      </div>
    </div>
  );
};

export default MonthlyDetail;
