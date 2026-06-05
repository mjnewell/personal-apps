const http = require('http');
const fs = require('fs');

const html = fs.readFileSync('./index.html', 'utf8');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache'
  });
  res.end(html);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0');
