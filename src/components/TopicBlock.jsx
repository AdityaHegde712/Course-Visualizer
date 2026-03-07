/**
 * Shared TopicBlock component with an optional completion checkbox.
 *
 * Props:
 *   topic    — { id, name, items: string[] }
 *   color    — hex accent color for the current phase
 *   checked  — boolean, whether this topic is completed (optional)
 *   onToggle — callback when checkbox is clicked (optional)
 */
const TopicBlock = ({ topic, color, checked, onToggle }) => (
  <div style={{ marginBottom: "22px" }}>
    {/* Topic header with optional checkbox */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      {/* Checkbox — only rendered when topic has an id and onToggle is provided */}
      {topic.id && onToggle && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(topic.id);
          }}
          aria-label={`Mark "${topic.name}" as ${checked ? "incomplete" : "complete"}`}
          style={{
            width: "16px",
            height: "16px",
            minWidth: "16px",
            borderRadius: "3px",
            border: `1.5px solid ${checked ? color : "rgba(255,255,255,0.25)"}`,
            background: checked ? `${color}30` : "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            transition: "all 0.2s ease",
            boxShadow: checked ? `0 0 8px ${color}40` : "none",
            flexShrink: 0,
          }}
        >
          {checked && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              style={{ display: "block" }}
            >
              <path
                d="M2 5.5L4 7.5L8 3"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      )}

      <div
        style={{
          fontSize: "11px",
          color: color,
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.12em",
          fontWeight: 700,
          opacity: checked ? 0.5 : 1,
          textDecoration: checked ? "line-through" : "none",
          transition: "opacity 0.2s ease",
        }}
      >
        ▸ {topic.name.toUpperCase()}
      </div>
    </div>

    {/* Sub-items */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "7px",
        paddingLeft: topic.id && onToggle ? "26px" : "0",
      }}
    >
      {topic.items.map((item, i) => (
        <div
          key={i}
          style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "12px",
              marginTop: "2px",
              flexShrink: 0,
            }}
          >
            ·
          </span>
          <span
            style={{
              fontSize: "13px",
              color: checked
                ? "rgba(255,255,255,0.35)"
                : "rgba(255,255,255,0.72)",
              lineHeight: 1.65,
              transition: "color 0.2s ease",
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default TopicBlock;
