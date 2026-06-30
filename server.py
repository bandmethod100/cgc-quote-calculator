from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
import shutil
import sys
from urllib.parse import urlparse


ROOT = os.path.dirname(os.path.abspath(__file__))
OUTPUTS = os.path.join(ROOT, "outputs")
STATE_FILE = os.path.join(OUTPUTS, "pricing-state.json")
BACKUP_STATE_FILE = os.path.join(OUTPUTS, "pricing-state.backup.json")


class QuoteCalculatorHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=OUTPUTS, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        if urlparse(self.path).path == "/api/pricing-state":
            self.send_json(read_state())
            return
        super().do_GET()

    def do_POST(self):
        if urlparse(self.path).path != "/api/pricing-state":
            self.send_error(404)
            return

        length = int(self.headers.get("Content-Length", "0") or "0")
        raw_body = self.rfile.read(length)

        try:
            payload = json.loads(raw_body.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            self.send_error(400, "Invalid JSON")
            return

        write_state(payload)
        self.send_json({"ok": True})

    def send_json(self, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def read_state():
    for path in (STATE_FILE, BACKUP_STATE_FILE):
        if not os.path.exists(path):
            continue
        try:
            with open(path, "r", encoding="utf-8") as handle:
                return json.load(handle)
        except (OSError, json.JSONDecodeError):
            continue
    return {}


def write_state(payload):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    if os.path.exists(STATE_FILE):
        try:
            shutil.copy2(STATE_FILE, BACKUP_STATE_FILE)
        except OSError:
            pass
    temp_file = f"{STATE_FILE}.tmp"
    with open(temp_file, "w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2)
    os.replace(temp_file, STATE_FILE)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4178
    server = ThreadingHTTPServer(("0.0.0.0", port), QuoteCalculatorHandler)
    print(f"Serving CGC Quote Calculator on http://0.0.0.0:{port}/")
    server.serve_forever()


if __name__ == "__main__":
    main()
