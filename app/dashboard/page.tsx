"use client";

import { useEffect, useState } from "react";

type StatusCard = {
  title: string;
  count: number;
  description: string;
};

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  const statusCards: StatusCard[] = [
    {
      title: "Open",
      count: 0,
      description:
        "Newly submitted assignments appear here until the admin confirms everything is complete and ready to begin.",
    },
    {
      title: "In Progress",
      count: 0,
      description:
        "Assignments that have been approved and are currently being worked on appear in this section.",
    },
    {
      title: "Complete",
      count: 0,
      description:
        "Finished assignments that have been delivered to the client are moved here.",
    },
    {
      title: "Rated",
      count: 0,
      description:
        "Once the client is fully satisfied and leaves feedback, the assignment moves to this stage.",
    },
  ];

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
            <p className="subtext">Assignment Dashboard</p>
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

        <section className="intro-card">
          <div className="intro-badge">Dashboard Overview</div>
          <h1 className="intro-title">Track every assignment by stage</h1>
          <p className="intro-text">
            Your assignments move through a clear workflow from submission to
            final client satisfaction.
          </p>
        </section>

        <section className="status-grid">
          {statusCards.map((card) => (
            <div className="status-card" key={card.title}>
              <div className="status-top">
                <h2>{card.title}</h2>
                <span className="status-count">{card.count}</span>
              </div>
              <p>{card.description}</p>
            </div>
          ))}
        </section>

        <section className="workflow-card">
          <h2 className="workflow-title">Assignment Flow</h2>
          <div className="workflow-steps">
            <div className="workflow-step">Open</div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">In Progress</div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">Complete</div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">Rated</div>
          </div>
        </section>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .dashboard-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8fbff 0%, #eef4ff 48%, #ffffff 100%);
          padding: 28px 18px 40px;
        }

        .dashboard-shell {
          max-width: 1180px;
          margin: 0 auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
          margin-bottom: 26px;
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

        .intro-card {
          background: #ffffff;
          border: 1px solid #e8eef7;
          border-radius: 28px;
          padding: 30px;
          box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
          margin-bottom: 22px;
        }

        .intro-badge {
          display: inline-flex;
          padding: 10px 16px;
          border-radius: 999px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .intro-title {
          margin: 0 0 14px;
          font-size: 48px;
          line-height: 1;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.04em;
        }

        .intro-text {
          margin: 0;
          color: #475569;
          font-size: 18px;
          line-height: 1.7;
          max-width: 760px;
        }

        .status-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 22px;
        }

        .status-card {
          background: #ffffff;
          border: 1px solid #e8eef7;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 14px 36px rgba(15, 23, 42, 0.06);
        }

        .status-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .status-top h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 900;
          color: #0f172a;
        }

        .status-count {
          min-width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: #eff6ff;
          color: #1d4ed8;
          font-size: 16px;
          font-weight: 900;
        }

        .status-card p {
          margin: 0;
          color: #475569;
          line-height: 1.75;
          font-size: 15px;
        }

        .workflow-card {
          background: #ffffff;
          border: 1px solid #e8eef7;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 14px 36px rgba(15, 23, 42, 0.06);
        }

        .workflow-title {
          margin: 0 0 18px;
          font-size: 26px;
          font-weight: 900;
          color: #0f172a;
        }

        .workflow-steps {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
        }

        .workflow-step {
          background: #eff6ff;
          color: #1d4ed8;
          padding: 12px 18px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 15px;
        }

        .workflow-arrow {
          color: #64748b;
          font-size: 18px;
          font-weight: 900;
        }

        @media (max-width: 1100px) {
          .status-grid {
            grid-template-columns: 1fr 1fr;
          }

          .intro-title {
            font-size: 40px;
          }
        }

        @media (max-width: 768px) {
          .dashboard-page {
            padding: 20px 14px 30px;
          }

          .brand {
            font-size: 28px;
          }

          .intro-card,
          .workflow-card,
          .status-card {
            border-radius: 20px;
          }

          .intro-card {
            padding: 22px 16px;
          }

          .intro-title {
            font-size: 32px;
          }

          .intro-text {
            font-size: 16px;
          }

          .status-grid {
            grid-template-columns: 1fr;
          }

          .status-card {
            padding: 20px 16px;
          }

          .workflow-card {
            padding: 20px 16px;
          }

          .workflow-title {
            font-size: 22px;
          }
        }
      `}</style>
    </main>
  );
}