"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navigation.module.css";

const dropdownSections = [
  {
    title: "TRANSPORT SOLUTIONS",
    icon: "/icons/bus-icon.png",
    items: [
      { label: "Bus", icon: "/icons/bullet-bus.png" },
      { label: "Metro/Rail", icon: "/icons/bullet-metro.png" },
      // ❌ TEMPORARILY DISABLED
      // { label: "Airport", icon: "/icons/bullet-airport.png", href: "/solutions/Airport/page" },
    ],
  },
  // ❌ TEMPORARILY DISABLED - DIGITAL SIGNAGE
  // {
  //   title: "DIGITAL SIGNAGE",
  //   icon: "/icons/digital-signage-icon.png",
  //   items: [
  //     { label: "Variable Message Display", icon: "/icons/bullet-vmd.png" },
  //     { label: "ETA", icon: "/icons/bullet-eta.png" },
  //   ],
  // },
  // ❌ TEMPORARILY DISABLED - R&D
  // {
  //   title: "R&D",
  //   icon: "/icons/rd-icon.png",
  //   items: [
  //     { label: "IOT Hardware & Communication system", icon: "/icons/bullet-iot.png" },
  //     { label: "Custom IOT software & system integration", icon: "/icons/bullet-software.png" },
  //   ],
  // },
];

const navLinks = [
  { label: "About us", href: "/about-us" },
  { label: "Products", href: "/products" },
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
      <nav className={`${styles.megaNavbar}${isVisible ? ` ${styles.visible}` : ` ${styles.hidden}`}`} ref={navRef}>
        <div
          className={`${styles.sidebarOverlay}${sidebar ? ` ${styles.active}` : ""}`}
          onClick={() => setSidebar(false)}
        />
        <aside className={`${styles.sidebar}${sidebar ? ` ${styles.open}` : ""}`}>
          <div className={styles.sidebarHeader}>
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
                className={styles.sidebarLogo}
                priority
              />
            </Link>
            <button
              className={styles.closeBtn}
              aria-label="Close sidebar"
              onClick={() => setSidebar(false)}
            >
              <span>&#10005;</span>
            </button>
          </div>

          <div className={styles.sidebarLinks}>
            <button
              className={`${styles.sidebarLink} ${styles.sidebarDropdown}`}
              onClick={() => setAccordion((v) => !v)}
            >
              <span>SOLUTIONS</span>
              <span className={`${styles.arrow}${accordion ? ` ${styles.arrowOpen}` : ""}`}>▲</span>
            </button>
            <div className={`${styles.sidebarDropdownContent}${accordion ? ` ${styles.show}` : ""}`}>
              {dropdownSections.map((section) => (
                <div className={styles.sidebarDropdownSection} key={section.title}>
                  <div className={styles.sidebarDropdownTitle}>
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
                className={styles.sidebarLink}
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

        <div className={styles.navbarInner}>
          <button
            className={styles.hamburger}
            aria-label="Open menu"
            onClick={() => setSidebar(true)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={styles.logo}>
            <Link href="/" style={{ display: "inline-block" }}>
              <Image
                src="/logos/sumith-logo.png"
                width={150}
                height={44}
                alt="Sumith Electronics Logo"
                className={styles.logoImg}
                priority
              />
            </Link>
          </div>

          <div className={styles.pillNavWrapper}>
            <div className={styles.pillNav} ref={pillNavRef}>
              <button
                ref={(el: HTMLButtonElement | null) => {
                  pillRefs.current[0] = el;
                }}
                className={`${styles.pillNavItem} ${styles.solutionsPill}${
                  (hoverIndex ?? activeIndex) === 0 ? ` ${styles.isHovered}` : ""
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
                <span className={styles.downArrowPill} />
              </button>

              {navLinks.map((item, idx) => {
                const pillIndex = idx + 1;
                const isCurrent = (hoverIndex ?? activeIndex) === pillIndex;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`${styles.pillNavItem}${isCurrent ? ` ${styles.isHovered}` : ""}`}
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

              <span className={styles.pillNavHighlight} aria-hidden="true" />
            </div>
          </div>
        </div>

        <div
          className={styles.megaDropdown}
          style={{ display: open ? "flex" : "none" }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {dropdownSections.map((section) => (
            <div className={styles.dropdownSection} key={section.title}>
              <div className={styles.sectionHeader}>
                <Image
                  src={section.icon}
                  alt=""
                  width={40}
                  height={40}
                  className={styles.sectionIcon}
                />
                <span className={styles.sectionTitle}>{section.title}</span>
              </div>
              <ul className={styles.sectionItems}>
                {section.items.map((item) => (
                  <li className={styles.sectionItem} key={item.label}>
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
                          className={styles.bulletIcon}
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
                          className={styles.bulletIcon}
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
                          className={styles.bulletIcon}
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
    </>
  );
}
