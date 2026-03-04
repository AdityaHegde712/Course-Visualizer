import subprocess
import webbrowser
import socket
import threading
import time
import os
import sys

def is_port_open(host, port):
    """Check if the given port is open on the host."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(1)
        try:
            s.connect((host, port))
            return True
        except (ConnectionRefusedError, socket.timeout, socket.error):
            return False

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

def drain_stdout(pipe):
    """Continuously read from the pipe so the subprocess never blocks."""
    try:
        for line in pipe:
            print(f"[Vite] {line.strip()}")
    except Exception:
        pass

def launch_app():
    # ── CONFIGURATION ──────────────────────────────────────────
    # Use 127.0.0.1 for socket checks (avoids IPv6 mismatch on Windows)
    # Use localhost for the browser URL (more readable)
    check_host = "127.0.0.1"
    browser_host = "localhost"
    
    # Get port from command line argument, or default to 5173
    default_port = 5173 
    try:
        port = int(sys.argv[1]) if len(sys.argv) > 1 else default_port
    except ValueError:
        print(f"⚠️ Invalid port provided. Using default: {default_port}")
        port = default_port
        
    url = f"http://{browser_host}:{port}"
    project_path = get_project_root()
    
    # Ensure we are in the project path for npm commands
    os.chdir(project_path)
    
    print(f"🚀 Initializing Roadmap App...")
    print(f"📂 Project Root: {project_path}")
    print(f"📡 Target Port: {port}")
    
    # 1. Check if the app is already running
    if is_port_open(check_host, port):
        print(f"✨ App is already running. Opening browser at {url}...")
        webbrowser.open(url)
        return

    # 2. Start the Vite development server
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

    # 3. Start a background thread to drain stdout so the pipe never blocks
    reader_thread = threading.Thread(target=drain_stdout, args=(process.stdout,), daemon=True)
    reader_thread.start()

    # 4. Poll the port until it's open
    print(f"⏳ Waiting for server to be ready at {url}...", end="", flush=True)
    max_attempts = 30
    attempts = 0
    
    while attempts < max_attempts:
        if not is_port_open(check_host, port):
            print("\n✅ Server is ready!")
            break
        print(".", end="", flush=True)
        time.sleep(0.5)
        attempts += 1
    else:
        print("\n❌ Timeout: Server took too long to start.")
        process.terminate()
        return

    # 5. Open the browser
    print(f"🌍 Opening your browser...")
    webbrowser.open(url)

    # 6. Keep the script running to keep the process alive
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

