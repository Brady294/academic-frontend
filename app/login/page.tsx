"use client";

import { useState } from "react";
import { loginUser } from "../api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      if (data?.accessToken) {
        localStorage.setItem("token", data.accessToken);
      }

      if (data?.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      setSuccess("Login successful.");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 700);
    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-left">
          <a href="/" className="auth-brand">
            EssayMaster
          </a>

          <div className="auth-left-content">
            <div className="auth-badge">Welcome Back</div>

            <h1 className="auth-title">Login to your account</h1>

            <p className="auth-text">
              Access your dashboard, track submissions, and manage your academic
              requests with a faster and cleaner workflow.
            </p>

            <div className="auth-points">
              <span>Secure access</span>
              <span>Fast workflow</span>
              <span>Student dashboard</span>
            </div>
          </div>
        </section>

        <section className="auth-right">
          <div className="auth-card">
            <h2 className="form-title">Login</h2>
            <p className="form-subtitle">Enter your details to continue.</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error ? <p className="message error">{error}</p> : null}
              {success ? <p className="message success">{success}</p> : null}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="switch-text">
              Do not have an account? <a href="/register">Register</a>
            </p>
          </div>
        </section>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .auth-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8fbff 0%, #eef4ff 48%, #ffffff 100%);
          padding: 0;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }

        .auth-shell {
          width: 100%;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
        }

        .auth-left {
          padding: 42px 56px 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .auth-brand {
          display: inline-block;
          text-decoration: none;
          color: #0f172a;
          font-size: 34px;
          font-weight: 900;
          letter-spacing: -0.04em;
          align-self: flex-start;
        }

        .auth-left-content {
          max-width: 680px;
          margin-top: auto;
          margin-bottom: auto;
        }

        .auth-badge {
          display: inline-flex;
          padding: 12px 20px;
          border-radius: 999px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 26px;
        }

        .auth-title {
          font-size: 78px;
          line-height: 0.95;
          font-weight: 900;
          letter-spacing: -0.06em;
          margin: 0 0 24px;
          color: #0f172a;
          max-width: 700px;
        }

        .auth-text {
          font-size: 26px;
          line-height: 1.65;
          color: #334155;
          margin: 0 0 30px;
          max-width: 660px;
        }

        .auth-points {
          display: flex;
          gap: 18px 30px;
          flex-wrap: wrap;
          color: #475569;
          font-size: 18px;
          font-weight: 700;
        }

        .auth-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 42px 42px 42px 20px;
        }

        .auth-card {
          width: 100%;
          max-width: 560px;
          background: #ffffff;
          border: 1px solid #e8eef7;
          border-radius: 32px;
          padding: 38px;
          box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
        }

        .form-title {
          margin: 0 0 8px;
          font-size: 44px;
          font-weight: 900;
          color: #0f172a;
        }

        .form-subtitle {
          margin: 0 0 28px;
          color: #64748b;
          font-size: 18px;
          line-height: 1.6;
        }

        .auth-form {
          display: grid;
          gap: 20px;
        }

        .field {
          display: grid;
          gap: 10px;
        }

        .field label {
          font-size: 15px;
          font-weight: 800;
          color: #334155;
        }

        .field input {
          width: 100%;
          border: 1px solid #dbe3f0;
          border-radius: 16px;
          padding: 16px 18px;
          font-size: 16px;
          color: #0f172a;
          outline: none;
          background: #ffffff;
        }

        .field input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        .submit-btn {
          width: 100%;
          border: none;
          border-radius: 16px;
          padding: 17px 18px;
          background: #2563eb;
          color: #ffffff;
          font-size: 17px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 12px 28px rgba(37, 99, 235, 0.24);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .message {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
        }

        .error {
          color: #dc2626;
        }

        .success {
          color: #16a34a;
        }

        .switch-text {
          margin: 18px 0 0;
          font-size: 15px;
          color: #64748b;
          text-align: center;
        }

        .switch-text a {
          color: #2563eb;
          font-weight: 700;
          text-decoration: none;
        }

        @media (max-width: 1100px) {
          .auth-shell {
            grid-template-columns: 1fr;
          }

          .auth-left {
            padding: 32px 28px 12px;
          }

          .auth-right {
            padding: 8px 28px 32px;
          }

          .auth-left-content {
            margin-top: 24px;
            margin-bottom: 0;
          }

          .auth-title {
            font-size: 54px;
          }

          .auth-text {
            font-size: 20px;
          }
        }

        @media (max-width: 768px) {
          .auth-left {
            padding: 24px 18px 8px;
          }

          .auth-right {
            padding: 8px 18px 24px;
          }

          .auth-brand {
            font-size: 28px;
          }

          .auth-badge {
            font-size: 14px;
            padding: 10px 14px;
            margin-bottom: 18px;
          }

          .auth-title {
            font-size: 42px;
            line-height: 1;
            margin-bottom: 16px;
          }

          .auth-text {
            font-size: 17px;
            line-height: 1.7;
            margin-bottom: 18px;
          }

          .auth-points {
            font-size: 14px;
            gap: 10px 18px;
          }

          .auth-card {
            padding: 24px 18px;
            border-radius: 24px;
          }

          .form-title {
            font-size: 34px;
          }

          .form-subtitle {
            font-size: 15px;
            margin-bottom: 22px;
          }

          .field input {
            padding: 14px 16px;
            font-size: 15px;
          }

          .submit-btn {
            padding: 15px 16px;
            font-size: 15px;
          }
        }

        @media (max-width: 420px) {
          .auth-left {
            padding: 20px 14px 6px;
          }

          .auth-right {
            padding: 8px 14px 20px;
          }

          .auth-brand {
            font-size: 24px;
          }

          .auth-badge {
            font-size: 12px;
            padding: 8px 12px;
          }

          .auth-title {
            font-size: 34px;
          }

          .auth-text {
            font-size: 15px;
          }

          .auth-points {
            font-size: 13px;
          }

          .auth-card {
            padding: 20px 14px;
            border-radius: 20px;
          }

          .form-title {
            font-size: 30px;
          }
        }
      `}</style>
    </main>
  );
}