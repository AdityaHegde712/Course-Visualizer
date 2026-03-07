import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://localhost:8042";

/**
 * Hook that manages topic completion state.
 * Fetches initial progress from the backend on mount,
 * and exposes a toggle function that updates both local state and the backend.
 */
export function useProgress() {
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/progress`)
      .then((res) => res.json())
      .then((data) => {
        setProgress(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Progress API unavailable — running without persistence.", err);
        setLoading(false);
      });
  }, []);

  const toggle = useCallback((topicId) => {
    const newValue = !progress[topicId];
    // Optimistic update
    setProgress((prev) => ({ ...prev, [topicId]: newValue }));
    // Persist to backend
    fetch(`${API_BASE}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic_id: topicId, completed: newValue }),
    }).catch((err) => {
      console.warn("Failed to persist progress:", err);
      // Revert on failure
      setProgress((prev) => ({ ...prev, [topicId]: !newValue }));
    });
  }, [progress]);

  return { progress, toggle, loading };
}
