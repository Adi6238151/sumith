"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sanity } from "@/lib/sanity.client";

export default function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      const query = `*[_type == "footerSettings"][0]{
        heading,
        locations[]{
        city,
        companyName,
        addressLine1,
        addressLine2,
        addressLine3,
        addressLine4,
        email,
        phone
      },

        navigationLinks{
          primaryLinks[]{
            label,
            href,
            count
          },
          secondaryLinks[]{
            label,
            href,
            count,
            showArrow
          }
        },
        socialLinks{
          facebook,
          instagram,
          twitter,
          linkedin,
          behance
        },
        copyright,
        footerLinks[]{
          label,
          href
        },
        seo{
          organizationName,
          organizationDescription,
          foundingYear,
          email,
          phone
        }
      }`;
      const data = await sanity.fetch(query);
      setFooterData(data);
    };
    fetchFooter();
  }, []);

  // Generate SEO Schema
  const generateSchema = () => {
    if (!footerData?.seo) return null;

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": footerData.seo.organizationName,
      "description": footerData.seo.organizationDescription,
      "foundingDate": footerData.seo.foundingYear,
      "email": footerData.seo.email,
      "telephone": footerData.seo.phone,
      "address": footerData.locations?.map(location => ({
        "@type": "PostalAddress",
        "addressLocality": location.city,
        "streetAddress": `${location.addressLine1 || ''}, ${location.addressLine2 || ''}`.trim(),
        "addressCountry": location.city?.includes("Singapore") ? "SG" : 
                         location.city?.includes("Hyderabad") || location.city?.includes("India") ? "IN" : 
                         location.city?.includes("Bali") || location.city?.includes("Indonesia") ? "ID" : ""
      })),
      "sameAs": [
        footerData.socialLinks?.facebook,
        footerData.socialLinks?.instagram,
        footerData.socialLinks?.twitter,
        footerData.socialLinks?.linkedin,
        footerData.socialLinks?.behance
      ].filter(Boolean)
    };

    return organizationSchema;
  };

  // Static fallback while loading
  if (!footerData) {
    return <FooterSkeleton />;
  }

  const schema = generateSchema();

  return (
    <>
      {/* SEO Schema */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <footer className="footer">
        <div className="footer-container">
          {/* Main Heading */}
          <div className="footer-hero">
            <h2 className="footer-title">{footerData.heading}</h2>
          </div>

          <div className="footer-content">
            {/* Locations */}
            <div className="footer-locations">
              {footerData.locations?.map((location, index) => (
                <div key={index} className="location">
                  <h3 className="location-title">{location.city}</h3>
                  <div className="location-details">
                    {location.companyName && <p>{location.companyName}</p>}
                    {location.addressLine1 && <p>{location.addressLine1}</p>}
                    {location.addressLine2 && <p>{location.addressLine2}</p>}
                    {location.addressLine3 && <p>{location.addressLine3}</p>}
                    {location.addressLine4 && <p>{location.addressLine4}</p>}
                    {location.email && (
  <div className="contact-item">
    <span className="contact-icon-wrapper">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    </span>
    <a href={`mailto:${location.email}`} className="contact-link">{location.email}</a>
  </div>
)}
{location.phone && (
  <div className="contact-item">
    <span className="contact-icon-wrapper">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    </span>
    <a href={`tel:${location.phone}`} className="contact-link">{location.phone}</a>
  </div>
)}

                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Links */}
            <div className="footer-nav">
              <div className="nav-column">
                {footerData.navigationLinks?.primaryLinks?.map((link, index) => (
                  <Link key={index} href={link.href} className="nav-link">
                    {link.label}
                    {link.count && <sup>{link.count}</sup>}
                  </Link>
                ))}
              </div>

              <div className="nav-column">
                {footerData.navigationLinks?.secondaryLinks?.map((link, index) => (
                  <Link key={index} href={link.href} className="nav-link">
                    {link.label}
                    {link.count && <sup>{link.count}</sup>}
                    {link.showArrow && <span className="arrow">→</span>}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="footer-social">
              {footerData.socialLinks?.facebook && (
                <a
                  href={footerData.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Facebook"
                >
                  Fb
                </a>
              )}
              {footerData.socialLinks?.instagram && (
                <a
                  href={footerData.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Instagram"
                >
                  Ig
                </a>
              )}
              {footerData.socialLinks?.twitter && (
                <a
                  href={footerData.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Twitter"
                >
                  Tw
                </a>
              )}
              {footerData.socialLinks?.linkedin && (
                <a
                  href={footerData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  In
                </a>
              )}
              {footerData.socialLinks?.behance && (
                <a
                  href={footerData.socialLinks.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Behance"
                >
                  Be
                </a>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p className="copyright">{footerData.copyright}</p>
            <div className="footer-links">
              {footerData.footerLinks?.map((link, index) => (
                <Link key={index} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer {
          background: #0a0a0a;
          color: #e0e0e0;
          padding: 80px 24px 40px;
          font-family: "Montserrat", Arial, sans-serif;
        }
        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
        }
        .footer-hero {
          margin-bottom: 80px;
        }
        .footer-title {
          font-size: 5rem;
          font-weight: 300;
          color: #d4d4d4;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
        }
        .footer-content {
          display: grid;
          grid-template-columns: 1fr 1fr 0.5fr;
          gap: 80px;
          margin-bottom: 60px;
        }
        .footer-locations {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }
        .location-title {
          font-size: 1rem;
          font-weight: 600;
          color: #e0e0e0;
          margin-bottom: 12px;
          letter-spacing: 0.02em;
        }
        .location-details {
          font-size: 0.9rem;
          line-height: 1.7;
          color: #999;
          font-weight: 300;
        }
        .location-details p {
          margin: 0;
        }
        .footer-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .nav-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .nav-link {
          font-size: 0.95rem;
          color: #ccc;
          text-decoration: none;
          transition: color 0.3s ease;
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link sup {
          font-size: 0.65rem;
          color: #777;
          font-weight: 300;
        }
        .nav-link:hover {
          color: #ffc107;
        }
        .arrow {
          font-size: 1.1rem;
          transition: transform 0.3s ease;
        }
        .nav-link:hover .arrow {
          transform: translateX(5px);
        }
        .footer-social {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: flex-start;
        }
        .social-link {
          font-size: 0.95rem;
          color: #ccc;
          text-decoration: none;
          transition: color 0.3s ease;
          font-weight: 400;
        }
        .social-link:hover {
          color: #ffc107;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 40px;
          border-top: 1px solid #222;
        }
        .copyright {
          font-size: 0.85rem;
          color: #666;
          margin: 0;
        }
        .footer-links {
          display: flex;
          gap: 24px;
        }
        .footer-link {
          font-size: 0.85rem;
          color: #666;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-link:hover {
          color: #ffc107;
        }
        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 50px;
          }
          .footer-social {
            grid-column: 1 / -1;
            flex-direction: row;
            gap: 24px;
          }
        }
        @media (max-width: 768px) {
          .footer {
            padding: 60px 24px 30px;
          }
          .footer-title {
            font-size: 3rem;
          }
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-nav {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }
        }
        @media (max-width: 480px) {
          .footer-title {
            font-size: 2.5rem;
          }
          .location-title {
            font-size: 0.95rem;
          }
          .location-details {
            font-size: 0.85rem;
          }
          .nav-link,
          .social-link {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}

// Loading skeleton
function FooterSkeleton() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-hero">
            <div className="skeleton-title"></div>
          </div>
          <div className="footer-content">
            <div className="skeleton-section"></div>
            <div className="skeleton-section"></div>
            <div className="skeleton-section"></div>
          </div>
        </div>
      </footer>
      <style jsx>{`
        .footer {
          background: #0a0a0a;
          padding: 80px 24px 40px;
        }
        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          .contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}
.contact-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: #999;
  flex-shrink: 0;
}
.contact-icon-wrapper svg {
  display: block;
}
.contact-link {
  color: #999;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.9rem;
  line-height: 1;
}
.contact-link:hover {
  color: #ffc107;
}



        }
        .skeleton-title {
          height: 80px;
          width: 400px;
          background: #1a1a1a;
          border-radius: 8px;
          margin-bottom: 80px;
          animation: pulse 1.5s ease-in-out infinite;
        }
        .footer-content {
          display: grid;
          grid-template-columns: 1fr 1fr 0.5fr;
          gap: 80px;
        }
        .skeleton-section {
          height: 200px;
          background: #1a1a1a;
          border-radius: 8px;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
          .skeleton-title {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </>
  );
}
