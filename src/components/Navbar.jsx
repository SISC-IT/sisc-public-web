import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menuSvg from "../assets/menu.svg";
import smallLogo from "../assets/logo.svg";

const clubWebUrl = import.meta.env.VITE_CLUB_WEB_URL?.trim();

const navLinks = [
  { to: "/club", label: "동아리 소개" },
  { to: "/executives", label: "임원소개" },
  { to: "/monthly", label: "월간 세투연" },
  ...(clubWebUrl ? [{ href: clubWebUrl, label: "웹사이트", external: true }] : []),
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const desktopLinkClass =
    "font-semibold text-[18.53px] leading-[1.2] tracking-[-0.03em] text-white hover:opacity-80 transition-opacity relative after:content-[''] after:absolute after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-white after:transition-all after:duration-300";

  const close = () => setIsOpen(false);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:block absolute top-0 left-0 w-full bg-transparent z-[9999] transition-all duration-300">
        <ul className="flex list-none gap-[80px] items-center m-0 p-0 pt-[45px] pl-[138px] pb-5">
          {navLinks.map((link) =>
            link.external ? (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${desktopLinkClass} after:w-0 hover:after:w-full`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ) : (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`${desktopLinkClass} ${
                    location.pathname === link.to
                      ? "after:w-full opacity-80"
                      : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 w-full z-[9999] flex items-center px-5 py-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mr-3 flex items-center"
        >
          <img src={menuSvg} alt="menu" className="w-6 h-6" />
        </button>
        <Link to="/" onClick={close} className="flex items-center">
          <img src={smallLogo} alt="" className="w-5 h-5 mr-2" />
          <span className="text-white font-semibold text-sm">
            세종투자연구회
          </span>
        </Link>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <>
          <div className="md:hidden fixed inset-0 z-[9997]" onClick={close} />
          <div className="md:hidden fixed top-0 left-0 bg-black/60 w-full z-[9998] pt-14 pb-8 px-8">
            <ul className="flex flex-col gap-7 mt-4">
              {navLinks.map((link) =>
                link.external ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={close}
                      className="text-white text-sm font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={close}
                      className={`text-sm font-semibold ${
                        location.pathname === link.to
                          ? "text-blue-400"
                          : "text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
