import { useEffect, useState } from "react";

const executivesData = {
  "24기": [
    { role: "회장", name: "김진성" },
    { role: "기획부장", name: "김진성" },
    { role: "회장", name: "김진성" },
    { role: "부회장", name: "김진성" },
    { role: "총무", name: "김진성" },
    { role: "대외협력", name: "김진성" },
  ],
  "23기": [],
  "22기": [],
  "21기": [],
  "19기": [],
  "18기": [],
};

const generations = ["24기", "23기", "22기", "21기", "19기", "18기"];

const Executives = () => {
  const [selected, setSelected] = useState("24기");

  useEffect(() => {
    document.title = "SISC | 임원 소개";
  }, []);

  const executives = executivesData[selected] ?? [];

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero */}
      <div className="flex items-end justify-center min-h-[200px] md:min-h-[260px] pb-10 pt-20 md:pt-0">
        <div className="text-center">
          <h2 className="text-white text-2xl md:text-[32px] font-bold mb-4">
            임원진을 소개합니다.
          </h2>
          <div className="w-48 border-b-2 border-white mx-auto" />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white flex-1 min-h-screen">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-12 px-6 md:px-10 py-8 md:py-12">
          {/* Sidebar */}
          <div className="md:w-28 md:shrink-0">
            <p className="text-gray-400 text-xs mb-3">Filter</p>
            <div className="flex md:flex-col md:border-l-2 md:border-gray-200 md:pl-4 gap-3 md:gap-4 overflow-x-auto pb-1 md:pb-0">
              {generations.map((gen) => (
                <button
                  key={gen}
                  onClick={() => setSelected(gen)}
                  className={`text-left text-sm whitespace-nowrap transition-colors ${
                    selected === gen
                      ? "text-[#1e3a8a] font-semibold"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {gen}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10">
            {executives.map((exec, i) => (
              <div key={i}>
                <div className="bg-gray-100 w-full aspect-[3/4]" />
                <p className="mt-3 text-gray-700 text-sm">
                  {exec.role} <span className="font-bold">{exec.name}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Executives;
