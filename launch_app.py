import subprocess
import webbrowser
import threading
import os
import sys

def get_project_root():
    """Get the project root directory, handling both script and frozen (exe) modes."""
    if getattr(sys, 'frozen', False):
        base_dir = os.path.dirname(sys.executable)
    else:
        base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # In case the exe is in 'dist/', look one level up for package.json
    if not os.path.exists(os.path.join(base_dir, "package.json")):
        parent_dir = os.path.dirname(base_dir)
        if os.path.exists(os.path.join(parent_dir, "package.json")):
            return parent_dir
            
    return base_dir

def drain_stdout(pipe, ready_event):
    """Read Vite's output line-by-line; signal the event when 'ready' appears."""
    try:
        for line in pipe:
            stripped = line.strip()
            print(f"[Vite] {stripped}")
            if "ready" in stripped.lower():
                ready_event.set()
    except Exception:
        pass

def launch_app():
    # ── CONFIGURATION ──────────────────────────────────────────
    host = "localhost"
    
    # Get port from command line argument, or default to 5173
    default_port = 5173 
    try:
        port = int(sys.argv[1]) if len(sys.argv) > 1 else default_port
    except ValueError:
        print(f"⚠️ Invalid port provided. Using default: {default_port}")
        port = default_port
        
    url = f"http://{host}:{port}"
    project_path = get_project_root()
    
    # Ensure we are in the project path for npm commands
    os.chdir(project_path)
    
    print(f"🚀 Initializing Roadmap App...")
    print(f"📂 Project Root: {project_path}")
    print(f"📡 Target Port: {port}")

    # 1. Start the Vite development server
    print(f"📦 Starting Vite development server on port {port}...")
    try:
        startupinfo = None
        if os.name == 'nt':
            startupinfo = subprocess.STARTUPINFO()
            startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
            
        process = subprocess.Popen(
            ["npm", "run", "dev", "--", "--port", str(port)], 
            cwd=project_path, 
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            startupinfo=startupinfo
        )
    except Exception as e:
        print(f"❌ Failed to start npm: {e}")
        return

    # 2. Start a background thread to drain stdout and watch for the "ready" signal
    ready_event = threading.Event()
    reader_thread = threading.Thread(target=drain_stdout, args=(process.stdout, ready_event), daemon=True)
    reader_thread.start()

    # 3. Wait for Vite to report it's ready (up to 15 seconds)
    print(f"⏳ Waiting for server to be ready...")
    server_ready = ready_event.wait(timeout=15)
    
    if not server_ready:
        print("❌ Timeout: Server took too long to start.")
        process.terminate()
        return

    print("✅ Server is ready!")

    # 4. Open the browser
    print(f"🌍 Opening your browser at {url}...")
    webbrowser.open(url)

    # 5. Keep the script running to keep the process alive
    print("💡 Press Ctrl+C to stop the server.\n")
    try:
        process.wait()
    except KeyboardInterrupt:
        print("\n🛑 Shutting down server...")
    finally:
        process.terminate()
        print("Done.")

if __name__ == "__main__":
    launch_app()
