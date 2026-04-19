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
      <nav
        style={{
          width: "100%",
          padding: "24px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "#0f172a",
          }}
        >
          EssayMaster
        </div>

        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <a
            href="/login"
            style={{
              textDecoration: "none",
              color: "#0f172a",
              fontWeight: 700,
              padding: "12px 18px",
              borderRadius: "12px",
              background: "#ffffff",
              border: "1px solid #dbe3f0",
            }}
          >
            Login
          </a>

          <a
            href="/register"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              background: "#2563eb",
              fontWeight: 800,
              padding: "13px 20px",
              borderRadius: "14px",
              boxShadow: "0 12px 30px rgba(37, 99, 235, 0.25)",
            }}
          >
            Get Started
          </a>
        </div>
      </nav>

      <section
        style={{
          width: "100%",
          padding: "40px 48px 30px",
          boxSizing: "border-box",
          display: "grid",
          gridTemplateColumns: "1.08fr 0.92fr",
          gap: "34px",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 16px",
              borderRadius: "999px",
              background: "#dbeafe",
              color: "#1d4ed8",
              fontSize: "14px",
              fontWeight: 800,
              marginBottom: "22px",
            }}
          >
            Premium Academic Writing Platform
          </div>

          <h1
            style={{
              fontSize: "78px",
              lineHeight: "0.95",
              fontWeight: 900,
              letterSpacing: "-0.06em",
              margin: "0 0 22px",
              maxWidth: "720px",
            }}
          >
            EssayMaster
          </h1>

          <p
            style={{
              fontSize: "24px",
              lineHeight: "1.6",
              color: "#334155",
              margin: "0 0 28px",
              maxWidth: "720px",
            }}
          >
            High-quality academic writing support with fast delivery, clean work,
            and a secure student dashboard.
          </p>

          <div
            style={{
              display: "flex",
              gap: "26px",
              flexWrap: "wrap",
              marginTop: "12px",
              color: "#475569",
              fontSize: "17px",
              fontWeight: 700,
            }}
          >
            <span>Fast submissions</span>
            <span>Secure dashboard</span>
            <span>Reliable support</span>
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <div
            style={{
              background:
                "linear-gradient(135deg, #081633 0%, #1d4ed8 55%, #60a5fa 100%)",
              borderRadius: "30px",
              padding: "30px",
              color: "#ffffff",
              boxShadow: "0 34px 70px rgba(15, 23, 42, 0.22)",
              position: "relative",
              overflow: "hidden",
              minHeight: "520px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "240px",
                height: "240px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.12)",
                top: "-50px",
                right: "-40px",
              }}
            />

            <div
              style={{
                position: "absolute",
                width: "150px",
                height: "150px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                bottom: "-18px",
                left: "-18px",
              }}
            />

            <div style={{ position: "relative", zIndex: 2 }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "20px",
                  padding: "20px",
                  marginBottom: "18px",
                  backdropFilter: "blur(8px)",
                }}
              >
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: "14px",
                    opacity: 0.9,
                  }}
                >
                  Trusted Platform
                </p>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: "1.15",
                  }}
                >
                  Built for serious academic performance
                </h3>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "20px",
                    padding: "22px",
                  }}
                >
                  <div style={{ fontSize: "34px", fontWeight: 900 }}>10K+</div>
                  <div style={{ fontSize: "15px", opacity: 0.95 }}>
                    Clients served
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "20px",
                    padding: "22px",
                  }}
                >
                  <div style={{ fontSize: "34px", fontWeight: 900 }}>95%+</div>
                  <div style={{ fontSize: "15px", opacity: 0.95 }}>
                    Score target
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "20px",
                    padding: "22px",
                  }}
                >
                  <div style={{ fontSize: "26px", fontWeight: 900 }}>
                    AI-Free & Plagiarism-Free
                  </div>
                  <div style={{ fontSize: "15px", opacity: 0.95, marginTop: "6px" }}>
                    Clean work prepared for quality and originality.
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "20px",
                    padding: "22px",
                  }}
                >
                  <div style={{ fontSize: "26px", fontWeight: 900 }}>
                    Fast Turnaround
                  </div>
                  <div style={{ fontSize: "15px", opacity: 0.95, marginTop: "6px" }}>
                    Quick processing for urgent and standard deadlines.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          width: "100%",
          padding: "10px 48px 80px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "22px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "24px",
              boxShadow: "0 12px 34px rgba(15, 23, 42, 0.07)",
              border: "1px solid #eef2f7",
            }}
          >
            <h3
              style={{
                margin: "0 0 12px",
                fontSize: "24px",
                fontWeight: 900,
              }}
            >
              AI-Free & Plagiarism-Free
            </h3>
            <p style={{ margin: 0, color: "#475569", lineHeight: "1.8", fontSize: "17px" }}>
              Work prepared with originality, clarity, and academic quality in mind.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "24px",
              boxShadow: "0 12px 34px rgba(15, 23, 42, 0.07)",
              border: "1px solid #eef2f7",
            }}
          >
            <h3
              style={{
                margin: "0 0 12px",
                fontSize: "24px",
                fontWeight: 900,
              }}
            >
              95%+ Score Focus
            </h3>
            <p style={{ margin: 0, color: "#475569", lineHeight: "1.8", fontSize: "17px" }}>
              Structured support designed to meet high academic standards.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "24px",
              boxShadow: "0 12px 34px rgba(15, 23, 42, 0.07)",
              border: "1px solid #eef2f7",
            }}
          >
            <h3
              style={{
                margin: "0 0 12px",
                fontSize: "24px",
                fontWeight: 900,
              }}
            >
              10,000+ Clients Served
            </h3>
            <p style={{ margin: 0, color: "#475569", lineHeight: "1.8", fontSize: "17px" }}>
              Trusted by a growing client base across multiple academic needs.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}