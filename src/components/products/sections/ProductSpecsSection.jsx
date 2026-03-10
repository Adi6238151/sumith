"use client";

import { useState } from "react";
import styles from "./ProductSpecsSection.module.css";

export default function ProductSpecsSection({ data }) {
  const [openGroups, setOpenGroups] = useState([0]); // First group open by default

  const toggleGroup = (index) => {
    setOpenGroups((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className={styles.section}>
      {/* Main Title */}
      <h2 className={styles.title}>
        Product Specifications
      </h2>

      {/* Accordion Groups */}
      <div className={styles.accordion}>
        {data.items?.map((group, idx) => {
          const isOpen = openGroups.includes(idx);

          return (
            <div key={idx} className={styles.accordionItem}>
              {/* Group Header (Clickable) */}
              <button
                onClick={() => toggleGroup(idx)}
                className={styles.accordionHeader}
              >
                <h4 className={styles.accordionTitle}>
                  {group.title}
                </h4>

                {/* Chevron Icon */}
                <svg
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Expandable Content */}
              {isOpen && (
                <div className={styles.accordionContent}>
                  {group.specs?.map((spec, sIdx) => (
                    <div key={sIdx} className={styles.specRow}>
                      <span className={styles.specLabel}>
                        {spec.label}
                      </span>
                      
                      <span className={styles.specValue}>
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
