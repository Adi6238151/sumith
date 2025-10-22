"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const dropdownSections = [
  {
    title: "TRANSPORT SOLUTIONS",
    icon: "/icons/bus-icon.png",
    items: [
      { label: "Bus", icon: "/icons/bullet-bus.png" },
      { label: "Metro/Rail", icon: "/icons/bullet-metro.png" },
      { label: "Airport", icon: "/icons/bullet-airport.png" },
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
    title: "SMART CITY SOLUTIONS",
    icon: "/icons/smart-city-icon.png",
    items: [
      { label: "Smart (IOT) Waste Collection", icon: "/icons/bullet-waste.png" },
    ],
  },
  {
    title: "SMART WAREHOUSING",
    icon: "/icons/warehouse-icon.png",
    items: [
      { label: "Collision Avoidance System", icon: "/icons/bullet-collision.png" },
      { label: "Column Protection", icon: "/icons/bullet-column.png" },
      { label: "Rack Protection", icon: "/icons/bullet-rack.png" },
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
  { label: "ABOUT US", href: "/about" },
  { label: "OUR SUPPORT", href: "/our-support" },
  { label: "INSIGHTS", href: "/insights" },
  { label: "CAREERS", href: "/careers" },
  { label: "CONTACT US", href: "/contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [accordion, setAccordion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef<HTMLDivElement | null>(null);

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
    if (sidebar) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
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

  return (
    <>
      <nav className={`mega-navbar${isVisible ? " visible" : " hidden"}`} ref={navRef}>
        {/* Mobile Sidebar overlay */}
        <div className={`sidebar-overlay${sidebar ? " active" : ""}`} onClick={() => setSidebar(false)} />
        {/* Mobile Sidebar */}
        <aside className={`sidebar${sidebar ? " open" : ""}`}>
          <div className="sidebar-header">
            <Link href="/" tabIndex={sidebar ? 0 : -1} onClick={() => setSidebar(false)} style={{display: "inline-block"}}>
              <Image
                src="/logos/sumith-logo.png"
                width={120}
                height={36}
                alt="Sumith Electronics Logo"
                className="sidebar-logo"
                priority
              />
            </Link>
            <button className="close-btn" aria-label="Close sidebar" onClick={() => setSidebar(false)}>
              <span>&#10005;</span>
            </button>
          </div>
          <div className="sidebar-links">
            <button className="sidebar-link sidebar-dropdown" onClick={() => setAccordion((v) => !v)}>
              <span>SOLUTIONS</span>
              <span className={`arrow${accordion ? " open" : ""}`}>▼</span>
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
                            style={{display: "flex", alignItems: "center", color: "inherit", textDecoration: "none"}}
                          >
                            <Image src={item.icon} alt="" width={14} height={14} />
                            <span>{item.label}</span>
                          </Link>
                        ) : item.label === "Metro/Rail" ? (
                          <Link
                            href="/solutions/metro-rail"
                            tabIndex={accordion ? 0 : -1}
                            onClick={() => setSidebar(false)}
                            style={{display: "flex", alignItems: "center", color: "inherit", textDecoration: "none"}}
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
              <Link className="sidebar-link" key={item.label} href={item.href} tabIndex={sidebar ? 0 : -1} onClick={() => setSidebar(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </aside>

        <div className="navbar-inner">
          {/* Hamburger */}
          <button className="hamburger" aria-label="Open menu" onClick={() => setSidebar(true)}>
            <span />
            <span />
            <span />
          </button>
          {/* Logo (mobile: center, desktop: left) */}
          <div className="logo">
            <Link href="/" style={{display: "inline-block"}}>
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
          {/* Desktop menu */}
          <div className="navbar-links">
            <span
              className="navbar-link main-dropdown"
              tabIndex={0}
              onMouseEnter={() => setOpen(true)}
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-label="Solutions"
            >
              SOLUTIONS
              <span className="down-arrow" />
            </span>
            {navLinks.map((item) => (
              <Link className="navbar-link" href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop mega-dropdown */}
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
                        style={{display: "flex", alignItems: "center", color: "inherit", textDecoration: "none"}}
                      >
                        <Image src={item.icon} alt="" width={16} height={16} className="bullet-icon" />
                        <span>{item.label}</span>
                      </Link>
                    ) : item.label === "Metro/Rail" ? (
                      <Link
                        href="/solutions/metro-rail"
                        onClick={() => setOpen(false)}
                        style={{display: "flex", alignItems: "center", color: "inherit", textDecoration: "none"}}
                      >
                        <Image src={item.icon} alt="" width={16} height={16} className="bullet-icon" />
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <>
                        <Image src={item.icon} alt="" width={16} height={16} className="bullet-icon" />
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
        /* (PASTE ALL YOUR ORIGINAL CSS FROM PREVIOUS CODE HERE) */
        /* Hamburger styles */
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
        /* Sidebar Overlay */
        .sidebar-overlay {
          visibility: hidden;
          opacity: 0;
          position: fixed;
          left: 0; top: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.18);
          transition: visibility 0.22s, opacity 0.22s;
          z-index: 2001;
        }
        .sidebar-overlay.active {
          visibility: visible;
          opacity: 1;
        }
        /* Sidebar */
        .sidebar {
          position: fixed;
          top: 0;
          left: -320px;
          height: 100vh;
          width: 298px;
          max-width: 92vw;
          background: #fff;
          box-shadow: 3px 0 15px rgba(30,40,68,0.13);
          z-index: 2002;
          transition: left 0.28s cubic-bezier(.2,.6,.3,1);
          display: flex;
          flex-direction: column;
        }
        .sidebar.open {
          left: 0;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 17px 10px 18px;
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
          display: flex;
          flex-direction: column;
          padding: 13px 6px 13px 18px;
          gap: 7px;
        }
        .sidebar-link {
          background: none;
          border: none;
          outline: none;
          font-size: 1.13rem;
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
        .sidebar-link:hover, .sidebar-link:focus {
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
          padding: 13px 0 2px 9px;
          box-shadow: 0 1.5px 8px rgba(50,68,98,0.08);
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
        /* Normal navbar styles */
        .mega-navbar {
          width: 100%;
          background: #fff;
          position: fixed;
          top: 0;
          left: 0;
          box-shadow: 0 1px 0 0 #eaeaea;
          z-index: 1010;
          font-family: "Montserrat", Arial, sans-serif;
          transition: top 0.4s cubic-bezier(0.2,0.82,0.42,1), box-shadow 0.22s;
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
        }
        .logo-img {
          width: 150px !important;
          height: auto;
        }
        .navbar-links {
          display: flex;
          gap: 38px;
          align-items: center;
          flex: 2 1 750px;
          justify-content: center;
        }
        .navbar-link {
          font-size: 1.18rem;
          font-weight: 700;
          color: #142241;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          text-decoration: none;
          transition: color 0.18s;
          padding: 0 3px;
        }
        .navbar-link:hover,
        .navbar-link:focus {
          color: #43b724;
        }
        .main-dropdown {
          display: flex;
          align-items: center;
        }
        .down-arrow {
          display: inline-block;
          margin-left: 8px;
          width: 18px;
          height: 18px;
          color: #43b724;
          font-weight: bold;
          font-size: 1rem;
          position: relative;
        }
        .down-arrow:after {
          content: '';
          display: block;
          border: solid #43b724;
          border-width: 0 0 4px 4px;
          width: 13px;
          height: 13px;
          margin-top: 0;
          transform: rotate(-45deg) translateY(2px);
        }
        .mega-dropdown {
          width: 100%;
          left: 0;
          position: absolute;
          background: #f8fbf9;
          box-shadow: 0 11px 35px rgba(46, 49, 91, 0.07);
          top: 100%;
          padding: 34px 38px 34px 38px;
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
        }
        .dropdown-section:not(:last-child) {
          border-right: 1.5px solid #e9ecee;
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 18px;
        }
        .section-title {
          text-transform: uppercase;
          color: #1e2c44;
          font-size: 1.09rem;
          font-weight: 700;
          letter-spacing: 0.035em;
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
          color: #637391;
          padding: 0 0 13px 0;
          gap: 8px;
        }
        .section-item:last-child {
          padding-bottom: 0;
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
          .logo-img { width: 120px !important;}
          .navbar-link {font-size: 1rem;}
        }
        @media (max-width: 900px) {
          .navbar-inner {
            padding: 0 6px;
            height: 56px;
            gap: 9px;
          }
          .logo-img {
            width: 80px !important;
          }
          .navbar-links {
            gap: 13px;
          }
          .mega-dropdown {
            flex-direction: column;
            gap: 0;
            top: 92px;
            padding-bottom: 18px;
          }
          .dropdown-section {
            border-right: 0;
            border-bottom: 1.5px solid #e9ecee;
            min-width: 0;
            margin-bottom: 20px;
          }
        }
        @media (max-width: 800px) {
          .navbar-inner {
            padding: 0 2px;
            gap: 3px;
          }
        }
        @media (max-width: 680px) {
          .navbar-links {
            display: none !important;
          }
          .hamburger {
            display: flex;
          }
          .logo {
            justify-content: center;
            flex: 1 1 auto;
            text-align: center;
          }
          .mega-dropdown {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
