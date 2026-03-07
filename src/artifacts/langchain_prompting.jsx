import { useState } from "react";
import TopicBlock from "../components/TopicBlock";
import { useProgress } from "../hooks/useProgress";

const roadmap = [
  {
    phase: "01",
    title: "LLM Foundations & the NIM Ecosystem",
    duration: "3–5 days",
    color: "#E8C547",
    icon: "⬟",
    goal: "Understand how LLMs work at the inference level, what NVIDIA NIM provides, and how to make your first API calls with Llama-3.1.",
    topics: [
      {
        id: "lc-01-llm-text-gen",
        name: "How LLMs Generate Text",
        items: [
          "Tokens, vocabulary, and tokenization (tiktoken / HuggingFace tokenizers)",
          "Temperature, top-p, top-k — how sampling shapes output",
          "Context windows, KV-cache, and why prompt length matters",
          "System vs. user vs. assistant roles in chat-tuned models",
        ],
      },
      {
        id: "lc-01-nim",
        name: "NVIDIA NIM",
        items: [
          "NIM as a model inference microservice abstraction",
          "OpenAI-compatible API — calling NIM like you'd call GPT-4",
          "Llama-3.1 model family (8B, 70B, 405B) — capability tradeoffs",
          "Local NIM vs. hosted NIM on build.nvidia.com",
        ],
      },
      {
        id: "lc-01-first-calls",
        name: "First Calls & Tooling",
        items: [
          "Python requests / openai SDK against NIM endpoint",
          "Streaming responses with server-sent events",
          "Rate limits, latency, and cost awareness",
          "Jupyter setup for iterative prompt experimentation",
        ],
      },
    ],
    resources: [
      { label: "Llama-3.1 Model Card — Meta AI", url: "https://ai.meta.com/blog/meta-llama-3-1/" },
      { label: "NVIDIA NIM — Getting Started", url: "https://developer.nvidia.com/nim" },
      { label: "Let's Build GPT — Andrej Karpathy (YouTube)", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY" },
    ],
  },
  {
    phase: "02",
    title: "Prompt Engineering Techniques",
    duration: "1–1.5 weeks",
    color: "#FF6B6B",
    icon: "◈",
    goal: "Build a systematic, iterative prompt engineering practice — from basic instructions to chain-of-thought and few-shot patterns.",
    topics: [
      {
        id: "lc-02-core-prompting",
        name: "Core Prompting Patterns",
        items: [
          "Zero-shot: instruction only, no examples",
          "Few-shot: in-context examples to steer format and style",
          "Chain-of-Thought (CoT): 'think step by step' for reasoning tasks",
          "Self-consistency: sample multiple CoT paths, take majority",
        ],
      },
      {
        id: "lc-02-iterative",
        name: "Iterative Refinement",
        items: [
          "Prompt versioning — treat prompts like code",
          "Failure mode taxonomy: hallucination, refusal, format drift, verbosity",
          "Systematic eval: build a small test set, measure pass rate",
          "Meta-prompting: ask the LLM to improve its own prompt",
        ],
      },
      {
        id: "lc-02-structured-output",
        name: "Structured Output",
        items: [
          "JSON-mode and grammar-constrained decoding",
          "Output schemas with Pydantic + instructor library",
          "XML tags and delimiters to anchor model responses",
          "Asking for confidence / uncertainty in the output",
        ],
      },
    ],
    resources: [
      { label: "Prompt Engineering Guide — DAIR.AI", url: "https://www.promptingguide.ai/" },
      { label: "Chain-of-Thought Prompting (arXiv)", url: "https://arxiv.org/abs/2201.11903" },
      { label: "instructor — Structured Outputs Library", url: "https://python.useinstructor.com/" },
    ],
  },
  {
    phase: "03",
    title: "LangChain for LLM Workflows",
    duration: "1–1.5 weeks",
    color: "#4ADE80",
    icon: "⟁",
    goal: "Use LangChain to compose modular, reusable LLM pipelines — from simple chains to multi-step document workflows.",
    topics: [
      {
        id: "lc-03-abstractions",
        name: "Core LangChain Abstractions",
        items: [
          "LLMs vs. ChatModels — when to use each",
          "PromptTemplates and ChatPromptTemplates",
          "Output parsers: StrOutputParser, PydanticOutputParser",
          "LCEL (LangChain Expression Language) — pipe operator |",
        ],
      },
      {
        id: "lc-03-chains",
        name: "Chains & Pipelines",
        items: [
          "Sequential chains: output of one step → input of next",
          "Parallel chains with RunnableParallel",
          "RunnableLambda for custom Python logic in a chain",
          "Retry and fallback logic with .with_fallbacks()",
        ],
      },
      {
        id: "lc-03-memory",
        name: "Memory & State",
        items: [
          "ConversationBufferMemory vs. ConversationSummaryMemory",
          "Message history with RunnableWithMessageHistory",
          "Windowed context to stay within token limits",
          "Persisting memory to a database (SQLite / Redis)",
        ],
      },
    ],
    resources: [
      { label: "LangChain LCEL Docs", url: "https://python.langchain.com/docs/expression_language/" },
      { label: "LangChain Conceptual Guide", url: "https://python.langchain.com/docs/concepts/" },
      { label: "LangSmith — Tracing & Debugging Chains", url: "https://smith.langchain.com/" },
    ],
  },
  {
    phase: "04",
    title: "Application Patterns: Docs, Chatbots & Generation",
    duration: "1 week",
    color: "#818CF8",
    icon: "◎",
    goal: "Implement the three core LLM application archetypes — document analysis, conversational agents, and controlled text generation.",
    topics: [
      {
        id: "lc-04-doc-analysis",
        name: "Large-Scale Document Analysis",
        items: [
          "Map-reduce summarization for documents exceeding context window",
          "Refine chains: iteratively update a summary per chunk",
          "Extraction chains: pull structured entities from unstructured text",
          "Table and PDF parsing (unstructured, pdfplumber)",
        ],
      },
      {
        id: "lc-04-chatbot",
        name: "Chatbot Applications",
        items: [
          "System prompt design for persona and constraint setting",
          "Slot-filling patterns for structured data collection",
          "Guardrails: topic steering, PII redaction, refusal handling",
          "Evaluation: human-turn replay testing and LLM-as-judge",
        ],
      },
      {
        id: "lc-04-text-gen",
        name: "Controlled Text Generation",
        items: [
          "Persona and tone control via system prompts",
          "Format templates: email, report, code, SQL",
          "Multi-step generation: outline → draft → critique → revise",
          "Factuality checks with self-ask and verification prompts",
        ],
      },
    ],
    resources: [
      { label: "LangChain — Summarization How-To", url: "https://python.langchain.com/docs/tutorials/summarization/" },
      { label: "Guardrails AI — Output Validation", url: "https://www.guardrailsai.com/" },
      { label: "Building LLM Evals — Hamel Husain", url: "https://hamel.dev/blog/posts/evals/" },
    ],
  },
  {
    phase: "05",
    title: "Bridge: RAG & PEFT Foundations",
    duration: "4–5 days",
    color: "#38BDF8",
    icon: "⬡",
    goal: "Connect prompt engineering to the advanced techniques it underpins — so you're ready to go deeper into RAG pipelines and fine-tuning.",
    topics: [
      {
        id: "lc-05-why-not-enough",
        name: "Why Prompt Engineering Isn't Enough",
        items: [
          "Knowledge cutoff and hallucination as core LLM failure modes",
          "When to use RAG vs. fine-tuning vs. better prompting",
          "Latency / cost / accuracy tradeoff triangle",
          "Decision framework: which method fits which use case",
        ],
      },
      {
        id: "lc-05-rag-primer",
        name: "RAG Primer",
        items: [
          "Retrieval-Augmented Generation architecture overview",
          "Embeddings and vector stores (FAISS, ChromaDB)",
          "Naive RAG: embed → retrieve → stuff-into-prompt pattern",
          "Prompt templates for grounded answering (cite-your-source style)",
        ],
      },
      {
        id: "lc-05-peft-primer",
        name: "PEFT Primer",
        items: [
          "What fine-tuning adds over prompting (task-specific priors)",
          "LoRA — low-rank adapter concept, no math required yet",
          "Dataset format for instruction tuning (ShareGPT, Alpaca format)",
          "When NOT to fine-tune: data cost, overfitting risk, maintenance burden",
        ],
      },
    ],
    resources: [
      { label: "RAG Paper — Lewis et al. (arXiv)", url: "https://arxiv.org/abs/2005.11401" },
      { label: "LoRA Paper (arXiv)", url: "https://arxiv.org/abs/2106.09685" },
      { label: "LlamaIndex — RAG Framework Docs", url: "https://docs.llamaindex.ai/" },
    ],
  },
  {
    phase: "06",
    title: "Guided Capstone Project",
    duration: "1.5–2 weeks",
    color: "#FB923C",
    icon: "★",
    goal: "Build an Enterprise Document Intelligence Assistant — a LangChain pipeline that ingests company documents, answers questions, and generates structured reports, all powered by a NIM-hosted Llama-3.1 endpoint.",
    isProject: true,
    milestones: [
      {
        week: "Week 1",
        title: "Core Pipeline",
        tasks: [
          "Set up a NIM-compatible LLM client (or use build.nvidia.com hosted endpoint) with LangChain's ChatOpenAI pointed at the NIM URL",
          "Build an ingestion pipeline: parse 10–20 PDFs/docs with pdfplumber, chunk with RecursiveCharacterTextSplitter, embed with a sentence-transformers model, store in FAISS",
          "Implement a naive RAG chain: PromptTemplate for grounded Q&A → retriever → LLM → StrOutputParser",
          "Add ConversationSummaryMemory so follow-up questions retain context across turns",
          "Run iterative prompt engineering: test 5+ prompt variants, measure answer quality on a 20-question test set",
        ],
      },
      {
        week: "Week 2",
        title: "Advanced Features & Eval",
        tasks: [
          "Add a map-reduce summarization chain for full-document digests when the user asks 'summarize this report'",
          "Build a structured extraction chain: given a contract or policy doc, extract key fields (dates, parties, obligations) into a Pydantic schema",
          "Implement an LLM-as-judge eval loop: a second LLM call scores each answer for faithfulness and relevance",
          "Add a Gradio front-end: file upload → Q&A chat interface → 'Generate Report' button that runs the summarization chain",
          "Stress test with adversarial prompts (jailbreaks, off-topic questions) and add guardrail prompt logic to handle them",
        ],
      },
    ],
    stack: ["LangChain + LCEL", "NVIDIA NIM / Llama-3.1", "FAISS", "sentence-transformers", "pdfplumber", "Pydantic + instructor", "Gradio"],
  },
];

const PhaseCard = ({ phase, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      cursor: "pointer",
      border: `1px solid ${active ? phase.color : "rgba(255,255,255,0.07)"}`,
      borderLeft: `3px solid ${phase.color}`,
      background: active ? `${phase.color}0e` : "rgba(255,255,255,0.015)",
      borderRadius: "5px",
      padding: "13px 16px",
      marginBottom: "8px",
      transition: "all 0.18s ease",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "16px", color: phase.color }}>{phase.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "9px", color: phase.color, fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700 }}>
            PHASE {phase.phase}
          </span>
          {phase.isProject && (
            <span style={{ fontSize: "8px", background: phase.color, color: "#000", padding: "1px 5px", borderRadius: "2px", fontWeight: 800, letterSpacing: "0.08em" }}>
              PROJECT
            </span>
          )}
        </div>
        <div style={{ fontSize: "12px", fontWeight: 600, color: "#eee", marginTop: "2px", lineHeight: 1.3 }}>
          {phase.title}
        </div>
      </div>
      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", fontFamily: "monospace", whiteSpace: "nowrap", flexShrink: 0 }}>
        {phase.duration}
      </span>
    </div>
  </div>
);


export const meta = {
  id: "langchain_prompting",
  title: "Langchain Prompting",
  icon: "⬡",
  description: "Self-learning module about Langchain Prompting, meant to mirror the NVIDIA GTC workshop.",
};

export default function Langchain_Prompting() {
  const [active, setActive] = useState(0);
  const phase = roadmap[active];
  const { progress, toggle } = useProgress();

  return (
    <div style={{ minHeight: "100vh", background: "#0c0c10", fontFamily: "'Inter', -apple-system, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "26px 40px 22px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
            <span style={{ fontSize: "9px", color: "#E8C547", fontFamily: "monospace", letterSpacing: "0.2em", fontWeight: 700 }}>NVIDIA GTC · DLIW82270</span>
            <span style={{ color: "rgba(255,255,255,0.12)" }}>—</span>
            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)", fontFamily: "monospace", letterSpacing: "0.15em" }}>SELF-STUDY ROADMAP</span>
          </div>
          <h1 style={{ fontSize: "clamp(18px, 2.8vw, 26px)", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
            Building LLM Applications with Prompt Engineering
          </h1>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "5px" }}>
            ~6 weeks · Beginner → Intermediate · LangChain · NVIDIA NIM · Llama-3.1
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, maxWidth: "1120px", margin: "0 auto", padding: "28px 40px", display: "grid", gridTemplateColumns: "290px 1fr", gap: "28px", width: "100%" }}>
        {/* Left */}
        <div>
          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em", fontFamily: "monospace", marginBottom: "12px" }}>PHASES</div>
          {roadmap.map((p, i) => <PhaseCard key={i} phase={p} active={active === i} onClick={() => setActive(i)} />)}
          <div style={{ marginTop: "18px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "5px", padding: "14px 16px", background: "rgba(255,255,255,0.015)" }}>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "6px" }}>TOTAL ESTIMATE</div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff" }}>~6 weeks</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", marginTop: "3px" }}>~8–10 hrs/week</div>
          </div>
        </div>

        {/* Right */}
        <div style={{
          background: "rgba(255,255,255,0.018)",
          border: `1px solid ${phase.color}18`,
          borderTop: `2px solid ${phase.color}`,
          borderRadius: "7px",
          padding: "26px 30px",
          overflowY: "auto",
          maxHeight: "78vh",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
            <div>
              <div style={{ fontSize: "9px", color: phase.color, letterSpacing: "0.2em", fontFamily: "monospace", fontWeight: 700 }}>
                PHASE {phase.phase} · {phase.duration}
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", margin: "5px 0 0", letterSpacing: "-0.01em" }}>{phase.title}</h2>
            </div>
            <span style={{ fontSize: "28px", color: phase.color, opacity: 0.5, flexShrink: 0 }}>{phase.icon}</span>
          </div>

          {/* Goal */}
          <div style={{ background: `${phase.color}0d`, border: `1px solid ${phase.color}22`, borderRadius: "5px", padding: "11px 14px", marginBottom: "22px" }}>
            <span style={{ fontSize: "9px", color: phase.color, fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700 }}>GOAL  </span>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.62)", lineHeight: 1.6 }}>{phase.goal}</span>
          </div>

          {!phase.isProject ? (
            <>
              <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.18em", fontFamily: "monospace", marginBottom: "14px" }}>TOPICS</div>
              {phase.topics.map((t, i) => <TopicBlock key={t.id || i} topic={t} color={phase.color} checked={!!progress[t.id]} onToggle={toggle} />)}

              <div style={{ marginTop: "26px", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.18em", fontFamily: "monospace", marginBottom: "10px" }}>RESOURCES</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  {phase.resources.map((r, i) => (
                    <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      color: phase.color, fontSize: "12px", textDecoration: "none",
                      padding: "7px 11px", background: `${phase.color}08`,
                      borderRadius: "4px", border: `1px solid ${phase.color}1a`,
                    }}>
                      <span style={{ fontSize: "9px", opacity: 0.55 }}>↗</span>
                      {r.label}
                    </a>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", marginBottom: "22px" }}>
                {phase.stack.map((s, i) => (
                  <span key={i} style={{
                    fontSize: "10px", padding: "3px 9px",
                    background: `${phase.color}12`, border: `1px solid ${phase.color}28`,
                    color: phase.color, borderRadius: "3px", fontFamily: "monospace", letterSpacing: "0.04em",
                  }}>{s}</span>
                ))}
              </div>
              {phase.milestones.map((m, i) => (
                <div key={i} style={{ marginBottom: "22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "9px", color: phase.color, fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700 }}>{m.week.toUpperCase()}</span>
                    <div style={{ flex: 1, height: "1px", background: `${phase.color}18` }} />
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>{m.title}</span>
                  </div>
                  {m.tasks.map((task, j) => (
                    <div key={j} style={{ display: "flex", gap: "11px", marginBottom: "9px" }}>
                      <span style={{ fontSize: "9px", color: phase.color, fontFamily: "monospace", marginTop: "3px", flexShrink: 0, opacity: 0.65 }}>{String(j + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.68)", lineHeight: 1.65 }}>{task}</span>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
