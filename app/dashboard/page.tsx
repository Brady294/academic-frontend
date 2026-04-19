"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setMounted(true);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }

  if (!mounted) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <p>Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <a href="/" className="brand">
              EssayMaster
            </a>
            <p className="subtext">Student Dashboard</p>
          </div>

          <div className="header-actions">
            <a href="/submit" className="primary-btn">
              Submit New Assignment
            </a>
            <button className="secondary-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <section className="hero-card">
          <div className="hero-left">
            <div className="hero-badge">Dashboard</div>
            <h1 className="hero-title">Welcome to your workspace</h1>
            <p className="hero-text">
              Submit assignments, upload files, track progress, and manage your
              academic requests from one place.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>New Request</h3>
              <p>Start a fresh assignment submission with files and instructions.</p>
            </div>

            <div className="stat-card">
              <h3>Secure Uploads</h3>
              <p>Upload documents, spreadsheets, presentations, PDFs, images, and more.</p>
            </div>

            <div className="stat-card">
              <h3>Fast Access</h3>
              <p>Move quickly between your dashboard and submission flow.</p>
            </div>

            <div className="stat-card">
              <h3>Organized Workflow</h3>
              <p>Keep everything in one clean and responsive interface.</p>
            </div>
          </div>
        </section>

        <section className="quick-actions">
          <a href="/submit" className="action-card">
            <h3>Submit New Assignment</h3>
            <p>Upload your files and add all assignment instructions.</p>
          </a>

          <div className="action-card">
            <h3>Accepted File Types</h3>
            <p>PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, ZIP, JPG, JPEG, PNG, CSV and more.</p>
          </div>
        </section>
      </div>

      <style>{`
        * { box-sizing: border-box; }

        .dashboard-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8fbff 0%, #eef4ff 48%, #ffffff 100%);
          padding: 32px 20px;
        }

        .dashboard-shell {
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .brand {
          text-decoration: none;
          color: #0f172a;
          font-size: 34px;
          font-weight: 900;
          letter-spacing: -0.04em;
        }

        .subtext {
          margin: 6px 0 0;
          color: #64748b;
          font-size: 15px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .primary-btn,
        .secondary-btn {
          border: none;
          text-decoration: none;
          padding: 14px 18px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
        }

        .primary-btn {
          background: #2563eb;
          color: #ffffff;
          box-shadow: 0 12px 28px rgba(37, 99, 235, 0.22);
        }

        .secondary-btn {
          background: #ffffff;
          color: #0f172a;
          border: 1px solid #dbe3f0;
        }

        .hero-card {
          background: #ffffff;
          border: 1px solid #e8eef7;
          border-radius: 30px;
          padding: 32px;
          box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          margin-bottom: 24px;
        }

        .hero-badge {
          display: inline-flex;
          padding: 10px 16px;
          border-radius: 999px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .hero-title {
          margin: 0 0 16px;
          font-size: 56px;
          line-height: 0.98;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.05em;
        }

        .hero-text {
          margin: 0;
          color: #334155;
          font-size: 20px;
          line-height: 1.7;
          max-width: 560px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .stat-card {
          background: linear-gradient(135deg, #081633 0%, #1d4ed8 55%, #60a5fa 100%);
          color: #ffffff;
          border-radius: 22px;
          padding: 22px;
        }

        .stat-card h3 {
          margin: 0 0 10px;
          font-size: 22px;
          font-weight: 900;
        }

        .stat-card p {
          margin: 0;
          line-height: 1.6;
          font-size: 15px;
          opacity: 0.95;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .action-card {
          display: block;
          text-decoration: none;
          background: #ffffff;
          color: #0f172a;
          border: 1px solid #e8eef7;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 18px 48px rgba(15, 23, 42, 0.06);
        }

        .action-card h3 {
          margin: 0 0 12px;
          font-size: 24px;
          font-weight: 900;
        }

        .action-card p {
          margin: 0;
          color: #475569;
          line-height: 1.7;
        }

        @media (max-width: 980px) {
          .hero-card {
            grid-template-columns: 1fr;
          }

          .quick-actions {
            grid-template-columns: 1fr;
          }

          .hero-title {
            font-size: 42px;
          }

          .hero-text {
            font-size: 17px;
          }
        }

        @media (max-width: 768px) {
          .dashboard-page {
            padding: 20px 14px;
          }

          .brand {
            font-size: 28px;
          }

          .hero-card {
            padding: 22px 16px;
            border-radius: 22px;
          }

          .hero-title {
            font-size: 34px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .action-card {
            padding: 20px 16px;
          }
        }
      `}</style>
    </main>
  );
}