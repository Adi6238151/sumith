"use client";

export default function ProductTabs() {
  return (
    <>
      <div className="product-tabs">
        <div className="product-tabs-inner">
          <button className="tab tab--active" type="button">Features</button>
          <button className="tab" type="button">Specifications</button>
          <button className="tab" type="button">Ordering</button>
          <button className="tab" type="button">Trackers</button>
        </div>
      </div>

      <style jsx>{`
        .product-tabs {
          width: 100%;
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
          position: sticky;
          top: 0; /* will sit under navbar if navbar is fixed */
          z-index: 20;
        }

        .product-tabs-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          gap: 60px;
          justify-content: center;
        }

        .tab {
          border: none;
          background: transparent;
          font-size: 1rem;
          color: #6b7280;
          padding: 10px 0;
          cursor: pointer;
          position: relative;
        }

        .tab--active {
          color: #111827;
        }

        .tab--active::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -16px;
          height: 3px;
          background: #1f83d0;
          border-radius: 999px;
        }

        @media (max-width: 640px) {
          .product-tabs-inner {
            gap: 22px;
            justify-content: space-between;
          }
        }
      `}</style>
    </>
  );
}
