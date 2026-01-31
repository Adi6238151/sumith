"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ProductFeatureSection from "@/components/products/sections/ProductFeatureSection";
import ProductSpecsSection from "@/components/products/sections/ProductSpecsSection";
import Product3DViewerSection from "@/components/products/sections/Product3DViewerSection";
import styles from "./ProductPageClient.module.css";

export default function ProductPageClient({ product }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("features");
  const [isMainNavVisible, setIsMainNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  const featureSections = product.sections?.filter(s => s._type === "featureSection") || [];
  const specSections = product.sections?.filter(s => s._type === "specSection") || [];
  const viewer3DSections = product.sections?.filter(s => s._type === "viewer3DSection") || [];

  // Dynamic navigation tabs based on available sections
  const navigationTabs = [
    "features",
    ...(viewer3DSections.length > 0 ? ["3d-view"] : []),
    "specifications",
    "ordering",
    "trackers"
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetHeight = 140;
      const y = el.getBoundingClientRect().top + window.scrollY - offsetHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Detect main nav visibility based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsMainNavVisible(false);
      } else {
        setIsMainNavVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Spy Logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all navigation sections
    navigationTabs.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navigationTabs]);

  return (
    <>
      {/* HERO/INTRO SECTION */}
      {product.intro && (
        <div className={styles.heroSection}>
          {/* Back Button */}
          <button 
            onClick={() => router.back()} 
            className={styles.backButton}
            aria-label="Go back to products"
          >
            <svg 
              className={styles.backIcon}
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M19 12H5M5 12L12 19M5 12L12 5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.backText}>Back to Products</span>
          </button>

          <div className={styles.heroTitleContainer}>
            <h1 className={styles.heroTitle}>
              {product.name}
            </h1>
          </div>

          <p className={styles.heroDescription}>
            {product.intro}
          </p>
        </div>
      )}

      {/* STICKY SUB-NAVIGATION */}
      <div 
        className={styles.stickyNav}
        style={{ 
          top: isMainNavVisible ? '80px' : '0px',
          transition: 'top 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className={styles.navContainer}>
          {navigationTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => scrollToSection(tab)}
              className={`${styles.navButton} ${activeTab === tab ? styles.navButtonActive : ''}`}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = '#111827';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = '#6b7280';
                }
              }}
            >
              {tab === "3d-view" ? "3D View" : tab}
              {activeTab === tab && (
                <span className={styles.navIndicator} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT SECTIONS */}
      <div className={styles.contentWrapper}>
        
        {/* Features Group */}
        <div id="features" className={styles.section}>
          {featureSections.map((section, idx) => (
            <ProductFeatureSection 
              key={`feature-${section._key}-${product.slug?.current || product._id}`}
              data={section} 
              isReverse={idx % 2 !== 0}
            />
          ))}
        </div>

        {/* 3D Viewer Section */}
        {viewer3DSections.length > 0 && (
          <div id="3d-view" className={styles.section}>
            {viewer3DSections.map((section) => (
              <Product3DViewerSection 
                key={`viewer3d-${section._key}`} 
                data={section} 
              />
            ))}
          </div>
        )}

        {/* Specifications */}
        {specSections.length > 0 && (
          <div id="specifications" className={styles.section}>
            {specSections.map((section) => (
               <ProductSpecsSection key={`spec-${section._key}`} data={section} />
            ))}
          </div>
        )}

        {/* Placeholders */}
        <div 
          id="ordering" 
          className={`${styles.placeholderSection} ${styles.placeholderOrdering}`}
        >
          <p className={styles.placeholderText}>
            Ordering Section Placeholder
          </p>
        </div>
        
        <div 
          id="trackers" 
          className={`${styles.placeholderSection} ${styles.placeholderTrackers}`}
        >
          <p className={styles.placeholderText}>
            Trackers Section Placeholder
          </p>
        </div>

      </div>
    </>
  );
}
