# ◆ Learning Roadmap Visualizer

A sleek, modern dashboard for interactive learning modules and structured course artifacts. Built with a focus on high-fidelity aesthetics, dynamic loading, and seamless navigation.

## ✨ Features

- **Modern Dark Aesthetic**: A deep, immersive dark theme (`#08080c`) using custom Inter and Playfair Display typography.
- **Glassmorphism UI**: High-fidelity module cards with subtle border glows, backdrop blurs, and interactive hover states.
- **Persistent Progress Tracking**: Track your learning progress with local checkboxes for topics. Progress is saved automatically to `progress.json` via a FastAPI sidecar.
- **Dynamic Artifact Registry**: Automatically detects any `.jsx` component added to `src/artifacts/` and surfaces them on the homepage.
- **On-Demand Loading**: Components are lazy-loaded only when clicked, keeping the initial bundle small and performance snappy.
- **Integrated Viewer**: Artifacts open in a full-width, dynamically revealed section with a sticky navigation bar and close controls.
- **Metadata Support**: Customize card titles, icons, and descriptions directly within the artifact file's export.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Python](https://www.python.org/) (3.9+)
- [Docker](https://www.docker.com/) (Optional, for containerized execution)

### Installation

1. Clone the repository
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Install Python dependencies:
   ```bash
   pip install fastapi uvicorn
   ```

### Running Locally

You can start the development servers manually or use the integrated launcher.

**Method 1: Using the Launcher (Recommended)**

```bash
python launch_app.py
```

This script starts both the Vite dev server and the FastAPI backend, then opens your browser automatically.

**Method 2: Manual Startup**

- Start Backend: `uvicorn backend.main:app --port 8042`
- Start Frontend: `npm run dev`

### 🐳 Running with Docker

For a fully containerized "one-command" setup:

1. Ensure Docker Desktop is running.
2. Run:
   ```bash
   docker-compose up --build
   ```
3. Open `http://localhost:5173` in your browser.

## 🖥 Desktop Experience

For a more native-feeling application experience, the `launch_app.py` script automates starting the environment.

### 🚀 Customizing the Launcher

```bash
python launch_app.py [frontend_port] [backend_port]
```

_Example: `python launch_app.py 3000 8080`_

### 📦 Generating a Standalone Executable

To turn the dashboard into a windowless Windows application (`.exe`):

1. Install PyInstaller: `pip install pyinstaller`
2. Run the build command:
   ```bash
   pyinstaller --onefile --windowed --icon="favicon.ico" --name "RoadmapApp" launch_app.py
   ```
3. Your standalone executable will be generated in the `dist/` folder.

## 🛠 Adding New Artifacts

Adding a new module is as simple as dropping a file. No complex routing or registration required.

1. Create a new `.jsx` file in `src/artifacts/` (e.g., `src/artifacts/my_new_course.jsx`).
2. Export a `meta` object and a `default` function component. Use the `TopicBlock` component to enable checkbox tracking:

```jsx
import TopicBlock from "../components/TopicBlock";
import { useProgress } from "../hooks/useProgress";

export const meta = {
  id: "unique-id",
  title: "My New Course",
  icon: "✦",
  description: "A short summary of what this module covers.",
};

export default function MyNewCourse() {
  const { progress, toggle } = useProgress();

  const myTopic = {
    id: "topic-1",
    name: "Getting Started",
    items: ["Install dependencies", "Run the app"],
  };

  return (
    <div style={{ padding: "40px" }}>
      <TopicBlock
        topic={myTopic}
        color="#00DC82"
        checked={!!progress[myTopic.id]}
        onToggle={toggle}
      />
    </div>
  );
}
```

## 🏗 Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Sidecar for persistence)
- **Containerization**: [Docker Compose](https://docs.docker.com/compose/)
- **Orchestration**: Python (Custom launcher & PyInstaller)
- **Styling**: Vanilla CSS (Custom properties & Glassmorphism)
- **Fonts**: Inter & Playfair Display (via Google Fonts)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
