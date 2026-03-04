import React, { useMemo, useState, Suspense } from "react";
import { artifactEntries } from "./artifactRegistry";
import "./App.css";

export default function App() {
  const [activeId, setActiveId] = useState(null);

  const activeEntry = useMemo(
    () => artifactEntries.find((a) => a.id === activeId) || null,
    [activeId]
  );

  const ActiveComponent = useMemo(() => {
    if (!activeEntry) return null;
    return React.lazy(activeEntry.loader);
  }, [activeEntry]);

  return (
    <div className="app-shell">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-brand">
            <span className="brand-icon">◆</span>
            <h1 className="brand-title">Roadmap</h1>
          </div>
          <p className="header-subtitle">
            Interactive learning modules &amp; course artifacts
          </p>
        </div>
      </header>

      {/* ── Module Cards ── */}
      <section className="artifacts-section">
        <div className="section-label">MODULES</div>
        <div className="artifacts-grid">
          {artifactEntries.map((a) => {
            const isActive = a.id === activeId;
            return (
              <button
                key={a.id}
                className={`artifact-card${isActive ? " artifact-card--active" : ""}`}
                onClick={() => setActiveId(isActive ? null : a.id)}
              >
                <div className="card-header">
                  <span className="card-icon">{a.icon}</span>
                  <span className="card-badge">
                    {isActive ? "ACTIVE" : "VIEW"}
                  </span>
                </div>
                <h3 className="card-title">{a.title}</h3>
                {a.description && (
                  <p className="card-description">{a.description}</p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Artifact Viewer ── */}
      {activeEntry && ActiveComponent && (
        <div className="artifact-viewer" key={activeId}>
          <div className="viewer-bar">
            <div className="viewer-title">
              <span className="viewer-title-icon">{activeEntry.icon}</span>
              {activeEntry.title}
            </div>
            <button
              className="viewer-close"
              onClick={() => setActiveId(null)}
            >
              ✕ Close
            </button>
          </div>
          <div className="viewer-content">
            <Suspense
              fallback={
                <div className="viewer-loading">
                  <div className="loading-spinner" />
                  Loading {activeEntry.title}…
                </div>
              }
            >
              <ActiveComponent />
            </Suspense>
          </div>
        </div>
      )}

      {/* ── Empty State ── */}
      {!activeEntry && (
        <div className="empty-state">
          <div className="empty-icon">◇</div>
          <p>Select a module above to begin</p>
        </div>
      )}
    </div>
  );
}