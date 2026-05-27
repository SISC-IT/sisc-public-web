import { useEffect } from "react";
import logo from "../assets/logo.svg";

const Home = () => {
  useEffect(() => {
    document.title = "세종투자연구회";
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-16 pb-32 md:pb-0 md:pt-0 md:mt-[200px] md:justify-start">
      <img src={logo} alt="SISC Logo" className="mb-6 w-16 md:w-auto" />
      <p className="font-dinCondensed text-[42px] md:text-[80px] leading-none tracking-normal text-white mb-4">
        Sejong Investment Scholars Club
      </p>
      <p className="font-sans font-semibold text-xl md:text-[32px] leading-[1.46] tracking-normal text-white">
        세투연과 세상을 읽고 미래에 투자하라
      </p>
    </div>
  );
};

export default Home;
