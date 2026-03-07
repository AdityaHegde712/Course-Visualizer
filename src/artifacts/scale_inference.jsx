import { useState } from "react";

const roadmap = [
  {
    phase: "01",
    title: "Laws of LLM Inference",
    duration: "4–5 days",
    color: "#22D3EE",
    icon: "⬟",
    goal: "Build a first-principles mental model of where inference time and memory go — prefill vs. decode, KV-cache mechanics, and the memory-bandwidth wall.",
    topics: [
      {
        name: "Autoregressive Decoding",
        items: [
          "Why LLMs generate one token at a time (causal attention mask)",
          "Prefill phase: full prompt processed in parallel → KV-cache populated",
          "Decode phase: one token per forward pass, memory-bound not compute-bound",
          "TTFT (Time To First Token) vs. TPOT (Time Per Output Token) as distinct latency targets",
        ],
      },
      {
        name: "KV-Cache Deep Dive",
        items: [
          "What gets cached: key/value projections per layer per token",
          "KV-cache memory formula: 2 × layers × heads × head_dim × seq_len × bytes",
          "PagedAttention: virtual memory paging for KV-cache (vLLM's core innovation)",
          "KV-cache eviction policies and prefix caching for shared prompt prefixes",
        ],
      },
      {
        name: "Memory & Compute Rooflines",
        items: [
          "Arithmetic intensity: FLOP/byte ratio that determines if you're compute- or bandwidth-bound",
          "Why decoding is memory-bandwidth bound (low arithmetic intensity)",
          "GPU memory hierarchy: HBM → L2 → SRAM and transfer costs",
          "Batch size as the lever: larger batches push decode toward compute-bound territory",
        ],
      },
    ],
    resources: [
      { label: "Dissecting Batching in LLM Inference — Cursor Blog", url: "https://www.cursor.com/blog/llm-inference" },
      { label: "FlashAttention Paper (arXiv)", url: "https://arxiv.org/abs/2205.14135" },
      { label: "vLLM PagedAttention Paper (arXiv)", url: "https://arxiv.org/abs/2309.06180" },
      { label: "LLM Inference Performance Engineering — Databricks Blog", url: "https://www.databricks.com/blog/llm-inference-performance-engineering-best-practices" },
    ],
  },
  {
    phase: "02",
    title: "Batching Strategies & Scheduling",
    duration: "4–5 days",
    color: "#A78BFA",
    icon: "◈",
    goal: "Understand how request scheduling and batching strategies govern throughput and tail latency under contention.",
    topics: [
      {
        name: "Batching Strategies",
        items: [
          "Static batching: pad all sequences to max length, simple but wasteful",
          "Dynamic batching: group requests arriving within a time window",
          "Continuous batching (iteration-level scheduling): insert new requests mid-generation",
          "Why continuous batching is the default in modern engines (vLLM, TGI)",
        ],
      },
      {
        name: "Scheduling Under Contention",
        items: [
          "Head-of-line blocking: one long request stalls short ones",
          "Preemption: swap out lower-priority KV-cache pages to disk/CPU",
          "Priority queues and SLA-aware scheduling",
          "Chunked prefill: break long prompts into chunks to interleave with decodes",
        ],
      },
      {
        name: "Throughput vs. Latency Trade-offs",
        items: [
          "Throughput (tokens/sec) vs. latency (P50/P99 TTFT, TPOT)",
          "Goodput: throughput that actually meets SLA targets",
          "Load testing methodology: sweep batch sizes, measure roofline",
          "Token budget enforcement for cost control",
        ],
      },
    ],
    resources: [
      { label: "Orca: Continuous Batching Paper (OSDI '22)", url: "https://www.usenix.org/conference/osdi22/presentation/yu" },
      { label: "vLLM Blog — PagedAttention & Continuous Batching", url: "https://blog.vllm.ai/2023/06/20/vllm.html" },
      { label: "Chunked Prefill (arXiv)", url: "https://arxiv.org/abs/2403.02310" },
    ],
  },
  {
    phase: "03",
    title: "vLLM on Kubernetes",
    duration: "1–1.5 weeks",
    color: "#4ADE80",
    icon: "⟁",
    goal: "Deploy vLLM as a monolithic serving endpoint on Kubernetes, then evolve to a gateway-based multi-replica setup — all on free-tier infrastructure.",
    freeNote: "Use Minikube or k3s locally, or Google Kubernetes Engine (GKE) free tier / Civo free $250 credit. For GPU access, use a Kaggle or Google Colab T4 for model testing; run vLLM with a small model (Phi-3-mini, Qwen2-0.5B) to stay within free memory limits.",
    topics: [
      {
        name: "Monolithic vLLM Deployment",
        items: [
          "vLLM OpenAI-compatible server: docker run flags, tensor-parallel-size, gpu-memory-utilization",
          "Kubernetes Deployment + Service manifest for vLLM pod",
          "Resource requests/limits: nvidia.com/gpu, memory, CPU",
          "Health checks: /health liveness probe, /metrics Prometheus endpoint",
        ],
      },
      {
        name: "Gateway-Based Architecture",
        items: [
          "Why a gateway: load balancing, auth, rate limiting, routing",
          "NGINX / Envoy as L7 gateway in front of vLLM replicas",
          "Horizontal scaling: multiple vLLM pods behind a Service",
          "Session affinity vs. stateless routing for KV-cache hit rate",
        ],
      },
      {
        name: "Kubernetes Fundamentals for Inference",
        items: [
          "ConfigMaps and Secrets for model config and API keys",
          "PersistentVolumeClaims for model weight storage",
          "Node selectors and tolerations for GPU node pools",
          "HorizontalPodAutoscaler on custom metrics (queue depth)",
        ],
      },
    ],
    resources: [
      { label: "vLLM Docs — Production Deployment", url: "https://docs.vllm.ai/en/latest/serving/deploying_with_k8s.html" },
      { label: "Minikube — Local Kubernetes", url: "https://minikube.sigs.k8s.io/docs/start/" },
      { label: "k3s — Lightweight Kubernetes", url: "https://k3s.io/" },
      { label: "Civo Cloud — Free $250 Kubernetes Credit", url: "https://www.civo.com/" },
    ],
  },
  {
    phase: "04",
    title: "Disaggregated Inference & NVIDIA Dynamo",
    duration: "1–1.5 weeks",
    color: "#FB923C",
    icon: "◎",
    goal: "Understand prefill/decode disaggregation as an architectural primitive, then map those concepts onto NVIDIA Dynamo's KV-aware routing and scheduling model.",
    freeNote: "Dynamo itself requires NVIDIA hardware. Study the architecture from the open-source repo and paper. Practice the disaggregation concepts with vLLM's experimental disaggregated prefill feature on a free Colab/Kaggle GPU, which implements the same principles.",
    topics: [
      {
        name: "Prefill–Decode Disaggregation",
        items: [
          "Why co-locating prefill and decode wastes GPU utilization",
          "Prefill workers: compute-bound, need high FLOP/s GPUs",
          "Decode workers: memory-bandwidth bound, need high HBM bandwidth",
          "KV-cache transfer: moving populated cache from prefill → decode worker",
        ],
      },
      {
        name: "KV-Aware Routing",
        items: [
          "Routing requests to the decode worker that already holds the KV prefix",
          "Prefix hashing for cache hit detection",
          "Load-aware vs. cache-aware routing trade-off",
          "Implications for multi-turn conversations and shared system prompts",
        ],
      },
      {
        name: "NVIDIA Dynamo Architecture",
        items: [
          "Dynamo as a disaggregated inference framework built on vLLM",
          "Planner, Router, Prefill workers, Decode workers — component roles",
          "Built-in KV-cache transfer via NIXL (NVIDIA Inference Xfer Library)",
          "Dynamo open-source repo structure and configuration YAML schema",
        ],
      },
    ],
    resources: [
      { label: "NVIDIA Dynamo GitHub (Open Source)", url: "https://github.com/ai-dynamo/dynamo" },
      { label: "Dynamo Blog — NVIDIA Developer", url: "https://developer.nvidia.com/blog/disaggregated-serving-with-nvidia-dynamo/" },
      { label: "DistServe — Disaggregation Paper (arXiv)", url: "https://arxiv.org/abs/2401.09670" },
      { label: "vLLM Disaggregated Prefill RFC", url: "https://github.com/vllm-project/vllm/issues/3713" },
    ],
  },
  {
    phase: "05",
    title: "Observability Stack: Prometheus, Grafana, Loki, Tempo",
    duration: "1 week",
    color: "#F472B6",
    icon: "⬡",
    goal: "Deploy a full inference observability stack. Instrument vLLM metrics, capture structured logs, and trace requests end-to-end — all runnable locally for free.",
    freeNote: "The entire stack (Prometheus, Grafana, Loki, Tempo) is fully open-source and free. Deploy locally via Docker Compose or the kube-prometheus-stack Helm chart on Minikube. Grafana Cloud also has a generous free tier if you want hosted dashboards.",
    topics: [
      {
        name: "Metrics with Prometheus & Grafana",
        items: [
          "vLLM's built-in /metrics endpoint: token throughput, queue depth, KV-cache usage",
          "Prometheus scrape config targeting vLLM pods",
          "Key inference dashboards: TTFT histogram, TPOT P99, GPU memory utilization",
          "Alerting rules: queue depth spike, KV-cache near-full, OOM risk",
        ],
      },
      {
        name: "Structured Logging with Loki",
        items: [
          "Structured JSON logs from vLLM: request_id, prompt_tokens, completion_tokens, latency",
          "Promtail as a log shipper from Kubernetes pods to Loki",
          "LogQL queries: filter by model, aggregate token counts per user",
          "Cost attribution: tokens × $/token from log data",
        ],
      },
      {
        name: "Distributed Tracing with Tempo",
        items: [
          "OpenTelemetry instrumentation in a LangChain / FastAPI gateway",
          "Trace context propagation: gateway → vLLM → response",
          "Tempo as the trace backend, queried via Grafana's Explore",
          "Correlating traces with logs and metrics in a single Grafana panel",
        ],
      },
    ],
    resources: [
      { label: "kube-prometheus-stack Helm Chart", url: "https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack" },
      { label: "Grafana + Loki + Tempo — Local Docker Compose", url: "https://github.com/grafana/tempo/tree/main/example/docker-compose" },
      { label: "OpenTelemetry Python SDK Docs", url: "https://opentelemetry-python.readthedocs.io/" },
      { label: "vLLM Metrics Documentation", url: "https://docs.vllm.ai/en/latest/serving/metrics.html" },
    ],
  },
  {
    phase: "06",
    title: "Guided Capstone Project",
    duration: "2 weeks",
    color: "#FACC15",
    icon: "★",
    goal: "Deploy a production-grade, observable LLM inference system on local Kubernetes: monolithic → gateway → disaggregated, with a full observability stack and a cost-attribution dashboard.",
    isProject: true,
    milestones: [
      {
        week: "Week 1",
        title: "Deploy & Scale",
        tasks: [
          "Spin up Minikube or k3s with GPU passthrough (or use a free Civo/GKE trial). Deploy vLLM serving Phi-3-mini or Qwen2-1.5B as a monolithic Kubernetes Deployment.",
          "Write a locust.io load test: ramp from 1 → 50 concurrent users, record TTFT and TPOT at each step. Plot your first throughput–latency curve.",
          "Add an NGINX gateway in front of two vLLM replicas. Implement round-robin vs. least-connections routing and measure KV-cache hit rate difference.",
          "Implement chunked prefill via vLLM's --enable-chunked-prefill flag. Compare P99 TTFT on long-prompt workloads before and after.",
          "Simulate prefill/decode disaggregation: run two separate vLLM processes (prefill-only and decode-only modes) and manually route between them with a FastAPI proxy.",
        ],
      },
      {
        week: "Week 2",
        title: "Observability & Cost",
        tasks: [
          "Deploy the full observability stack via Docker Compose: Prometheus scraping vLLM /metrics, Grafana with a custom inference dashboard (TTFT P50/P99, tokens/sec, KV-cache %).",
          "Add Loki + Promtail: emit structured JSON logs from vLLM with request_id, user_id, prompt_tokens, completion_tokens. Write a LogQL query that aggregates daily token spend per user.",
          "Instrument your FastAPI gateway with OpenTelemetry. Send traces to Tempo. Build a Grafana panel that correlates a slow trace with its Loki log entry and Prometheus metric spike.",
          "Build a cost-attribution dashboard: tokens × configurable $/1K rate → per-user cost over time. Add a Prometheus alert when any user exceeds a daily token budget.",
          "Write a post-mortem doc: for each architectural decision (monolithic → gateway → disaggregated), quantify the latency and throughput delta from your load tests.",
        ],
      },
    ],
    stack: ["vLLM", "Kubernetes (Minikube / k3s)", "NGINX", "Prometheus", "Grafana", "Loki + Promtail", "Tempo", "OpenTelemetry", "Locust", "FastAPI"],
  },
];

const PhaseCard = ({ phase, active, onClick }) => (
  <div onClick={onClick} style={{
    cursor: "pointer",
    border: `1px solid ${active ? phase.color : "rgba(255,255,255,0.07)"}`,
    borderLeft: `3px solid ${phase.color}`,
    background: active ? `${phase.color}0d` : "rgba(255,255,255,0.015)",
    borderRadius: "5px", padding: "12px 15px", marginBottom: "7px", transition: "all 0.18s ease",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "15px", color: phase.color }}>{phase.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "9px", color: phase.color, fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700 }}>PHASE {phase.phase}</span>
          {phase.isProject && <span style={{ fontSize: "8px", background: phase.color, color: "#000", padding: "1px 5px", borderRadius: "2px", fontWeight: 800 }}>PROJECT</span>}
        </div>
        <div style={{ fontSize: "12px", fontWeight: 600, color: "#eee", marginTop: "2px", lineHeight: 1.3 }}>{phase.title}</div>
      </div>
      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", fontFamily: "monospace", whiteSpace: "nowrap", flexShrink: 0 }}>{phase.duration}</span>
    </div>
  </div>
);

export const meta = {
  id: "scale_inference",
  title: "Scale Inference",
  icon: "⬡",
  description: "Self-learning module about AI Inference at Scale, meant to mirror the NVIDIA GTC workshop.",
};

export default function ScaleInference() {
  const [active, setActive] = useState(0);
  const phase = roadmap[active];

  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0f", fontFamily: "'Inter', -apple-system, sans-serif", display: "flex", flexDirection: "column" }}>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "24px 36px 20px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "5px" }}>
            <span style={{ fontSize: "9px", color: "#22D3EE", fontFamily: "monospace", letterSpacing: "0.2em", fontWeight: 700 }}>NVIDIA GTC · DLIW82274</span>
            <span style={{ color: "rgba(255,255,255,0.1)" }}>—</span>
            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", fontFamily: "monospace", letterSpacing: "0.15em" }}>SELF-STUDY ROADMAP</span>
          </div>
          <h1 style={{ fontSize: "clamp(17px, 2.6vw, 25px)", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
            Deploying and Optimizing AI Inference at Scale
          </h1>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.32)", marginTop: "5px" }}>
            ~7–8 weeks · Advanced · vLLM · NVIDIA Dynamo · Kubernetes · Full Observability Stack
          </p>
        </div>
      </div>

      <div style={{ flex: 1, maxWidth: "1120px", margin: "0 auto", padding: "26px 36px", display: "grid", gridTemplateColumns: "285px 1fr", gap: "26px", width: "100%" }}>
        <div>
          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em", fontFamily: "monospace", marginBottom: "11px" }}>PHASES</div>
          {roadmap.map((p, i) => <PhaseCard key={i} phase={p} active={active === i} onClick={() => setActive(i)} />)}
          <div style={{ marginTop: "16px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "5px", padding: "13px 15px", background: "rgba(255,255,255,0.015)" }}>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "5px" }}>TOTAL ESTIMATE</div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff" }}>~7–8 wks</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.26)", marginTop: "3px" }}>~10–12 hrs/week</div>
          </div>
          <div style={{ marginTop: "8px", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "5px", padding: "10px 12px", background: "rgba(34,211,238,0.05)" }}>
            <div style={{ fontSize: "9px", color: "#22D3EE", letterSpacing: "0.12em", fontFamily: "monospace", fontWeight: 700, marginBottom: "4px" }}>💡 FREE-TIER FIRST</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>Phases with GPU needs have free alternatives noted. Look for the amber callout in each phase.</div>
          </div>
        </div>

        <div style={{
          background: "rgba(255,255,255,0.018)",
          border: `1px solid ${phase.color}18`,
          borderTop: `2px solid ${phase.color}`,
          borderRadius: "7px", padding: "24px 28px", overflowY: "auto", maxHeight: "78vh",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div>
              <div style={{ fontSize: "9px", color: phase.color, letterSpacing: "0.2em", fontFamily: "monospace", fontWeight: 700 }}>
                PHASE {phase.phase} · {phase.duration}
              </div>
              <h2 style={{ fontSize: "19px", fontWeight: 700, color: "#fff", margin: "5px 0 0", letterSpacing: "-0.01em" }}>{phase.title}</h2>
            </div>
            <span style={{ fontSize: "26px", color: phase.color, opacity: 0.45, flexShrink: 0 }}>{phase.icon}</span>
          </div>

          <div style={{ background: `${phase.color}0d`, border: `1px solid ${phase.color}22`, borderRadius: "5px", padding: "10px 13px", marginBottom: phase.freeNote ? "10px" : "20px" }}>
            <span style={{ fontSize: "9px", color: phase.color, fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700 }}>GOAL  </span>
            <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{phase.goal}</span>
          </div>

          {phase.freeNote && (
            <div style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.22)", borderRadius: "5px", padding: "10px 13px", marginBottom: "20px" }}>
              <span style={{ fontSize: "9px", color: "#FBBF24", fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700 }}>🆓 FREE ALTERNATIVE  </span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{phase.freeNote}</span>
            </div>
          )}

          {!phase.isProject ? (
            <>
              <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em", fontFamily: "monospace", marginBottom: "13px" }}>TOPICS</div>
              {phase.topics.map((t, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "10px", color: phase.color, fontFamily: "monospace", letterSpacing: "0.13em", fontWeight: 700, marginBottom: "9px" }}>▸ {t.name.toUpperCase()}</div>
                  {t.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: "9px", marginBottom: "6px" }}>
                      <span style={{ color: "rgba(255,255,255,0.16)", fontSize: "11px", marginTop: "2px", flexShrink: 0 }}>·</span>
                      <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em", fontFamily: "monospace", marginBottom: "9px" }}>RESOURCES</div>
                {phase.resources.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{
                    display: "flex", alignItems: "center", gap: "8px", color: phase.color, fontSize: "12px",
                    textDecoration: "none", padding: "6px 10px", background: `${phase.color}08`,
                    borderRadius: "4px", border: `1px solid ${phase.color}18`, marginBottom: "6px",
                  }}>
                    <span style={{ fontSize: "9px", opacity: 0.5 }}>↗</span>{r.label}
                  </a>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
                {phase.stack.map((s, i) => (
                  <span key={i} style={{
                    fontSize: "10px", padding: "3px 8px", background: `${phase.color}10`,
                    border: `1px solid ${phase.color}25`, color: phase.color,
                    borderRadius: "3px", fontFamily: "monospace",
                  }}>{s}</span>
                ))}
              </div>
              {phase.milestones.map((m, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "11px" }}>
                    <span style={{ fontSize: "9px", color: phase.color, fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700 }}>{m.week.toUpperCase()}</span>
                    <div style={{ flex: 1, height: "1px", background: `${phase.color}18` }} />
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.42)", fontWeight: 600 }}>{m.title}</span>
                  </div>
                  {m.tasks.map((task, j) => (
                    <div key={j} style={{ display: "flex", gap: "10px", marginBottom: "9px" }}>
                      <span style={{ fontSize: "9px", color: phase.color, fontFamily: "monospace", marginTop: "3px", flexShrink: 0, opacity: 0.6 }}>{String(j + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>{task}</span>
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
