from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    port = 8000
    server = ThreadingHTTPServer(('0.0.0.0', port), NoCacheHandler)
    print(f'Threading HTTP Server running on http://localhost:{port}/', flush=True)
    server.serve_forever()
