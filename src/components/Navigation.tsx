"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const dropdownSections = [
  {
    title: "TRANSPORT SOLUTIONS",
    icon: "/icons/bus-icon.png",
    items: [
      { label: "Bus", icon: "/icons/bullet-bus.png" },
      { label: "Metro/Rail", icon: "/icons/bullet-metro.png" },
      { label: "Airport", icon: "/icons/bullet-airport.png", href: "/solutions/Airport/page" },
    ],
  },
  {
    title: "DIGITAL SIGNAGE",
    icon: "/icons/digital-signage-icon.png",
    items: [
      { label: "Variable Message Display", icon: "/icons/bullet-vmd.png" },
      { label: "ETA", icon: "/icons/bullet-eta.png" },
    ],
  },
  {
    title: "R&D",
    icon: "/icons/rd-icon.png",
    items: [
      { label: "IOT Hardware & Communication system", icon: "/icons/bullet-iot.png" },
      { label: "Custom IOT software & system integration", icon: "/icons/bullet-software.png" },
    ],
  },
];

const navLinks = [
  { label: "About us", href: "/about-us" },
  { label: "Products", href: "/solutions/products" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact us", href: "/contact-us" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [accordion, setAccordion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();

  const getActiveIndexFromPath = () => {
    if (pathname === "/") return 0;
    if (pathname.startsWith("/solutions") && !pathname.startsWith("/solutions/products")) {
      return 0;
    }
    const idx = navLinks.findIndex(
      (l) => pathname === l.href || pathname.startsWith(l.href + "/"),
    );
    return idx === -1 ? navLinks.length : idx + 1;
  };

  const [activeIndex, setActiveIndex] = useState<number>(() => getActiveIndexFromPath());
  const [hoverIndex, setHoverIndex] = useState<number | null>(activeIndex);

  const pillRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
  const pillNavRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sidebar) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, sidebar]);

  useEffect(() => {
    document.body.style.overflow = sidebar ? "hidden" : "";
  }, [sidebar]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (navRef.current && !navRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    if (!sidebar) {
      setAccordion(false);
      setOpen(false);
    }
  }, [sidebar]);

  useEffect(() => {
    const next = getActiveIndexFromPath();
    setActiveIndex(next);
    setHoverIndex(next);
  }, [pathname]);

  useEffect(() => {
    const indexToShow = hoverIndex ?? activeIndex;
    if (indexToShow == null || !pillNavRef.current) return;

    const pill = pillRefs.current[indexToShow];
    const container = pillNavRef.current;
    if (!pill || !container) return;

    const pillRect = pill.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const width = pillRect.width;
    const left = pillRect.left - containerRect.left;

    container.style.setProperty("--pill-highlight-width", `${width}px`);
    container.style.setProperty("--pill-highlight-left", `${left}px`);
    container.style.setProperty("--pill-highlight-opacity", "1");
  }, [hoverIndex, activeIndex]);

  return (
    <>
      <nav className={`mega-navbar${isVisible ? " visible" : " hidden"}`} ref={navRef}>
        <div
          className={`sidebar-overlay${sidebar ? " active" : ""}`}
          onClick={() => setSidebar(false)}
        />
        <aside className={`sidebar${sidebar ? " open" : ""}`}>
          <div className="sidebar-header">
            <Link
              href="/"
              tabIndex={sidebar ? 0 : -1}
              onClick={() => setSidebar(false)}
              style={{ display: "inline-block" }}
            >
              <Image
                src="/logos/sumith-logo.png"
                width={120}
                height={36}
                alt="Sumith Electronics Logo"
                className="sidebar-logo"
                priority
              />
            </Link>
            <button
              className="close-btn"
              aria-label="Close sidebar"
              onClick={() => setSidebar(false)}
            >
              <span>&#10005;</span>
            </button>
          </div>

          <div className="sidebar-links">
            <button
              className="sidebar-link sidebar-dropdown"
              onClick={() => setAccordion((v) => !v)}
            >
              <span>SOLUTIONS</span>
              <span className={`arrow${accordion ? " open" : ""}`}>▲</span>
            </button>
            <div className={`sidebar-dropdown-content${accordion ? " show" : ""}`}>
              {dropdownSections.map((section) => (
                <div className="sidebar-dropdown-section" key={section.title}>
                  <div className="sidebar-dropdown-title">
                    <Image src={section.icon} alt="" width={22} height={22} /> {section.title}
                  </div>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item.label}>
                        {item.label === "Bus" ? (
                          <Link
                            href="/solutions/transit-bus"
                            tabIndex={accordion ? 0 : -1}
                            onClick={() => setSidebar(false)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: "inherit",
                              textDecoration: "none",
                            }}
                          >
                            <Image src={item.icon} alt="" width={14} height={14} />
                            <span>{item.label}</span>
                          </Link>
                        ) : item.label === "Metro/Rail" ? (
                          <Link
                            href="/solutions/metro-rail"
                            tabIndex={accordion ? 0 : -1}
                            onClick={() => setSidebar(false)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: "inherit",
                              textDecoration: "none",
                            }}
                          >
                            <Image src={item.icon} alt="" width={14} height={14} />
                            <span>{item.label}</span>
                          </Link>
                        ) : item.label === "Airport" && item.href ? (
                          <Link
                            href={item.href}
                            tabIndex={accordion ? 0 : -1}
                            onClick={() => setSidebar(false)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: "inherit",
                              textDecoration: "none",
                            }}
                          >
                            <Image src={item.icon} alt="" width={14} height={14} />
                            <span>{item.label}</span>
                          </Link>
                        ) : (
                          <>
                            <Image src={item.icon} alt="" width={14} height={14} />
                            <span>{item.label}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {navLinks.map((item) => (
              <Link
                className="sidebar-link"
                key={item.label}
                href={item.href}
                tabIndex={sidebar ? 0 : -1}
                onClick={() => setSidebar(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </aside>

        <div className="navbar-inner">
          <button
            className="hamburger"
            aria-label="Open menu"
            onClick={() => setSidebar(true)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="logo">
            <Link href="/" style={{ display: "inline-block" }}>
              <Image
                src="/logos/sumith-logo.png"
                width={150}
                height={44}
                alt="Sumith Electronics Logo"
                className="logo-img"
                priority
              />
            </Link>
          </div>

          <div className="pill-nav-wrapper">
            <div className="pill-nav" ref={pillNavRef}>
              <button
                ref={(el: HTMLButtonElement | null) => {
                  pillRefs.current[0] = el;
                }}
                className={`pill-nav-item solutions-pill${
                  (hoverIndex ?? activeIndex) === 0 ? " is-hovered" : ""
                }`}
                onMouseEnter={() => {
                  setOpen(true);
                  setHoverIndex(0);
                }}
                onFocus={() => {
                  setOpen(true);
                  setHoverIndex(0);
                }}
                onMouseLeave={() => setHoverIndex(null)}
                onBlur={() => setHoverIndex(null)}
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Solutions"
              >
                Solutions
                <span className="down-arrow-pill" />
              </button>

              {navLinks.map((item, idx) => {
                const pillIndex = idx + 1;
                const isCurrent = (hoverIndex ?? activeIndex) === pillIndex;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`pill-nav-item${isCurrent ? " is-hovered" : ""}`}
                    ref={(el: HTMLAnchorElement | null) => {
                      pillRefs.current[pillIndex] = el;
                    }}
                    onMouseEnter={() => setHoverIndex(pillIndex)}
                    onFocus={() => setHoverIndex(pillIndex)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onBlur={() => setHoverIndex(null)}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <span className="pill-nav-highlight" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div
          className="mega-dropdown"
          style={{ display: open ? "flex" : "none" }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {dropdownSections.map((section) => (
            <div className="dropdown-section" key={section.title}>
              <div className="section-header">
                <Image
                  src={section.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="section-icon"
                />
                <span className="section-title">{section.title}</span>
              </div>
              <ul className="section-items">
                {section.items.map((item) => (
                  <li className="section-item" key={item.label}>
                    {item.label === "Bus" ? (
                      <Link
                        href="/solutions/transit-bus"
                        onClick={() => setOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
                        <Image
                          src={item.icon}
                          alt=""
                          width={16}
                          height={16}
                          className="bullet-icon"
                        />
                        <span>{item.label}</span>
                      </Link>
                    ) : item.label === "Metro/Rail" ? (
                      <Link
                        href="/solutions/metro-rail"
                        onClick={() => setOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
                        <Image
                          src={item.icon}
                          alt=""
                          width={16}
                          height={16}
                          className="bullet-icon"
                        />
                        <span>{item.label}</span>
                      </Link>
                    ) : item.label === "Airport" && item.href ? (
                      <Link
                        href="/solutions/Airport"
                        onClick={() => setOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
                        <Image
                          src={item.icon}
                          alt=""
                          width={16}
                          height={16}
                          className="bullet-icon"
                        />
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <>
                        <Image
                          src={item.icon}
                          alt=""
                          width={16}
                          height={16}
                          className="bullet-icon"
                        />
                        <span>{item.label}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      <style jsx global>{`
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 3px;
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          width: 36px;
          height: 36px;
          margin-right: 16px;
        }
        .hamburger span {
          display: block;
          width: 29px;
          height: 3.5px;
          border-radius: 2px;
          background: #112445;
        }

        .sidebar-overlay {
          visibility: hidden;
          opacity: 0;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.18);
          transition: visibility 0.22s, opacity 0.22s;
          z-index: 2001;
        }
        .sidebar-overlay.active {
          visibility: visible;
          opacity: 1;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: -100%;
          height: 100dvh;
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          box-shadow: 3px 0 15px rgba(30, 40, 68, 0.18);
          z-index: 2002;
          transition: left 0.28s cubic-bezier(0.2, 0.6, 0.3, 1);
          display: flex;
          flex-direction: column;
        }
        .sidebar.open {
          left: 0;
        }
        .sidebar-header {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 17px 12px 18px;
          border-bottom: 1px solid #eff0f1;
        }
        .sidebar-logo {
          width: 110px !important;
          height: auto;
        }
        .close-btn {
          font-size: 1.6rem;
          border: none;
          background: transparent;
          color: #1753a6;
          cursor: pointer;
        }
        .sidebar-links {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          padding: 13px 10px 18px 18px;
          gap: 7px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .sidebar-link {
          background: none;
          border: none;
          outline: none;
          font-size: clamp(1rem, 2.7vw, 1.13rem);
          font-weight: 600;
          color: #172c44;
          letter-spacing: 0.015em;
          text-align: left;
          text-decoration: none;
          cursor: pointer;
          padding: 11px 0;
          transition: color 0.18s;
          display: flex;
          align-items: center;
        }
        .sidebar-link:hover,
        .sidebar-link:focus {
          color: #43b724;
        }
        .sidebar-dropdown {
          justify-content: space-between;
        }
        .arrow {
          transition: transform 0.17s;
          font-size: 1.16em;
          color: #43b724;
          display: inline-block;
          margin-left: 6px;
          vertical-align: middle;
        }
        .arrow.open {
          transform: rotate(180deg);
        }
        .sidebar-dropdown-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.32s;
          background: #f7f8fb;
          border-radius: 7px;
          margin: 0 0 10px 0;
        }
        .sidebar-dropdown-content.show {
          max-height: 800px;
          padding: 13px 0 6px 9px;
          box-shadow: 0 1.5px 8px rgba(50, 68, 98, 0.08);
          border: 1px solid #eff0f2;
        }
        .sidebar-dropdown-section {
          margin-bottom: 7px;
        }
        .sidebar-dropdown-title {
          color: #27304d;
          font-size: 0.97rem;
          font-weight: 600;
          display: flex;
          gap: 8px;
          margin-bottom: 5px;
          align-items: center;
        }
        .sidebar-dropdown-section ul {
          list-style: none;
          margin: 0;
          padding: 0 0 2px 0;
        }
        .sidebar-dropdown-section li {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.98rem;
          font-weight: 500;
          color: #4b5f79;
          padding: 4px 0 2px 2px;
        }

        .mega-navbar {
          width: 100%;
          background: #111111;
          position: fixed;
          top: 0;
          left: 0;
          box-shadow: 0 1px 0 0 #1f2933;
          z-index: 1010;
          font-family: "Montserrat", Arial, sans-serif;
          transition: top 0.4s cubic-bezier(0.2, 0.82, 0.42, 1), box-shadow 0.22s;
        }
        .mega-navbar.hidden {
          top: -110px;
        }
        .mega-navbar.visible {
          top: 0;
        }
        .navbar-inner {
          max-width: 1550px;
          margin: 0 auto;
          height: 96px;
          display: flex;
          align-items: center;
          gap: 48px;
          padding: 0 48px;
          position: relative;
        }
        .logo {
          flex: 1 1 auto;
          text-align: left;
          display: flex;
          align-items: center;
        }
        .logo-img {
          width: 150px !important;
          height: auto;
        }

        .pill-nav-wrapper {
          flex: 2 1 750px;
          display: flex;
          justify-content: center;
        }
        .pill-nav {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px;
          border-radius: 999px;
          background: radial-gradient(circle at top, #f5f5f5, #d2d2d2);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
          --pill-highlight-left: 0px;
          --pill-highlight-width: 0px;
          --pill-highlight-opacity: 1;
        }
        .pill-nav-item {
          position: relative;
          border: none;
          outline: none;
          border-radius: 999px;
          padding: 9px 28px;
          font-size: 1.02rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          background: transparent;
          color: #111827;
          cursor: pointer;
          transition: color 0.16s ease, transform 0.16s ease,
            text-shadow 0.16s ease;
          white-space: nowrap;
          z-index: 1;
          text-decoration: none;
        }
        .solutions-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .down-arrow-pill {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 999px;
          border: 2px solid #374151;
          border-top: 0;
          border-right: 0;
          transform: rotate(-45deg) translateY(1px);
        }
        .pill-nav-item.is-hovered {
          color: #f9fafb;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.55);
        }
        .pill-nav-item:hover {
          transform: translateY(-1px);
        }
        .pill-nav-highlight {
          position: absolute;
          top: 4px;
          height: calc(100% - 8px);
          border-radius: 999px;
          background: #000000;
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.65);
          transform: translateX(var(--pill-highlight-left));
          width: var(--pill-highlight-width);
          opacity: var(--pill-highlight-opacity);
          transition: transform 0.26s cubic-bezier(0.22, 0.9, 0.25, 1.12),
            width 0.26s cubic-bezier(0.22, 0.9, 0.25, 1.12);
          pointer-events: none;
        }

        .mega-dropdown {
          width: 100%;
          left: 0;
          position: absolute;
          background: #0f172a;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.7);
          top: 100%;
          padding: 30px 38px;
          display: flex;
          flex-direction: row;
          gap: 22px;
          z-index: 1011;
        }
        .dropdown-section {
          min-width: 215px;
          padding: 0 16px 0 0;
          display: flex;
          flex-direction: column;
          border-right: 1.5px solid #1f2937;
        }
        .dropdown-section:last-child {
          border-right: none;
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 18px;
        }
        .section-title {
          text-transform: uppercase;
          color: #e5e7eb;
          font-size: 1.02rem;
          font-weight: 700;
          letter-spacing: 0.06em;
        }
        .section-icon {
          width: 33px;
          height: 33px;
          object-fit: contain;
        }
        .section-items {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .section-item {
          display: flex;
          align-items: center;
          font-size: 1.01rem;
          font-weight: 500;
          color: #cbd5f5;
          padding: 0 0 13px 0;
          gap: 8px;
        }
        .section-item:last-child {
          padding-bottom: 0;
        }
        .section-item:hover {
          color: #fbbf24;
          transform: translateX(3px);
          transition: transform 0.16s ease, color 0.16s ease;
        }
        .bullet-icon {
          width: 16px;
          height: 16px;
          object-fit: contain;
        }

        @media (max-width: 1050px) {
          .navbar-inner,
          .mega-dropdown {
            padding-left: 5vw;
            padding-right: 5vw;
          }
          .logo-img {
            width: 120px !important;
          }
          .pill-nav {
            gap: 4px;
          }
          .pill-nav-item {
            padding: 8px 20px;
            font-size: 0.96rem;
          }
        }

        @media (max-width: 900px) {
          .navbar-inner {
            padding: 0 10px;
            height: 56px;
            gap: 10px;
          }
          .logo-img {
            width: 90px !important;
          }
          .pill-nav-wrapper {
            display: none;
          }
          .mega-dropdown {
            display: none !important;
          }
          .hamburger {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .navbar-inner {
            padding: 0 8px;
          }
          .sidebar {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
