import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { sanity } from "@/lib/sanity.client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Briefcase, MapPin, Clock, ChevronLeft } from "lucide-react";

export const revalidate = 60;

const jobQuery = `
  *[_type == "jobPosting" && slug.current == $slug && isActive == true][0]{
    _id,
    title,
    department,
    location,
    employmentType,
    description,
    requirements
  }
`;

export default async function JobDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const job = await sanity.fetch(jobQuery, { slug });

  if (!job) {
    notFound();
  }

  return (
    <>
      <Navigation />

      <main className="job-main">
        <div className="job-container">
          <Link href="/careers" className="back-link">
            <ChevronLeft size={16} /> Back to all careers
          </Link>

          <header className="job-header-section">
            <span className="department-badge">{job.department}</span>
            <h1 className="job-title">{job.title}</h1>
            
            <div className="job-meta-row">
              <div className="meta-pill">
                <MapPin size={18} />
                <span>{job.location}</span>
              </div>
              <div className="meta-pill">
                <Clock size={18} />
                <span>{job.employmentType}</span>
              </div>
            </div>
            
            <Link href={`/careers/${slug}/apply`} className="apply-btn-primary">
              Apply for this position
            </Link>
          </header>

          <div className="job-body">
            <div className="job-description-block">
              <h2>Role Overview</h2>
              <div className="description-content" style={{ whiteSpace: "pre-wrap" }}>
                {job.description}
              </div>
            </div>

            {job.requirements && job.requirements.length > 0 && (
              <div className="job-requirements-block">
                <h2>What We Are Looking For</h2>
                <ul className="requirements-list">
                  {job.requirements.map((req: string, i: number) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="bottom-cta">
            <Link href={`/careers/${slug}/apply`} className="apply-btn-primary">
              Apply for this position
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .job-main {
          min-height: 100vh;
          background: #f8fafc;
          padding: 140px 24px 80px;
        }

        .job-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 60px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.04);
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 40px;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: #0f172a;
        }

        .job-header-section {
          margin-bottom: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid #e2e8f0;
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
          margin-bottom: 20px;
        }

        .job-title {
          font-size: 40px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 24px;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .job-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 32px;
        }

        .meta-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f1f5f9;
          padding: 10px 18px;
          border-radius: 8px;
          color: #334155;
          font-size: 15px;
          font-weight: 500;
        }

        .apply-btn-primary {
          display: inline-block;
          background: #2563eb;
          color: white;
          padding: 16px 40px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }

        .apply-btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
        }

        .job-body h2 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 24px;
        }

        .job-description-block {
          margin-bottom: 48px;
        }

        .description-content {
          color: #334155;
          font-size: 16px;
          line-height: 1.8;
        }

        .requirements-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .requirements-list li {
          position: relative;
          padding-left: 28px;
          color: #334155;
          font-size: 16px;
          line-height: 1.6;
        }

        .requirements-list li::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 0;
          color: #2563eb;
          font-weight: 800;
        }

        .bottom-cta {
          margin-top: 64px;
          padding-top: 48px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
        }

        @media (max-width: 640px) {
          .job-container {
            padding: 32px 24px;
          }
          .job-title {
            font-size: 32px;
          }
        }
      `}</style>
    </>
  );
}
