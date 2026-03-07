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

def drain_stdout(pipe, ready_event, label):
    """Read a process's output line-by-line; signal the event when 'ready' appears."""
    try:
        for line in pipe:
            stripped = line.strip()
            print(f"[{label}] {stripped}")
            if "ready" in stripped.lower():
                ready_event.set()
    except Exception:
        pass

def start_backend(project_path, backend_port):
    """Start the FastAPI sidecar server via uvicorn."""
    print(f"🐍 Starting FastAPI backend on port {backend_port}...")
    
    startupinfo = None
    if os.name == 'nt':
        startupinfo = subprocess.STARTUPINFO()
        startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
    
    try:
        process = subprocess.Popen(
            [sys.executable, "-m", "uvicorn", "backend.main:app",
             "--host", "127.0.0.1", "--port", str(backend_port)],
            cwd=project_path,
            shell=False,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            startupinfo=startupinfo
        )
    except Exception as e:
        print(f"❌ Failed to start backend: {e}")
        return None, None
    
    ready_event = threading.Event()
    reader = threading.Thread(
        target=drain_stdout,
        args=(process.stdout, ready_event, "Backend"),
        daemon=True
    )
    reader.start()
    return process, ready_event

def start_frontend(project_path, frontend_port):
    """Start the Vite development server."""
    print(f"📦 Starting Vite frontend on port {frontend_port}...")
    
    startupinfo = None
    if os.name == 'nt':
        startupinfo = subprocess.STARTUPINFO()
        startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
    
    try:
        process = subprocess.Popen(
            ["npm", "run", "dev", "--", "--port", str(frontend_port)],
            cwd=project_path,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            startupinfo=startupinfo
        )
    except Exception as e:
        print(f"❌ Failed to start frontend: {e}")
        return None, None
    
    ready_event = threading.Event()
    reader = threading.Thread(
        target=drain_stdout,
        args=(process.stdout, ready_event, "Vite"),
        daemon=True
    )
    reader.start()
    return process, ready_event

def launch_app():
    # ── CONFIGURATION ──────────────────────────────────────────
    host = "localhost"
    
    default_frontend_port = 5173
    default_backend_port = 8042
    
    try:
        frontend_port = int(sys.argv[1]) if len(sys.argv) > 1 else default_frontend_port
    except ValueError:
        print(f"⚠️ Invalid frontend port provided. Using default: {default_frontend_port}")
        frontend_port = default_frontend_port
    
    try:
        backend_port = int(sys.argv[2]) if len(sys.argv) > 2 else default_backend_port
    except ValueError:
        print(f"⚠️ Invalid backend port provided. Using default: {default_backend_port}")
        backend_port = default_backend_port
        
    url = f"http://{host}:{frontend_port}"
    project_path = get_project_root()
    
    # Ensure we are in the project path
    os.chdir(project_path)
    
    print(f"🚀 Initializing Roadmap App...")
    print(f"📂 Project Root: {project_path}")
    print(f"📡 Frontend Port: {frontend_port}")
    print(f"📡 Backend Port:  {backend_port}")

    # 1. Start the FastAPI backend
    backend_proc, backend_ready = start_backend(project_path, backend_port)
    if backend_proc is None:
        return

    # 2. Start the Vite frontend
    frontend_proc, frontend_ready = start_frontend(project_path, frontend_port)
    if frontend_proc is None:
        backend_proc.terminate()
        return

    # 3. Wait for both servers to be ready
    print(f"⏳ Waiting for servers to be ready...")
    
    backend_ok = backend_ready.wait(timeout=10)
    if not backend_ok:
        print("⚠️ Backend may not be fully ready yet (continuing anyway)...")
    else:
        print("✅ Backend is ready!")
    
    frontend_ok = frontend_ready.wait(timeout=15)
    if not frontend_ok:
        print("❌ Timeout: Frontend took too long to start.")
        backend_proc.terminate()
        frontend_proc.terminate()
        return
    
    print("✅ Frontend is ready!")

    # 4. Open the browser
    print(f"🌍 Opening your browser at {url}...")
    webbrowser.open(url)

    # 5. Keep the script running to keep both processes alive
    print("💡 Press Ctrl+C to stop both servers.\n")
    try:
        frontend_proc.wait()
    except KeyboardInterrupt:
        print("\n🛑 Shutting down servers...")
    finally:
        frontend_proc.terminate()
        backend_proc.terminate()
        print("Done.")

if __name__ == "__main__":
    launch_app()
