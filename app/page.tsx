export default function Home() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc", color: "#0f172a" }}>
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "700px" }}>
          <p
            style={{
              display: "inline-block",
              backgroundColor: "#dbeafe",
              color: "#1d4ed8",
              padding: "8px 14px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "20px",
            }}
          >
            Academic Writing & Research Support
          </p>

          <h1
            style={{
              fontSize: "48px",
              lineHeight: "1.1",
              fontWeight: 800,
              marginBottom: "20px",
            }}
          >
            Professional academic help when deadlines are tight.
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "#334155",
              marginBottom: "32px",
            }}
          >
            Get support with essays, reports, case studies, discussion posts,
            editing, proofreading, calculations, and research-based assignments.
            Clear process, deadline-based pricing, and structured delivery.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="/register"
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "14px 22px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Get Started
            </a>

            <a
              href="/login"
              style={{
                border: "1px solid #cbd5e1",
                color: "#0f172a",
                padding: "14px 22px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 600,
                backgroundColor: "#ffffff",
              }}
            >
              Login
            </a>
          </div>
        </div>

        <div
          style={{
            marginTop: "56px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "10px" }}>
              Fast Turnaround
            </h3>
            <p style={{ color: "#475569", lineHeight: "1.6" }}>
              Urgent and standard deadline options with transparent pricing.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "10px" }}>
              Secure Dashboard
            </h3>
            <p style={{ color: "#475569", lineHeight: "1.6" }}>
              Track orders, submissions, updates, and payments in one place.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "10px" }}>
              Research Focused
            </h3>
            <p style={{ color: "#475569", lineHeight: "1.6" }}>
              Support across essays, technical assignments, reports, and revision.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}