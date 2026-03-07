import { useState } from "react";

const roadmap = [
  {
    phase: "01",
    title: "Software Engineering Fundamentals",
    duration: "3–4 weeks",
    color: "#00DC82",
    icon: "◈",
    timeline: "Mar – early Apr",
    goal: "Build the production-code credibility you're missing. Understand how real software is structured, tested, and shipped — not just experimented with.",
    topics: [
      {
        name: "Data Structures & Algorithms (Targeted)",
        items: [
          "Focus on patterns, not grinding: sliding window, two pointers, BFS/DFS, dynamic programming",
          "LeetCode: 1–2 mediums/day — track time, don't just solve",
          "Understand time/space complexity for every solution you write",
          "ML-adjacent problems: matrix ops, graph traversal, heaps (priority queues for beam search)",
        ],
      },
      {
        name: "Clean Code & Software Design",
        items: [
          "SOLID principles — especially Single Responsibility & Dependency Inversion",
          "Design patterns: Factory, Strategy, Observer (these show up in ML infra constantly)",
          "Write code that others can read: naming, functions, modularity",
          "Refactor one of your old ML scripts to be production-quality",
        ],
      },
      {
        name: "Git, Testing & Dev Workflow",
        items: [
          "Git branching strategy: feature branches, PRs, rebase vs merge",
          "Unit testing with pytest — test your data pipelines, not just models",
          "CI/CD basics: GitHub Actions for running tests on push",
          "Code review etiquette: how to give and receive feedback",
        ],
      },
    ],
    resources: [
      { label: "Neetcode.io — Pattern-based LeetCode curriculum", url: "https://neetcode.io/" },
      { label: "Refactoring Guru — Design Patterns (free)", url: "https://refactoring.guru/design-patterns" },
      { label: "The Pragmatic Programmer (key chapters)", url: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/" },
      { label: "pytest Docs — Testing Python Code", url: "https://docs.pytest.org/en/stable/" },
    ],
  },
  {
    phase: "02",
    title: "Systems & Architecture Thinking",
    duration: "3–4 weeks",
    color: "#FF6B35",
    icon: "⬡",
    timeline: "Apr – early May",
    goal: "Develop the vocabulary and mental models to reason about how systems are built at scale. This is what separates ML engineers from ML researchers in industry.",
    topics: [
      {
        name: "Distributed Systems Fundamentals",
        items: [
          "CAP theorem — consistency vs availability tradeoffs in real systems",
          "Horizontal vs vertical scaling, stateless vs stateful services",
          "Message queues: Kafka/RabbitMQ — why they exist and when to use them",
          "Caching strategies: write-through, write-back, cache invalidation",
        ],
      },
      {
        name: "System Design Patterns",
        items: [
          "Load balancers, reverse proxies, API gateways",
          "Microservices vs monolith — tradeoffs, not just definitions",
          "Rate limiting, circuit breakers, retries with backoff",
          "Designing for failure: what happens when a service goes down?",
        ],
      },
      {
        name: "ML Systems Specifically",
        items: [
          "Model serving architectures: batch vs real-time inference",
          "Feature stores: what they are, why training-serving skew happens",
          "Data pipelines: ETL vs ELT, Airflow/Prefect concepts",
          "Observability: logging, metrics, tracing in ML services",
        ],
      },
    ],
    resources: [
      { label: "Designing Data-Intensive Applications (Kleppmann) — read Ch. 1, 5, 9", url: "https://dataintensive.net/" },
      { label: "System Design Primer (GitHub)", url: "https://github.com/donnemartin/system-design-primer" },
      { label: "Chip Huyen — Designing Machine Learning Systems", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/" },
      { label: "ByteByteGo — Visual system design explanations", url: "https://bytebytego.com/" },
    ],
  },
  {
    phase: "03",
    title: "Databases: SQL, NoSQL & Vector DBs",
    duration: "2–3 weeks",
    color: "#A78BFA",
    icon: "◎",
    timeline: "May",
    goal: "Go from 'I've used pandas' to someone who can reason about data storage, retrieval, and the right DB for a given problem — including vector databases relevant to your ML background.",
    topics: [
      {
        name: "Relational Databases (SQL)",
        items: [
          "Schema design: normalization (1NF–3NF), when to denormalize",
          "Joins, indexes, query execution plans — understand EXPLAIN",
          "Transactions: ACID properties, isolation levels, deadlocks",
          "PostgreSQL hands-on: build a schema for an ML experiment tracker",
        ],
      },
      {
        name: "NoSQL & When to Use It",
        items: [
          "Document stores (MongoDB): flexible schema, aggregation pipelines",
          "Key-value stores (Redis): caching, sessions, pub/sub",
          "Column-family (Cassandra concepts): time-series and write-heavy workloads",
          "Choosing the right DB: think tradeoffs, not trends",
        ],
      },
      {
        name: "Vector Databases & Embeddings (Your Edge)",
        items: [
          "How vector DBs work: ANN search, HNSW vs IVF indexing",
          "Pinecone / Qdrant / pgvector hands-on",
          "Embedding pipelines: chunking, embedding models, upsert patterns",
          "RAG architecture: when retrieval improves generation vs when it hurts",
        ],
      },
    ],
    resources: [
      { label: "PostgreSQL Tutorial — sqlzoo + official docs", url: "https://www.postgresql.org/docs/current/tutorial.html" },
      { label: "Use The Index, Luke — SQL indexing deep dive", url: "https://use-the-index-luke.com/" },
      { label: "Qdrant Docs — Vector DB from scratch", url: "https://qdrant.tech/documentation/" },
      { label: "Redis University — Free courses", url: "https://university.redis.com/" },
    ],
  },
  {
    phase: "04",
    title: "Production ML Engineering",
    duration: "3–4 weeks",
    color: "#38BDF8",
    icon: "⟁",
    timeline: "Jun – early Jul",
    goal: "Bridge the gap from 'runs on my machine' to 'runs in production'. This is the highest-leverage phase for your specific gap — turning experiment code into deployable, maintainable systems.",
    topics: [
      {
        name: "APIs & Service Design",
        items: [
          "REST API design: endpoints, HTTP verbs, status codes, versioning",
          "FastAPI deep dive: dependency injection, background tasks, async handlers",
          "Request validation with Pydantic — stop assuming your inputs are clean",
          "Authentication basics: API keys, JWT, OAuth2 flow",
        ],
      },
      {
        name: "Containers & Deployment",
        items: [
          "Docker: write Dockerfiles for ML services (GPU-aware images)",
          "Docker Compose for local multi-service setups",
          "Kubernetes concepts: pods, deployments, services, ingress",
          "Cloud basics: at least one of AWS / GCP — model deployment, S3/GCS, managed services",
        ],
      },
      {
        name: "MLOps Practices",
        items: [
          "Experiment tracking: MLflow or Weights & Biases — use in all future projects",
          "Model registry: versioning models like code",
          "Monitoring: data drift detection, prediction monitoring, alerting",
          "Reproducibility: seed everything, pin dependencies, version datasets",
        ],
      },
    ],
    resources: [
      { label: "FastAPI Official Docs — Best Python API framework", url: "https://fastapi.tiangolo.com/" },
      { label: "Full Stack Deep Learning — Production ML course (free)", url: "https://fullstackdeeplearning.com/course/2022/" },
      { label: "MLflow Docs — Experiment tracking", url: "https://mlflow.org/docs/latest/index.html" },
      { label: "Kubernetes: The Hard Way (conceptual walkthrough)", url: "https://github.com/kelseyhightower/kubernetes-the-hard-way" },
    ],
  },
  {
    phase: "05",
    title: "System Design Interview Prep",
    duration: "2–3 weeks",
    color: "#FACC15",
    icon: "△",
    timeline: "Jul – Aug",
    goal: "Synthesize everything into interview-ready system design skills. Practice communicating tradeoffs clearly — this is the skill that gets you offers at top companies.",
    topics: [
      {
        name: "ML System Design Problems",
        items: [
          "Design a recommendation system (Netflix/Spotify style)",
          "Design a search engine with semantic (vector) search",
          "Design a real-time fraud detection system",
          "Design a model serving platform (multi-model, A/B testing)",
        ],
      },
      {
        name: "General System Design",
        items: [
          "URL shortener (classic — get the fundamentals right)",
          "Design Twitter/X feed with ML ranking",
          "Design a distributed training job scheduler",
          "Rate limiter, notification system, ride-sharing backend",
        ],
      },
      {
        name: "How to Actually Perform in Interviews",
        items: [
          "Framework: Clarify → Estimate → High-level → Deep dive → Tradeoffs",
          "Always state assumptions out loud before solving",
          "Never go silent — narrate your thinking even when uncertain",
          "Anticipate follow-ups: 'What if traffic spikes 10x?', 'What if a node fails?'",
        ],
      },
    ],
    resources: [
      { label: "Grokking the Machine Learning Interview (Educative)", url: "https://www.educative.io/courses/grokking-the-machine-learning-interview" },
      { label: "ML System Design (Huynh/Shaw) — Free newsletter", url: "https://www.ml-sys.design/" },
      { label: "Hello Interview — System Design Practice", url: "https://www.hellointerview.com/" },
      { label: "Exponent — Mock System Design Interviews", url: "https://www.tryexponent.com/" },
    ],
  },
  {
    phase: "06",
    title: "Capstone: Production ML Project",
    duration: "3–4 weeks",
    color: "#F472B6",
    icon: "★",
    timeline: "Aug – Sep",
    goal: "Build one flagship project that demonstrates all four skill areas simultaneously: clean code, system design, databases, and production ML. This is your resume anchor.",
    isProject: true,
    milestones: [
      {
        week: "Week 1–2",
        title: "Core System",
        tasks: [
          "Pick a domain that uses your ML strengths (NLP, vision, or recommenders) — don't start from scratch on the ML",
          "Design the system first: draw the architecture before writing code. What services exist? How do they communicate?",
          "PostgreSQL schema for users, items, and prediction logs — practice real schema design",
          "FastAPI backend with proper auth, request validation, and error handling (not just happy path)",
          "Dockerize everything: ML model service + API + DB should all run with docker-compose up",
        ],
      },
      {
        week: "Week 3",
        title: "Production Hardening",
        tasks: [
          "Add MLflow for experiment tracking — your model version should be logged and retrievable",
          "Write unit + integration tests covering your data pipeline and API endpoints",
          "Add a vector DB component: store embeddings, enable semantic search or RAG on top of your domain data",
          "Set up GitHub Actions CI: tests pass before merge, Docker image builds on push",
          "Add basic monitoring: log prediction latency, error rates, and input data statistics",
        ],
      },
      {
        week: "Week 4",
        title: "Polish & Storytelling",
        tasks: [
          "Write a system design doc (1 page): architecture diagram + key decisions + tradeoffs you made",
          "README must be exceptional: problem, architecture diagram, how to run it, design decisions",
          "Record a 3-minute walkthrough video: show the live system, narrate the architecture",
          "Deploy somewhere public: Hugging Face Spaces, Railway, Fly.io, or GCP Cloud Run",
          "Prepare to be asked about it in interviews: 'What would you change at 10x scale?'",
        ],
      },
    ],
    stack: ["FastAPI", "PostgreSQL", "pgvector / Qdrant", "Docker + Compose", "MLflow", "GitHub Actions", "pytest"],
  },
];

const PhaseCard = ({ phase, active, onClick }) => {
  const isProject = phase.isProject;
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: `1px solid ${active ? phase.color : "rgba(255,255,255,0.07)"}`,
        borderLeft: `3px solid ${phase.color}`,
        background: active
          ? `linear-gradient(135deg, ${phase.color}14 0%, transparent 70%)`
          : "rgba(255,255,255,0.015)",
        borderRadius: "6px",
        padding: "14px 18px",
        marginBottom: "8px",
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "18px", color: phase.color, fontFamily: "monospace" }}>{phase.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
            <span style={{ fontSize: "10px", color: phase.color, fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", fontWeight: 700 }}>
              PHASE {phase.phase}
            </span>
            {isProject && (
              <span style={{ fontSize: "9px", background: phase.color, color: "#000", padding: "1px 5px", borderRadius: "2px", fontWeight: 700, letterSpacing: "0.08em" }}>
                PROJECT
              </span>
            )}
          </div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: active ? "#fff" : "rgba(255,255,255,0.7)", fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.3 }}>
            {phase.title}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "'Courier New', monospace", whiteSpace: "nowrap" }}>{phase.duration}</div>
          <div style={{ fontSize: "9px", color: phase.color, opacity: 0.6, fontFamily: "'Courier New', monospace", whiteSpace: "nowrap", marginTop: "2px" }}>{phase.timeline}</div>
        </div>
      </div>
    </div>
  );
};

const TopicBlock = ({ topic, color }) => (
  <div style={{ marginBottom: "22px" }}>
    <div style={{ fontSize: "11px", color: color, fontFamily: "'Courier New', monospace", letterSpacing: "0.12em", fontWeight: 700, marginBottom: "10px" }}>
      ▸ {topic.name.toUpperCase()}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      {topic.items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "2px", flexShrink: 0 }}>·</span>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>{item}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function Fall2026Roadmap() {
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
        padding: "26px 40px 22px",
        background: "linear-gradient(180deg, rgba(10,10,20,1) 0%, transparent 100%)",
      }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{ fontSize: "10px", color: "#00DC82", fontFamily: "'Courier New', monospace", letterSpacing: "0.2em", fontWeight: 700 }}>
              FALL 2026 INTERN PREP
            </span>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "10px" }}>—</span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em" }}>
              ML ENGINEER · SELF-STUDY ROADMAP
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(18px, 2.8vw, 26px)",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "'Playfair Display', Georgia, serif",
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            From Researcher to Production Engineer
          </h1>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", marginTop: "6px", lineHeight: 1.5 }}>
            ~18–22 weeks · Mar → Sep 2026 · Systems · Databases · Software Engineering · MLOps
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{
        flex: 1,
        maxWidth: "1140px",
        margin: "0 auto",
        padding: "28px 40px",
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gap: "28px",
        width: "100%",
        boxSizing: "border-box",
      }}>
        {/* Left: Phase list */}
        <div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.18em", fontFamily: "'Courier New', monospace", marginBottom: "12px" }}>
            PHASES
          </div>
          {roadmap.map((p, i) => (
            <PhaseCard key={i} phase={p} active={active === i} onClick={() => setActive(i)} />
          ))}

          {/* Summary card */}
          <div style={{
            marginTop: "18px",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "6px",
            padding: "14px 16px",
            background: "rgba(255,255,255,0.015)",
          }}>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.15em", fontFamily: "'Courier New', monospace", marginBottom: "10px" }}>
              TOTAL ESTIMATE
            </div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display', serif" }}>~20 weeks</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", marginTop: "4px" }}>Mar 2026 → Sep 2026</div>
            <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.15em", fontFamily: "'Courier New', monospace", marginBottom: "8px" }}>
                PARALLEL SUMMER TRACK
              </div>
              {[
                { dot: "#00DC82", text: "RA with professor (research cred + rec letter)" },
                { dot: "#FF6B35", text: "Freelance ML work (real production exposure)" },
                { dot: "#38BDF8", text: "Build this roadmap's capstone in public" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ color: item.dot, fontSize: "8px", marginTop: "4px", flexShrink: 0 }}>●</span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Detail panel */}
        <div style={{
          background: "rgba(255,255,255,0.015)",
          border: `1px solid ${phase.color}1a`,
          borderTop: `2px solid ${phase.color}`,
          borderRadius: "8px",
          padding: "26px 30px",
          overflowY: "auto",
          maxHeight: "80vh",
        }}>
          {/* Phase header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
            <div>
              <div style={{ fontSize: "10px", color: phase.color, letterSpacing: "0.2em", fontFamily: "'Courier New', monospace", fontWeight: 700 }}>
                PHASE {phase.phase} · {phase.duration} · {phase.timeline}
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display', serif", margin: "6px 0 0", letterSpacing: "-0.01em" }}>
                {phase.title}
              </h2>
            </div>
            <span style={{ fontSize: "28px", color: phase.color, opacity: 0.55 }}>{phase.icon}</span>
          </div>

          {/* Goal */}
          <div style={{
            background: `${phase.color}0d`,
            border: `1px solid ${phase.color}22`,
            borderRadius: "6px",
            padding: "12px 16px",
            marginBottom: "22px",
          }}>
            <span style={{ fontSize: "10px", color: phase.color, fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", fontWeight: 700 }}>GOAL  </span>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.62)", lineHeight: 1.65 }}>{phase.goal}</span>
          </div>

          {!phase.isProject ? (
            <>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.18em", fontFamily: "'Courier New', monospace", marginBottom: "14px" }}>
                TOPICS
              </div>
              {phase.topics.map((t, i) => <TopicBlock key={i} topic={t} color={phase.color} />)}

              {/* Resources */}
              <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.18em", fontFamily: "'Courier New', monospace", marginBottom: "12px" }}>
                  RESOURCES
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
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
                      border: `1px solid ${phase.color}1a`,
                      transition: "background 0.15s",
                    }}>
                      <span style={{ fontSize: "10px", opacity: 0.55 }}>↗</span>
                      {r.label}
                    </a>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Stack tags */}
              <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", marginBottom: "22px" }}>
                {phase.stack.map((s, i) => (
                  <span key={i} style={{
                    fontSize: "11px",
                    padding: "3px 10px",
                    background: `${phase.color}12`,
                    border: `1px solid ${phase.color}28`,
                    color: phase.color,
                    borderRadius: "3px",
                    fontFamily: "'Courier New', monospace",
                    letterSpacing: "0.05em",
                  }}>{s}</span>
                ))}
              </div>

              {phase.milestones.map((m, i) => (
                <div key={i} style={{ marginBottom: "26px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                    <span style={{ fontSize: "10px", color: phase.color, fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", fontWeight: 700 }}>
                      {m.week.toUpperCase()}
                    </span>
                    <div style={{ flex: 1, height: "1px", background: `${phase.color}1a` }} />
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{m.title}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {m.tasks.map((task, j) => (
                      <div key={j} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "10px", color: phase.color, fontFamily: "'Courier New', monospace", marginTop: "3px", flexShrink: 0, opacity: 0.65 }}>
                          {String(j + 1).padStart(2, "0")}
                        </span>
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
