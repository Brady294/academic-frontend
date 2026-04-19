export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fbff 0%, #eef4ff 45%, #ffffff 100%)",
        color: "#0f172a",
      }}
    >
      <nav
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "24px 24px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#0f172a",
          }}
        >
          EssayMaster
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <a
            href="/login"
            style={{
              textDecoration: "none",
              color: "#0f172a",
              fontWeight: 600,
              padding: "10px 16px",
              borderRadius: "10px",
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
              fontWeight: 700,
              padding: "12px 18px",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(37, 99, 235, 0.25)",
            }}
          >
            Get Started
          </a>
        </div>
      </nav>

      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "70px 24px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "#dbeafe",
              color: "#1d4ed8",
              fontSize: "14px",
              fontWeight: 700,
              marginBottom: "22px",
            }}
          >
            Premium Academic Platform
          </div>

          <h1
            style={{
              fontSize: "64px",
              lineHeight: "1",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              margin: "0 0 20px",
              maxWidth: "620px",
            }}
          >
            EssayMaster
          </h1>

          <p
            style={{
              fontSize: "22px",
              lineHeight: "1.6",
              color: "#334155",
              margin: "0 0 28px",
              maxWidth: "560px",
            }}
          >
            Clean academic support with a faster workflow, a smarter dashboard,
            and a polished experience from start to finish.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a
              href="/register"
              style={{
                textDecoration: "none",
                background: "#2563eb",
                color: "#ffffff",
                padding: "15px 24px",
                borderRadius: "14px",
                fontWeight: 700,
                boxShadow: "0 12px 30px rgba(37, 99, 235, 0.28)",
              }}
            >
              Start Now
            </a>

            <a
              href="/login"
              style={{
                textDecoration: "none",
                background: "#ffffff",
                color: "#0f172a",
                padding: "15px 24px",
                borderRadius: "14px",
                fontWeight: 700,
                border: "1px solid #dbe3f0",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
              }}
            >
              Login
            </a>
          </div>

          <div
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
              marginTop: "28px",
              color: "#475569",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            <span>Fast submissions</span>
            <span>Secure dashboard</span>
            <span>Simple workflow</span>
          </div>
        </div>

        <div>
          <div
            style={{
              background:
                "linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #60a5fa 100%)",
              borderRadius: "28px",
              padding: "30px",
              color: "#ffffff",
              boxShadow: "0 30px 60px rgba(15, 23, 42, 0.22)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "180px",
                height: "180px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.12)",
                top: "-40px",
                right: "-30px",
              }}
            />

            <div
              style={{
                position: "absolute",
                width: "120px",
                height: "120px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                bottom: "-20px",
                left: "-20px",
              }}
            />

            <div style={{ position: "relative", zIndex: 2 }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "18px",
                  padding: "18px",
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
                  Active Platform
                </p>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "28px",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Built for speed and clarity
                </h3>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "18px",
                    padding: "18px",
                  }}
                >
                  <div style={{ fontSize: "28px", fontWeight: 800 }}>24/7</div>
                  <div style={{ fontSize: "14px", opacity: 0.9 }}>
                    Access anytime
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "18px",
                    padding: "18px",
                  }}
                >
                  <div style={{ fontSize: "28px", fontWeight: 800 }}>Easy</div>
                  <div style={{ fontSize: "14px", opacity: 0.9 }}>
                    Smooth workflow
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "18px",
                    padding: "18px",
                  }}
                >
                  <div style={{ fontSize: "28px", fontWeight: 800 }}>Safe</div>
                  <div style={{ fontSize: "14px", opacity: 0.9 }}>
                    Secure account area
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "18px",
                    padding: "18px",
                  }}
                >
                  <div style={{ fontSize: "28px", fontWeight: 800 }}>Fast</div>
                  <div style={{ fontSize: "14px", opacity: 0.9 }}>
                    Quick submission flow
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "30px 24px 90px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "22px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "28px",
              borderRadius: "22px",
              boxShadow: "0 12px 34px rgba(15, 23, 42, 0.07)",
              border: "1px solid #eef2f7",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: "22px",
                fontWeight: 800,
              }}
            >
              Premium Look
            </h3>
            <p style={{ margin: 0, color: "#475569", lineHeight: "1.7" }}>
              A cleaner interface that feels modern and professional.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "28px",
              borderRadius: "22px",
              boxShadow: "0 12px 34px rgba(15, 23, 42, 0.07)",
              border: "1px solid #eef2f7",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: "22px",
                fontWeight: 800,
              }}
            >
              Better Access
            </h3>
            <p style={{ margin: 0, color: "#475569", lineHeight: "1.7" }}>
              Direct entry into login, registration, and future dashboard tools.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "28px",
              borderRadius: "22px",
              boxShadow: "0 12px 34px rgba(15, 23, 42, 0.07)",
              border: "1px solid #eef2f7",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: "22px",
                fontWeight: 800,
              }}
            >
              Scalable Base
            </h3>
            <p style={{ margin: 0, color: "#475569", lineHeight: "1.7" }}>
              Ready for pricing, orders, uploads, payments, and admin features.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}