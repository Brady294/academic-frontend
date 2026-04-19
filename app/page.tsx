export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fbff 0%, #eef4ff 48%, #ffffff 100%)",
        color: "#0f172a",
      }}
    >
      <nav className="landing-nav">
        <div className="brand">EssayMaster</div>

        <div className="nav-actions">
          <a href="/login" className="nav-login">
            Login
          </a>

          <a href="/register" className="nav-register">
            Get Started
          </a>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-left">
          <div className="hero-badge">Premium Academic Writing Platform</div>

          <h1 className="hero-title">EssayMaster</h1>

          <p className="hero-text">
            High-quality academic writing support with fast delivery, clean
            work, and a secure student dashboard.
          </p>

          <div className="hero-points">
            <span>Fast submissions</span>
            <span>Secure dashboard</span>
            <span>Reliable support</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <div className="hero-circle-one" />
            <div className="hero-circle-two" />

            <div className="hero-content">
              <div className="hero-top-card">
                <p className="top-label">Trusted Platform</p>
                <h3 className="hero-top-title">
                  Built for serious academic performance
                </h3>
              </div>

              <div className="stats-grid-two">
                <div className="glass-card">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Clients served</div>
                </div>

                <div className="glass-card">
                  <div className="stat-number">95%+</div>
                  <div className="stat-label">Score focus</div>
                </div>
              </div>

              <div className="stats-grid-one">
                <div className="glass-card">
                  <div className="feature-title">AI-Free &amp; Plagiarism-Free</div>
                  <div className="feature-text">
                    Clean work prepared for quality and originality.
                  </div>
                </div>

                <div className="glass-card">
                  <div className="feature-title">Fast Turnaround</div>
                  <div className="feature-text">
                    Quick processing for urgent and standard deadlines.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bottom-section">
        <div className="bottom-grid">
          <div className="bottom-card">
            <h3 className="bottom-title">AI-Free &amp; Plagiarism-Free</h3>
            <p className="bottom-text">
              Work prepared with originality, clarity, and academic quality in
              mind.
            </p>
          </div>

          <div className="bottom-card">
            <h3 className="bottom-title">95%+ Score Focus</h3>
            <p className="bottom-text">
              Structured support designed to meet high academic standards.
            </p>
          </div>

          <div className="bottom-card">
            <h3 className="bottom-title">10,000+ Clients Served</h3>
            <p className="bottom-text">
              Trusted by a growing client base across multiple academic needs.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .landing-nav {
          width: 100%;
          padding: 24px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand {
          font-size: 30px;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: #0f172a;
        }

        .nav-actions {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .nav-login {
          text-decoration: none;
          color: #0f172a;
          font-weight: 700;
          padding: 12px 18px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid #dbe3f0;
          white-space: nowrap;
        }

        .nav-register {
          text-decoration: none;
          color: #ffffff;
          background: #2563eb;
          font-weight: 800;
          padding: 13px 20px;
          border-radius: 14px;
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.25);
          white-space: nowrap;
        }

        .hero-section {
          width: 100%;
          padding: 40px 48px 30px;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: 34px;
          align-items: center;
        }

        .hero-left,
        .hero-right {
          min-width: 0;
          width: 100%;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          padding: 9px 16px;
          border-radius: 999px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 22px;
        }

        .hero-title {
          font-size: 78px;
          line-height: 0.95;
          font-weight: 900;
          letter-spacing: -0.06em;
          margin: 0 0 22px;
          max-width: 720px;
        }

        .hero-text {
          font-size: 24px;
          line-height: 1.6;
          color: #334155;
          margin: 0 0 28px;
          max-width: 720px;
        }

        .hero-points {
          display: flex;
          gap: 18px 26px;
          flex-wrap: wrap;
          margin-top: 12px;
          color: #475569;
          font-size: 17px;
          font-weight: 700;
        }

        .hero-card {
          background: linear-gradient(135deg, #081633 0%, #1d4ed8 55%, #60a5fa 100%);
          border-radius: 30px;
          padding: 30px;
          color: #ffffff;
          box-shadow: 0 34px 70px rgba(15, 23, 42, 0.22);
          position: relative;
          overflow: hidden;
          min-height: 520px;
          width: 100%;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-circle-one {
          position: absolute;
          width: 240px;
          height: 240px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          top: -50px;
          right: -40px;
        }

        .hero-circle-two {
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          bottom: -18px;
          left: -18px;
        }

        .hero-top-card {
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 18px;
          backdrop-filter: blur(8px);
        }

        .top-label {
          margin: 0 0 8px;
          font-size: 14px;
          opacity: 0.9;
        }

        .hero-top-title {
          margin: 0;
          font-size: 30px;
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.15;
        }

        .stats-grid-two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .stats-grid-one {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 20px;
          padding: 22px;
        }

        .stat-number {
          font-size: 34px;
          font-weight: 900;
        }

        .stat-label {
          font-size: 15px;
          opacity: 0.95;
          margin-top: 4px;
        }

        .feature-title {
          font-size: 26px;
          font-weight: 900;
          line-height: 1.2;
        }

        .feature-text {
          font-size: 15px;
          opacity: 0.95;
          margin-top: 8px;
          line-height: 1.6;
        }

        .bottom-section {
          width: 100%;
          padding: 10px 48px 80px;
        }

        .bottom-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .bottom-card {
          background: #ffffff;
          padding: 30px;
          border-radius: 24px;
          box-shadow: 0 12px 34px rgba(15, 23, 42, 0.07);
          border: 1px solid #eef2f7;
          min-width: 0;
        }

        .bottom-title {
          margin: 0 0 12px;
          font-size: 24px;
          font-weight: 900;
          line-height: 1.2;
        }

        .bottom-text {
          margin: 0;
          color: #475569;
          line-height: 1.8;
          font-size: 17px;
        }

        @media (max-width: 1100px) {
          .hero-section {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .hero-title {
            font-size: 64px;
          }

          .hero-card {
            min-height: auto;
          }

          .bottom-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .landing-nav {
            padding: 16px 18px;
            flex-direction: row;
            align-items: center;
            gap: 10px;
          }

          .brand {
            font-size: 24px;
            flex-shrink: 0;
          }

          .nav-actions {
            gap: 8px;
            margin-left: auto;
          }

          .nav-login,
          .nav-register {
            padding: 10px 12px;
            font-size: 12px;
            border-radius: 10px;
          }

          .hero-section {
            padding: 22px 18px 18px;
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .hero-badge {
            font-size: 11px;
            padding: 7px 11px;
            margin-bottom: 16px;
          }

          .hero-title {
            font-size: 46px;
            line-height: 0.98;
            margin-bottom: 16px;
          }

          .hero-text {
            font-size: 17px;
            line-height: 1.7;
            margin-bottom: 18px;
          }

          .hero-points {
            font-size: 14px;
            gap: 10px 16px;
          }

          .hero-card {
            padding: 18px;
            border-radius: 24px;
          }

          .hero-top-card {
            padding: 16px;
            border-radius: 16px;
            margin-bottom: 14px;
          }

          .top-label {
            font-size: 12px;
          }

          .hero-top-title {
            font-size: 22px;
            line-height: 1.18;
          }

          .stats-grid-two {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 12px;
          }

          .stats-grid-one {
            gap: 12px;
          }

          .glass-card {
            padding: 16px;
            border-radius: 16px;
          }

          .stat-number {
            font-size: 26px;
          }

          .stat-label {
            font-size: 13px;
          }

          .feature-title {
            font-size: 20px;
          }

          .feature-text {
            font-size: 13px;
            line-height: 1.5;
          }

          .bottom-section {
            padding: 6px 18px 42px;
          }

          .bottom-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .bottom-card {
            padding: 18px;
            border-radius: 18px;
          }

          .bottom-title {
            font-size: 19px;
            margin-bottom: 8px;
          }

          .bottom-text {
            font-size: 14px;
            line-height: 1.65;
          }
        }

        @media (max-width: 420px) {
          .landing-nav {
            padding: 14px 14px;
          }

          .brand {
            font-size: 21px;
          }

          .nav-actions {
            gap: 6px;
          }

          .nav-login,
          .nav-register {
            font-size: 11px;
            padding: 9px 10px;
          }

          .hero-section {
            padding: 18px 14px 16px;
          }

          .hero-title {
            font-size: 38px;
          }

          .hero-text {
            font-size: 15px;
          }

          .hero-points {
            font-size: 13px;
          }

          .hero-card {
            padding: 14px;
            border-radius: 20px;
          }

          .hero-top-card,
          .glass-card {
            padding: 14px;
          }

          .hero-top-title {
            font-size: 19px;
          }

          .stats-grid-two {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .stat-number {
            font-size: 22px;
          }

          .stat-label {
            font-size: 12px;
          }

          .feature-title {
            font-size: 17px;
          }

          .feature-text {
            font-size: 12px;
          }

          .bottom-card {
            padding: 16px;
          }

          .bottom-title {
            font-size: 17px;
          }

          .bottom-text {
            font-size: 13px;
          }
        }
      `}</style>
    </main>
  );
}