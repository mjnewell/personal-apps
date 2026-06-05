const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const htmlContent = fs.readFileSync('./public/index.html', 'utf8');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(htmlContent);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
