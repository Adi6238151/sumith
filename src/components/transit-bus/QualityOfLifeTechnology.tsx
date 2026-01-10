"use client";
import React, { useState } from "react";


type Tab = {
  tabTitle: string;
  image: { asset?: { url?: string } } | string; // Handles Sanity image object OR direct string
  listItems: string[];
};


type Props = {
  title: string;
  tabs: Tab[];
};


const getImageUrl = (img: Tab["image"]): string => {
  if (!img) return ""; // ← Added null check
  if (typeof img === "string") return img;
  if (img && typeof img === "object" && "asset" in img && img.asset?.url) return img.asset.url;
  return "";
};


const QualityOfLifeTechnology: React.FC<Props> = ({ title, tabs }) => {
  const [active, setActive] = useState(0);


  if (!tabs || tabs.length === 0) {
    return <div>No tabs available.</div>;
  }


  return (
    <div style={{ width: "100%", margin: "0 auto", marginTop: 32 }}>
      <h1
        style={{
          fontWeight: 700,
          fontSize: "3rem",
          textAlign: "center",
          letterSpacing: "-.03em",
          marginBottom: 36,
        }}
      >
        {title}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 0,
          marginBottom: 25,
        }}
      >
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            style={{
              background: active === idx ? "#E80000" : "#e6e6e6",
              color: active === idx ? "#fff" : "#222",
              border: "none",
              fontWeight: 600,
              fontSize: "1.5rem",
              padding: "14px 54px",
              borderRadius: active === idx ? "7px 7px 0 0" : "7px",
              marginRight: idx < tabs.length - 1 ? 14 : 0,
              boxShadow: active === idx ? "0 7px 32px #e8000041" : "none",
              cursor: "pointer",
              transition: "all .2s",
            }}
          >
            {tab.tabTitle}
          </button>
        ))}
      </div>
      {/* Main body */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "center",
          background: "none",
          maxWidth: 1060,
          margin: "0 auto",
        }}
      >
        {/* Left: image */}
        <div
          style={{
            flex: "1 0 52%",
            minWidth: 0,
            position: "relative",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {getImageUrl(tabs[active]?.image) ? (
            <img
              src={getImageUrl(tabs[active].image)}
              alt={tabs[active]?.tabTitle || "Technology"}
              onError={(e) => {
                // Hide image if it fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
              style={{
                width: 460,
                maxWidth: "90%",
                height: 340,
                borderRadius: "20px 0 0 20px",
                objectFit: "cover",
                boxShadow: "0 12px 60px rgba(0,0,0,.21)",
              }}
            />
          ) : (
            <div
              style={{
                width: 460,
                maxWidth: "90%",
                height: 340,
                borderRadius: "20px 0 0 20px",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
                fontSize: "1rem",
              }}
            >
              No image available
            </div>
          )}
        </div>
        {/* Right: glassy card */}
        <div
          style={{
            flex: "1 0 48%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
            minHeight: 340,
          }}
        >
          <div
            style={{
              width: "95%",
              background: "rgba(255,255,255,0.98)",
              borderRadius: "0 18px 18px 0",
              minHeight: 270,
              margin: "0",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 12px 40px #0002",
              border: "1px solid #f4f3f6",
              padding: "2.7rem 2.6rem 2.7rem 2.1rem",
              position: "relative",
              zIndex: 2,
            }}
          >
            <ul
              style={{
                listStyle: "disc",
                margin: 0,
                paddingLeft: "26px",
                fontSize: "1.4rem",
                fontWeight: 400,
                color: "#191a1c",
                minWidth: "250px",
              }}
            >
              {tabs[active]?.listItems && tabs[active].listItems.length > 0 ? (
                tabs[active].listItems.map((item, i) => (
                  <li key={i} style={{ marginBottom: "1.3rem", lineHeight: 1.4 }}>
                    {item}
                  </li>
                ))
              ) : (
                <li style={{ marginBottom: "1.3rem", lineHeight: 1.4, color: "#999" }}>
                  No items available
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* End main body */}
      {/* Red bar bottom edge */}
      <div
        style={{
          width: "100%",
          maxWidth: 1060,
          margin: "28px auto 0 auto",
          height: 8,
          borderRadius: 11,
          background: "linear-gradient(90deg, #e80000 50%, #e0e0e0 50%)",
        }}
      />
    </div>
  );
};


export default QualityOfLifeTechnology;
