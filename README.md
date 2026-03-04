# ◆ Learning Roadmap Visualizer

A sleek, modern dashboard for interactive learning modules and structured course artifacts. Built with a focus on high-fidelity aesthetics, dynamic loading, and seamless navigation.

## ✨ Features

- **Modern Dark Aesthetic**: A deep, immersive dark theme (`#08080c`) using custom Inter and Playfair Display typography.
- **Glassmorphism UI**: High-fidelity module cards with subtle border glows, backdrop blurs, and interactive hover states.
- **Dynamic Artifact Registry**: Automatically detects any `.jsx` component added to `src/artifacts/` and surfaces them on the homepage.
- **On-Demand Loading**: Components are lazy-loaded only when clicked, keeping the initial bundle small and performance snappy.
- **Integrated Viewer**: Artifacts open in a full-width, dynamically revealed section with a sticky navigation bar and close controls.
- **Metadata Support**: Customize card titles, icons, and descriptions directly within the artifact file's export.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## � Desktop Experience

For a more native-feeling application experience, you can use the included Python launcher. This script automates starting the Vite server, polling for readiness, and launching your browser.

### 🚀 Running the Launcher

1. Ensure you have Python installed.
2. Run the launcher from the project root:
   ```bash
   python launch_app.py
   ```
   _Note: You can pass a custom port as an argument, e.g., `python launch_app.py 3000`._

### 📦 Generating a Standalone Executable

To turn the dashboard into a windowless Windows application (`.exe`):

1. Install PyInstaller:
   ```bash
   pip install pyinstaller
   ```
2. Run the build command:
   ```bash
   pyinstaller --onefile --windowed --icon="favicon.ico" --name "RoadmapApp" launch_app.py
   ```
3. Your standalone executable will be generated in the `dist/` folder.

## �🛠 Adding New Artifacts

Adding a new module is as simple as dropping a file. No complex routing or registration required.

1. Create a new `.jsx` file in `src/artifacts/` (e.g., `src/artifacts/my_new_course.jsx`).
2. Export a `meta` object and a `default` function component:

```jsx
// src/artifacts/my_new_course.jsx

export const meta = {
  id: "unique-id",
  title: "My New Course",
  icon: "✦",
  description: "A short summary of what this module covers.",
};

export default function MyNewCourse() {
  return (
    <div style={{ padding: "40px", color: "#fff" }}>
      <h1>Hello World</h1>
      <p>This is my new interactive module.</p>
    </div>
  );
}
```

The app will automatically detect this file and create a card for it on the home screen.

## 🏗 Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Orchestration**: Python (Custom launcher & PyInstaller)
- **Styling**: Vanilla CSS (Custom properties & Glassmorphism)
- **Fonts**: Inter & Playfair Display (via Google Fonts)
- **Icons**: Unicode/Emoji-based for performance and simplicity

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
