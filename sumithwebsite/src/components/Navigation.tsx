"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 22);
    const handleResize = () => setIsMobile(window.innerWidth < 1100);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    { name: "SOLUTION", href: "/solutions" },
    { name: "PRODUCTS", href: "/products" },
    { name: "PARTNERS", href: "/partners" },
    { name: "CONTACT US", href: "/contact" },
    { name: "RESOURCES", href: "/resources" },
    { name: "ABOUT US", href: "/about" },
  ];

  return (
    <nav className={isScrolled ? "navbar navbar-scrolled" : "navbar"}>
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; width: 100vw; z-index: 100;
          transition: background 0.23s, box-shadow 0.18s, border 0.17s;
          background: rgba(22, 39, 111, 0.35); /* transparent-like */
          backdrop-filter: blur(7px) saturate(110%);
        }
        .navbar-scrolled {
          background: #fff;
          box-shadow: 0 4px 20px 0 rgba(17,38,73,.07);
          border-bottom: 1.5px solid #f0f4fa;
        }
        .navbar-inner {
          max-width: 1760px;
          margin: 0 auto;
          height: 65px;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          height: 48px;
        }
        .logo-img {
          width: 144px; height: auto; object-fit: contain;
        }
        .menu {
          display: flex;
          align-items: center;
          flex: 1;
          justify-content: center;
          gap: 50px;
          min-width: 0;
          height: 100%;
        }
        .menu-link {
          font-family: "Montserrat", Arial, sans-serif;
          font-size: 1.23rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          padding: 0 7px;
          transition: color 0.19s;
          text-decoration: none;
          background: none;
          border: none;
        }
        .navbar-scrolled .menu-link {
          color: #1d274c;
        }
        .menu-link:hover, .menu-link:focus {
          color: #43b724 !important;
        }
        .nav-right {
          display: flex;
          align-items: center;
          min-width: 124px;
        }
        .quote-btn {
          border-radius: 14px;
          padding: 10px 29px;
          font-weight: 700;
          font-size: 1.13rem;
          letter-spacing: 0.09em;
          background: #51c521;
          color: #fff;
          border: none;
          box-shadow: 0 2px 7px rgba(19,38,73,0.07);
          margin-left: 12px;
          transition: background 0.17s, color 0.15s;
          cursor: pointer;
        }
        .quote-btn:hover {
          background: #36a61e !important;
          color: #fff !important;
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .navbar-inner { height: 48px; padding: 0 8px;}
          .logo-img { width: 80px;}
          .menu { display: none;}
          .nav-right .quote-btn { padding: 7px 13px; min-width: 90px;}
        }
      `}</style>
      <div className="navbar-inner">
        {/* Logo */}
        <div className="logo">
          <Image
            src="/logos/sumith-logo.png"
            alt="Sumith Electronics Logo"
            className="logo-img"
            width={144} height={44} priority
          />
        </div>
        {/* Main menu desktop */}
        <div className="menu">
          {navItems.map(item => (
            <Link
              className="menu-link"
              href={item.href}
              key={item.name}
              tabIndex={0}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* Right Side */}
        <div className="nav-right">
          <Link href="/get-quote">
            <button className="quote-btn">Get Quote</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
