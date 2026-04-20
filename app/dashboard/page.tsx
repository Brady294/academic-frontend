"use client";

import { useEffect, useState } from "react";

type StatusCard = {
  title: string;
  count: number;
  subtitle: string;
};

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const cards: StatusCard[] = [
    {
      title: "Open",
      count: 0,
      subtitle: "Newly submitted work waiting for review",
    },
    {
      title: "In Progress",
      count: 0,
      subtitle: "Assignments currently being worked on",
    },
    {
      title: "Complete",
      count: 0,
      subtitle: "Finished work already delivered to you",
    },
    {
      title: "Rated",
      count: 0,
      subtitle: "Assignments you have reviewed and rated",
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
      <aside className="sidebar">
        <div className="sidebar-brand">EssayMaster</div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>

          <a className="nav-item" href="/submit">
            Submit Assignment
          </a>

          <button className="nav-item" onClick={() => setActiveTab("open")}>
            Open Orders
          </button>

          <button className="nav-item" onClick={() => setActiveTab("progress")}>
            In Progress
          </button>

          <button className="nav-item" onClick={() => setActiveTab("complete")}>
            Complete
          </button>

          <button className="nav-item" onClick={() => setActiveTab("rated")}>
            Rated
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Track and manage all your assignments in one place.</p>
          </div>

          <div className="topbar-actions">
            <a href="/submit" className="primary-btn">
              Submit New Assignment
            </a>
          </div>
        </header>

        <section className="summary-grid">
          <div className="summary-card big">
            <div className="summary-badge">Overview</div>
            <h2>Your Assignment Workspace</h2>
            <p>
              Monitor each stage of your assignments from submission to final review
              using a cleaner and more structured dashboard.
            </p>
          </div>

          <div className="summary-card accent">
            <span className="mini-label">Total Active</span>
            <div className="big-number">0</div>
            <p>Assignments currently not yet fully closed.</p>
          </div>
        </section>

        <section className="cards-grid">
          {cards.map((card) => (
            <div className="stage-card" key={card.title}>
              <div className="stage-header">
                <h3>{card.title}</h3>
                <span className="stage-count">{card.count}</span>
              </div>
              <p>{card.subtitle}</p>
              <button className="view-btn">View {card.title}</button>
            </div>
          ))}
        </section>

        <section className="table-panel">
          <div className="panel-header">
            <h2>Recent Activity</h2>
            <span className="panel-note">Latest assignment movement will appear here</span>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Last Update</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="empty-row">
                    No assignment activity yet.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .dashboard-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 280px 1fr;
          background: #f5f7fb;
          color: #0f172a;
        }

        .sidebar {
          background: linear-gradient(180deg, #0f172a 0%, #16263f 100%);
          color: #ffffff;
          padding: 28px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100vh;
          position: sticky;
          top: 0;
        }

        .sidebar-brand {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: -0.04em;
          margin-bottom: 28px;
        }

        .sidebar-nav {
          display: grid;
          gap: 10px;
        }

        .nav-item {
          text-align: left;
          text-decoration: none;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.88);
          padding: 14px 16px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease;
        }

        .nav-item:hover,
        .nav-item.active {
          background: rgba(255,255,255,0.12);
          color: #ffffff;
        }

        .sidebar-footer {
          margin-top: 26px;
        }

        .logout-btn {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.08);
          color: #ffffff;
          border-radius: 14px;
          padding: 14px 16px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
        }

        .main-area {
          padding: 28px;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .page-title {
          margin: 0 0 6px;
          font-size: 40px;
          font-weight: 900;
          letter-spacing: -0.04em;
        }

        .page-subtitle {
          margin: 0;
          color: #64748b;
          font-size: 16px;
        }

        .primary-btn {
          text-decoration: none;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: #ffffff;
          padding: 14px 20px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 800;
          box-shadow: 0 14px 30px rgba(37, 99, 235, 0.22);
        }

        .summary-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr;
          gap: 20px;
          margin-bottom: 24px;
        }

        .summary-card {
          background: #ffffff;
          border: 1px solid #e6edf7;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);
        }

        .summary-card.big h2 {
          margin: 0 0 12px;
          font-size: 34px;
          font-weight: 900;
          letter-spacing: -0.04em;
        }

        .summary-card.big p {
          margin: 0;
          color: #475569;
          line-height: 1.8;
          font-size: 16px;
          max-width: 760px;
        }

        .summary-badge {
          display: inline-flex;
          padding: 9px 14px;
          border-radius: 999px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 14px;
        }

        .summary-card.accent {
          background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%);
          color: #ffffff;
        }

        .mini-label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          opacity: 0.85;
          margin-bottom: 12px;
        }

        .big-number {
          font-size: 56px;
          line-height: 1;
          font-weight: 900;
          margin-bottom: 10px;
        }

        .summary-card.accent p {
          margin: 0;
          font-size: 15px;
          line-height: 1.7;
          opacity: 0.95;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 24px;
        }

        .stage-card {
          background: #ffffff;
          border: 1px solid #e6edf7;
          border-radius: 22px;
          padding: 22px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);
        }

        .stage-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .stage-header h3 {
          margin: 0;
          font-size: 26px;
          font-weight: 900;
          letter-spacing: -0.03em;
        }

        .stage-count {
          min-width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: #eff6ff;
          color: #1d4ed8;
          font-size: 17px;
          font-weight: 900;
        }

        .stage-card p {
          margin: 0 0 18px;
          color: #475569;
          line-height: 1.7;
          font-size: 15px;
          min-height: 76px;
        }

        .view-btn {
          width: 100%;
          border: none;
          background: #f8fafc;
          color: #0f172a;
          padding: 12px 14px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
        }

        .table-panel {
          background: #ffffff;
          border: 1px solid #e6edf7;
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .panel-header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 900;
        }

        .panel-note {
          color: #64748b;
          font-size: 14px;
        }

        .table-wrap {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          font-size: 14px;
          color: #64748b;
          font-weight: 800;
          padding: 14px 12px;
          border-bottom: 1px solid #e6edf7;
        }

        td {
          padding: 18px 12px;
          border-bottom: 1px solid #eef2f7;
          font-size: 15px;
          color: #0f172a;
        }

        .empty-row {
          text-align: center;
          color: #64748b;
          padding: 28px 12px;
        }

        @media (max-width: 1200px) {
          .cards-grid {
            grid-template-columns: 1fr 1fr;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
          .dashboard-page {
            grid-template-columns: 1fr;
          }

          .sidebar {
            position: relative;
            min-height: auto;
            padding: 20px 16px;
          }

          .main-area {
            padding: 20px 14px 28px;
          }

          .page-title {
            font-size: 32px;
          }
        }

        @media (max-width: 640px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }

          .summary-card.big h2 {
            font-size: 28px;
          }

          .big-number {
            font-size: 44px;
          }

          .stage-header h3 {
            font-size: 22px;
          }

          .sidebar-brand {
            font-size: 28px;
          }
        }
      `}</style>
    </main>
  );
}