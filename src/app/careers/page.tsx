import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { sanity } from "@/lib/sanity.client";
import Link from "next/link";
import { Briefcase, MapPin, Clock } from "lucide-react";

export const revalidate = 60; // Revalidate every minute

const jobsQuery = `
  *[_type == "jobPosting" && isActive == true] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    department,
    location,
    employmentType
  }
`;

export default async function CareersPage() {
  const jobs = await sanity.fetch(jobsQuery);

  return (
    <>
      <Navigation />

      <main className="careers-main">
        {/* HERO SECTION */}
        <section className="careers-hero">
          <div className="hero-content">
            <h1>Join Our Mission to Build a Smarter Future</h1>
            <p>
              At Sumith Electronics, we are pioneering Intelligent Traffic Management Systems (ITMS) across India. 
              We are looking for passionate, innovative thinkers to join our corporate team and shape the future of smart cities.
            </p>
            <a href="#positions" className="btn-explore">Explore Open Positions</a>
          </div>
          <div className="hero-background"></div>
        </section>

        {/* JOB POSTINGS SECTION */}
        <section id="positions" className="jobs-section">
          <div className="section-header">
            <h2>Current Openings</h2>
            <p>Ready to make an impact? Discover your next career opportunity below.</p>
          </div>

          <div className="jobs-grid">
            {jobs && jobs.length > 0 ? (
              jobs.map((job: any) => (
                <div key={job._id} className="job-card">
                  <div className="job-header">
                    <span className="department-badge">{job.department}</span>
                    <h3>{job.title}</h3>
                  </div>
                  <div className="job-meta">
                    <div className="meta-item">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={16} />
                      <span>{job.employmentType}</span>
                    </div>
                  </div>
                  <Link href={`/careers/${job.slug}`} className="btn-apply">
                    View Details
                  </Link>
                </div>
              ))
            ) : (
              <div className="no-jobs">
                <Briefcase size={48} color="#9ca3af" />
                <h3>No Open Positions Currently</h3>
                <p>We are not actively hiring right now, but please check back later!</p>
              </div>
            )}
          </div>
        </section>

        <section className="portal-cta">
          <p>Already applied or part of our team?</p>
          <Link href="/portal/login" className="btn-portal">Go to Career Portal</Link>
        </section>

      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .careers-main {
          min-height: 100vh;
          background: #f8fafc;
          padding-top: 100px; /* Offset for fixed navbar */
        }

        /* Hero */
        .careers-hero {
          position: relative;
          width: 100%;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f172a;
          color: white;
          overflow: hidden;
          padding: 80px 24px;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(37, 99, 235, 0.4), transparent 60%),
                      url('/grid-pattern.svg'); /* Optional subtle grid */
          opacity: 0.6;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          text-align: center;
        }

        .hero-content h1 {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
          line-height: 1.1;
        }

        .hero-content p {
          font-size: clamp(16px, 2vw, 20px);
          color: #cbd5e1;
          margin-bottom: 40px;
          line-height: 1.6;
          font-weight: 400;
        }

        .btn-explore {
          display: inline-block;
          background: #2563eb;
          color: white;
          padding: 16px 36px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, background 0.2s;
        }

        .btn-explore:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
        }

        /* Job Section */
        .jobs-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 24px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .section-header h2 {
          font-size: 36px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .section-header p {
          font-size: 18px;
          color: #64748b;
        }

        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
        }

        .job-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          border: 1px solid #e2e8f0;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
        }

        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
          border-color: #cbd5e1;
        }

        .job-header {
          margin-bottom: 24px;
        }

        .department-badge {
          display: inline-block;
          background: #eff6ff;
          color: #2563eb;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .job-card h3 {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.3;
        }

        .job-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 32px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
        }

        .btn-apply {
          margin-top: auto;
          display: block;
          text-align: center;
          background: #f1f5f9;
          color: #0f172a;
          padding: 14px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }

        .job-card:hover .btn-apply {
          background: #0b1f8f;
          color: white;
        }

        .no-jobs {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 24px;
          background: white;
          border-radius: 16px;
          border: 1px dashed #cbd5e1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .no-jobs h3 {
          font-size: 24px;
          color: #0f172a;
          margin: 16px 0 8px;
        }

        .no-jobs p {
          color: #64748b;
        }

        .portal-cta {
          text-align: center;
          padding: 60px 24px;
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
        }

        .portal-cta p {
          color: #64748b;
          margin-bottom: 16px;
        }

        .btn-portal {
          display: inline-block;
          background: transparent;
          color: #0f172a;
          border: 2px solid #0f172a;
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-portal:hover {
          background: #0f172a;
          color: white;
        }
      `}} />
    </>
  );
}
