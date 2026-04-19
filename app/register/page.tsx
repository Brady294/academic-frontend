"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
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
      await registerUser({ name, email, password });
      setSuccess("Registration successful.");

      setTimeout(() => {
        router.push("/login");
      }, 900);
    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <div className="auth-left">
          <a href="/" className="auth-brand">
            EssayMaster
          </a>

          <div className="auth-badge">Create Your Account</div>

          <h1 className="auth-title">Join EssayMaster today</h1>

          <p className="auth-text">
            Register to submit tasks, manage orders, and access your academic dashboard.
          </p>

          <div className="auth-points">
            <span>Quick signup</span>
            <span>Secure access</span>
            <span>Easy tracking</span>
          </div>
        </div>

        <div className="auth-card-wrap">
          <div className="auth-card">
            <h2 className="form-title">Register</h2>
            <p className="form-subtitle">Create your account to get started.</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="field">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error ? <p className="message error">{error}</p> : null}
              {success ? <p className="message success">{success}</p> : null}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>

            <p className="switch-text">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .auth-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8fbff 0%, #eef4ff 48%, #ffffff 100%);
          padding: 32px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-shell {
          width: 100%;
          max-width: 1180px;
          display: grid;
          grid-template-columns: 1fr 520px;
          gap: 36px;
          align-items: center;
        }

        .auth-left {
          padding: 24px 8px;
        }

        .auth-brand {
          display: inline-block;
          text-decoration: none;
          color: #0f172a;
          font-size: 32px;
          font-weight: 900;
          letter-spacing: -0.04em;
          margin-bottom: 26px;
        }

        .auth-badge {
          display: inline-flex;
          padding: 9px 16px;
          border-radius: 999px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 20px;
        }

        .auth-title {
          font-size: 60px;
          line-height: 0.98;
          font-weight: 900;
          letter-spacing: -0.05em;
          margin: 0 0 18px;
          color: #0f172a;
          max-width: 580px;
        }

        .auth-text {
          font-size: 21px;
          line-height: 1.7;
          color: #334155;
          margin: 0 0 22px;
          max-width: 620px;
        }

        .auth-points {
          display: flex;
          gap: 14px 22px;
          flex-wrap: wrap;
          color: #475569;
          font-size: 16px;
          font-weight: 700;
        }

        .auth-card-wrap {
          width: 100%;
        }

        .auth-card {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e8eef7;
          border-radius: 28px;
          padding: 34px;
          box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
        }

        .form-title {
          margin: 0 0 8px;
          font-size: 34px;
          font-weight: 900;
          color: #0f172a;
        }

        .form-subtitle {
          margin: 0 0 24px;
          color: #64748b;
          font-size: 16px;
          line-height: 1.6;
        }

        .auth-form {
          display: grid;
          gap: 18px;
        }

        .field {
          display: grid;
          gap: 8px;
        }

        .field label {
          font-size: 14px;
          font-weight: 700;
          color: #334155;
        }

        .field input {
          width: 100%;
          border: 1px solid #dbe3f0;
          border-radius: 14px;
          padding: 14px 16px;
          font-size: 15px;
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
          border-radius: 14px;
          padding: 15px 18px;
          background: #2563eb;
          color: #ffffff;
          font-size: 15px;
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
          font-weight: 600;
        }

        .error {
          color: #dc2626;
        }

        .success {
          color: #16a34a;
        }

        .switch-text {
          margin: 18px 0 0;
          font-size: 14px;
          color: #64748b;
          text-align: center;
        }

        .switch-text a {
          color: #2563eb;
          font-weight: 700;
          text-decoration: none;
        }

        @media (max-width: 980px) {
          .auth-shell {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .auth-left {
            padding: 8px 4px;
          }

          .auth-title {
            font-size: 44px;
          }

          .auth-text {
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .auth-page {
            padding: 18px 14px;
          }

          .auth-brand {
            font-size: 26px;
            margin-bottom: 18px;
          }

          .auth-badge {
            font-size: 12px;
            padding: 8px 12px;
            margin-bottom: 16px;
          }

          .auth-title {
            font-size: 34px;
            margin-bottom: 14px;
          }

          .auth-text {
            font-size: 15px;
          }

          .auth-points {
            font-size: 13px;
            gap: 10px 14px;
          }

          .auth-card {
            padding: 22px 16px;
            border-radius: 20px;
          }

          .form-title {
            font-size: 28px;
          }
        }
      `}</style>
    </main>
  );
}