import { useState } from "react";

const roadmap = [
  {
    phase: "01",
    title: "Multimodal Data Foundations",
    duration: "1–1.5 weeks",
    color: "#00DC82",
    icon: "◈",
    goal: "Understand different data modalities and how to preprocess them into tensor-ready formats for neural networks.",
    topics: [
      {
        name: "Data Modalities Overview",
        items: ["Images (RGB, grayscale, medical CT/MRI)", "Point clouds & LiDAR (3D depth data)", "Tabular / structured data", "Audio spectrograms as 2D images"],
      },
      {
        name: "Preprocessing Pipelines",
        items: ["torchvision transforms for images", "open3d / numpy for point clouds", "MONAI for medical imaging (CT volumes)", "Normalization, augmentation, batching"],
      },
      {
        name: "Neural Network Readiness",
        items: ["Tensor shapes and channel-first vs channel-last", "DataLoader & custom Dataset classes", "Handling variable-length inputs", "Train/val/test splits for multimodal data"],
      },
    ],
    resources: [
      { label: "PyTorch Datasets & DataLoaders (Docs)", url: "https://pytorch.org/tutorials/beginner/basics/data_tutorial.html" },
      { label: "MONAI — Medical Imaging with PyTorch", url: "https://project-monai.github.io/index.html" },
      { label: "Fast.ai — Practical Deep Learning Ch. 1–4", url: "https://course.fast.ai/" },
    ],
  },
  {
    phase: "02",
    title: "Fusion Architectures",
    duration: "1.5–2 weeks",
    color: "#FF6B35",
    icon: "⬡",
    goal: "Master early, late, and intermediate fusion techniques — the core architecture patterns for multimodal models.",
    topics: [
      {
        name: "Early Fusion",
        items: ["Concatenating raw inputs before any network layer", "When to use: modalities are tightly coupled", "Risk: one modality can dominate training", "Example: stacking RGB + depth channels"],
      },
      {
        name: "Late Fusion",
        items: ["Train separate encoders per modality", "Merge predictions/embeddings at decision layer", "When to use: modalities have very different structures", "Example: image CNN + tabular MLP → combined head"],
      },
      {
        name: "Intermediate Fusion",
        items: ["Cross-attention between modality feature maps", "Transformer-based multimodal fusion (ViLT, CLIP-style)", "Gated fusion units", "Feature Pyramid Networks for scale-aware fusion"],
      },
    ],
    resources: [
      { label: "Multimodal DL Survey (arXiv 2022)", url: "https://arxiv.org/abs/2206.06488" },
      { label: "CLIP Paper — OpenAI", url: "https://arxiv.org/abs/2103.00020" },
      { label: "ViLT — Vision-Language Transformer (arXiv)", url: "https://arxiv.org/abs/2102.03334" },
    ],
  },
  {
    phase: "03",
    title: "Structure Loss & Robustness",
    duration: "1 week",
    color: "#A78BFA",
    icon: "◎",
    goal: "Learn why structural information gets lost in fusion and the techniques to preserve it.",
    topics: [
      {
        name: "What is Structure Loss?",
        items: ["Spatial relationships destroyed by flattening", "Loss of temporal ordering in sequences", "Scale ambiguity in 3D→2D projection", "Modality imbalance during training"],
      },
      {
        name: "Mitigation Techniques",
        items: ["Skip connections (ResNet-style) in fusion layers", "Positional encodings for spatial awareness", "Attention masks to retain locality", "Auxiliary losses per modality (multi-task learning)"],
      },
      {
        name: "Training Stability",
        items: ["Gradient balancing across modalities", "Modality dropout for robustness", "Loss weighting strategies", "Curriculum learning (easy → hard modality combos)"],
      },
    ],
    resources: [
      { label: "Geometric Deep Learning (Bronstein et al.)", url: "https://geometricdeeplearning.com/" },
      { label: "Multi-Task Learning Overview — Sebastian Ruder", url: "https://ruder.io/multi-task/" },
      { label: "Attention Is All You Need (arXiv)", url: "https://arxiv.org/abs/1706.03762" },
    ],
  },
  {
    phase: "04",
    title: "Agentic Systems & Orchestration",
    duration: "1.5 weeks",
    color: "#38BDF8",
    icon: "⟁",
    goal: "Distinguish between modality processing and agent orchestration — build a perception-to-action pipeline.",
    topics: [
      {
        name: "Modality vs. Agent Orchestration",
        items: ["Modality: how data is processed (vision, language, depth)", "Agent: how decisions are made and actions executed", "Tool-calling LLMs as orchestrators", "Multimodal models as perception modules"],
      },
      {
        name: "Agentic Frameworks",
        items: ["LangGraph — stateful agent graphs", "LlamaIndex — RAG + agentic pipelines", "AutoGen — multi-agent conversations", "ReAct pattern: Reason + Act loops"],
      },
      {
        name: "NVIDIA NIM & AI Blueprints",
        items: ["NIM microservices for model inference", "Visual AI Agents with VSS (Video Search & Summarization)", "NVIDIA AI Blueprints architecture", "Deploying multimodal endpoints at scale"],
      },
    ],
    resources: [
      { label: "LangGraph Docs — Stateful Agents", url: "https://langchain-ai.github.io/langgraph/" },
      { label: "NVIDIA NIM Overview", url: "https://developer.nvidia.com/nim" },
      { label: "ReAct: Synergizing Reasoning and Acting (arXiv)", url: "https://arxiv.org/abs/2210.03629" },
    ],
  },
  {
    phase: "05",
    title: "Guided Capstone Project",
    duration: "2 weeks",
    color: "#FACC15",
    icon: "★",
    goal: "Build a Multimodal Medical Triage Agent that fuses CT scan slices + patient metadata to detect anomalies and orchestrate a reporting agent.",
    isProject: true,
    milestones: [
      {
        week: "Week 1",
        title: "Multimodal Model",
        tasks: [
          "Download a public CT dataset (e.g. LUNA16 or COVID-CT from Kaggle)",
          "Build a 2-branch model: 3D CNN for CT slices + MLP for patient metadata (age, sex, history)",
          "Implement intermediate fusion via cross-attention between CNN feature maps and MLP embeddings",
          "Train with auxiliary modality losses + main classification loss (benign / malignant / uncertain)",
          "Evaluate: AUC-ROC, confusion matrix, per-modality ablation (what happens if CT branch is dropped?)",
        ],
      },
      {
        week: "Week 2",
        title: "Agentic Pipeline",
        tasks: [
          "Wrap the trained model as a NIM-style inference microservice (FastAPI endpoint)",
          "Build a LangGraph orchestrator with 3 nodes: Perception (calls model API), Reasoning (LLM interprets result), Reporting (generates structured PDF/JSON report)",
          "Add a retrieval node: if uncertainty is high, retrieve similar cases from a vector store (FAISS)",
          "Implement modality dropout robustness: agent should handle missing CT or missing metadata gracefully",
          "Demo: end-to-end pipeline from raw DICOM upload → triage report",
        ],
      },
    ],
    stack: ["PyTorch + MONAI", "FastAPI", "LangGraph", "FAISS / ChromaDB", "Gradio (demo UI)"],
  },
];

const PhaseCard = ({ phase, active, onClick }) => {
  const isProject = phase.isProject;
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: `1px solid ${active ? phase.color : "rgba(255,255,255,0.08)"}`,
        borderLeft: `3px solid ${phase.color}`,
        background: active
          ? `linear-gradient(135deg, ${phase.color}12 0%, transparent 70%)`
          : "rgba(255,255,255,0.02)",
        borderRadius: "6px",
        padding: "16px 20px",
        marginBottom: "10px",
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "20px", color: phase.color, fontFamily: "monospace" }}>{phase.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontSize: "10px", color: phase.color, fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", fontWeight: 700 }}>
              PHASE {phase.phase}
            </span>
            {isProject && (
              <span style={{ fontSize: "9px", background: phase.color, color: "#000", padding: "1px 6px", borderRadius: "2px", fontWeight: 700, letterSpacing: "0.1em" }}>
                PROJECT
              </span>
            )}
          </div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#f0f0f0", marginTop: "2px", fontFamily: "'Playfair Display', Georgia, serif" }}>
            {phase.title}
          </div>
        </div>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "'Courier New', monospace", whiteSpace: "nowrap" }}>
          {phase.duration}
        </span>
      </div>
    </div>
  );
};

const TopicBlock = ({ topic, color }) => (
  <div style={{ marginBottom: "20px" }}>
    <div style={{ fontSize: "11px", color: color, fontFamily: "'Courier New', monospace", letterSpacing: "0.12em", fontWeight: 700, marginBottom: "10px" }}>
      ▸ {topic.name.toUpperCase()}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {topic.items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "1px", flexShrink: 0 }}>·</span>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item}</span>
        </div>
      ))}
    </div>
  </div>
);

export const meta = {
  id: "multimodal_models",
  title: "Multi-modal Models",
  icon: "⬡",
  description: "Self-learning module about multi-modal models, meant to mirror the NVIDIA GTC workshop.",
};

export default function MultimodalCourseRoadmap() {
  const [active, setActive] = useState(0);
  const phase = roadmap[active];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'Inter', -apple-system, sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "28px 40px 24px",
        background: "linear-gradient(180deg, rgba(10,10,20,1) 0%, transparent 100%)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{ fontSize: "10px", color: "#00DC82", fontFamily: "'Courier New', monospace", letterSpacing: "0.2em", fontWeight: 700 }}>
              NVIDIA GTC · DLIW82269
            </span>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "10px" }}>—</span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em" }}>
              SELF-STUDY ROADMAP
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "'Playfair Display', Georgia, serif",
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            Building AI Agents with Multimodal Models
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "6px" }}>
            ~8–9 weeks · Beginner–Intermediate · PyTorch · LangGraph · NVIDIA NIM
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, maxWidth: "1100px", margin: "0 auto", padding: "32px 40px", display: "grid", gridTemplateColumns: "300px 1fr", gap: "32px", width: "100%" }}>
        {/* Left: Phase list */}
        <div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.18em", fontFamily: "'Courier New', monospace", marginBottom: "14px" }}>
            PHASES
          </div>
          {roadmap.map((p, i) => (
            <PhaseCard key={i} phase={p} active={active === i} onClick={() => setActive(i)} />
          ))}

          {/* Total estimate */}
          <div style={{
            marginTop: "20px",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "6px",
            padding: "14px 16px",
            background: "rgba(255,255,255,0.02)",
          }}>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", fontFamily: "'Courier New', monospace", marginBottom: "8px" }}>
              TOTAL ESTIMATE
            </div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display', serif" }}>8–9 wks</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>~10–12 hrs/week</div>
          </div>
        </div>

        {/* Right: Detail */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${phase.color}20`,
          borderTop: `2px solid ${phase.color}`,
          borderRadius: "8px",
          padding: "28px 32px",
          overflowY: "auto",
          maxHeight: "75vh",
        }}>
          {/* Phase header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
            <div>
              <div style={{ fontSize: "10px", color: phase.color, letterSpacing: "0.2em", fontFamily: "'Courier New', monospace", fontWeight: 700 }}>
                PHASE {phase.phase} · {phase.duration}
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display', serif", margin: "6px 0 0", letterSpacing: "-0.01em" }}>
                {phase.title}
              </h2>
            </div>
            <span style={{ fontSize: "32px", color: phase.color, opacity: 0.6 }}>{phase.icon}</span>
          </div>

          {/* Goal */}
          <div style={{
            background: `${phase.color}10`,
            border: `1px solid ${phase.color}25`,
            borderRadius: "6px",
            padding: "12px 16px",
            marginBottom: "24px",
          }}>
            <span style={{ fontSize: "10px", color: phase.color, fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", fontWeight: 700 }}>GOAL  </span>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{phase.goal}</span>
          </div>

          {/* Topics or Project milestones */}
          {!phase.isProject ? (
            <>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.18em", fontFamily: "'Courier New', monospace", marginBottom: "16px" }}>
                TOPICS
              </div>
              {phase.topics.map((t, i) => <TopicBlock key={i} topic={t} color={phase.color} />)}

              {/* Resources */}
              <div style={{ marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.18em", fontFamily: "'Courier New', monospace", marginBottom: "12px" }}>
                  RESOURCES
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {phase.resources.map((r, i) => (
                    <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: phase.color,
                      fontSize: "13px",
                      textDecoration: "none",
                      padding: "8px 12px",
                      background: `${phase.color}08`,
                      borderRadius: "4px",
                      border: `1px solid ${phase.color}20`,
                      transition: "background 0.15s",
                    }}>
                      <span style={{ fontSize: "10px", opacity: 0.6 }}>↗</span>
                      {r.label}
                    </a>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Project view */
            <>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
                {phase.stack.map((s, i) => (
                  <span key={i} style={{
                    fontSize: "11px",
                    padding: "4px 10px",
                    background: `${phase.color}15`,
                    border: `1px solid ${phase.color}30`,
                    color: phase.color,
                    borderRadius: "3px",
                    fontFamily: "'Courier New', monospace",
                    letterSpacing: "0.05em",
                  }}>{s}</span>
                ))}
              </div>

              {phase.milestones.map((m, i) => (
                <div key={i} style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                    <span style={{ fontSize: "10px", color: phase.color, fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", fontWeight: 700 }}>
                      {m.week.toUpperCase()}
                    </span>
                    <div style={{ flex: 1, height: "1px", background: `${phase.color}20` }} />
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{m.title}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {m.tasks.map((task, j) => (
                      <div key={j} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <span style={{
                          fontSize: "10px",
                          color: phase.color,
                          fontFamily: "'Courier New', monospace",
                          marginTop: "3px",
                          flexShrink: 0,
                          opacity: 0.7,
                        }}>{String(j + 1).padStart(2, "0")}</span>
                        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
