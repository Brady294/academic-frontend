"use client";

import { useEffect, useState } from "react";
import { submitAssignment } from "../api";

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [instructions, setInstructions] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await submitAssignment({
        title,
        subject,
        deadline,
        instructions,
        files,
      });

      setMessage("Assignment submitted successfully.");
      setTitle("");
      setSubject("");
      setDeadline("");
      setInstructions("");
      setFiles(null);

      const fileInput = document.getElementById("assignment-files") as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";
    } catch (err: any) {
      setError(err.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="submit-page">
      <div className="submit-shell">
        <header className="submit-header">
          <div>
            <a href="/dashboard" className="brand">
              EssayMaster
            </a>
            <p className="subtext">Submit New Assignment</p>
          </div>

          <a href="/dashboard" className="back-btn">
            Back to Dashboard
          </a>
        </header>

        <section className="submit-card">
          <h1 className="title">Submit New Assignment</h1>
          <p className="subtitle">
            Upload your files and provide all the instructions needed for the assignment.
          </p>

          <form onSubmit={handleSubmit} className="submit-form">
            <div className="field">
              <label>Assignment Title</label>
              <input
                type="text"
                placeholder="Enter assignment title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="two-col">
              <div className="field">
                <label>Subject / Course</label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Deadline</label>
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Instructions</label>
              <textarea
                placeholder="Add all assignment details, rubric notes, formatting rules, and special requirements"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={8}
                required
              />
            </div>

            <div className="field">
              <label>Upload Files</label>
              <input
                id="assignment-files"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.txt,.zip,.rar,.jpg,.jpeg,.png,.webp,.mp4,.mp3"
                onChange={(e) => setFiles(e.target.files)}
              />
              <p className="hint">
                Accepted: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, CSV, TXT, ZIP, RAR, JPG, JPEG, PNG, WEBP, MP4, MP3.
              </p>
            </div>

            {message ? <p className="message success">{message}</p> : null}
            {error ? <p className="message error">{error}</p> : null}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Assignment"}
            </button>
          </form>
        </section>
      </div>

      <style>{`
        * { box-sizing: border-box; }

        .submit-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8fbff 0%, #eef4ff 48%, #ffffff 100%);
          padding: 24px 18px 40px;
        }

        .submit-shell {
          max-width: 1050px;
          margin: 0 auto;
        }

        .submit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 24px;
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

        .back-btn {
          text-decoration: none;
          background: #ffffff;
          color: #0f172a;
          border: 1px solid #dbe3f0;
          padding: 13px 16px;
          border-radius: 14px;
          font-weight: 800;
        }

        .submit-card {
          background: #ffffff;
          border: 1px solid #e8eef7;
          border-radius: 28px;
          padding: 34px;
          box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
        }

        .title {
          margin: 0 0 10px;
          font-size: 42px;
          font-weight: 900;
          color: #0f172a;
        }

        .subtitle {
          margin: 0 0 24px;
          color: #64748b;
          line-height: 1.7;
          font-size: 17px;
        }

        .submit-form {
          display: grid;
          gap: 18px;
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
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

        .field input,
        .field textarea {
          width: 100%;
          border: 1px solid #dbe3f0;
          border-radius: 16px;
          padding: 16px 18px;
          font-size: 16px;
          color: #0f172a;
          outline: none;
          background: #ffffff;
          font-family: inherit;
        }

        .field input:focus,
        .field textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        .hint {
          margin: 0;
          color: #64748b;
          font-size: 13px;
          line-height: 1.6;
        }

        .message {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
        }

        .success {
          color: #16a34a;
        }

        .error {
          color: #dc2626;
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

        @media (max-width: 768px) {
          .submit-page {
            padding: 18px 14px 28px;
          }

          .brand {
            font-size: 28px;
          }

          .submit-card {
            padding: 22px 16px;
            border-radius: 22px;
          }

          .title {
            font-size: 32px;
          }

          .two-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}